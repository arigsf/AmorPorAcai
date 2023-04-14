<script>
import { collection, query, getDocs } from "firebase/firestore"
import { auth, db } from "../firebase"
import { useOrderStore } from "../stores/order"
const orderStore = useOrderStore()

export default {
    name: 'CartView',
    data() {
        return {
            acais: null,
            entrega: 'Retirar',
            pagamento: 'Cartão de débito',
            taxa_entrega: null,
            subtotal: 0,
            total: 0,
        }
    },
    async created() {
        const carrinho = localStorage.getItem("carrinho") ? JSON.parse(localStorage.getItem("carrinho")) : null
        this.acais = carrinho
        this.alterarSubtotal()

        const querySnapshot = await getDocs(query(collection(db, "adicionais")))
        querySnapshot.forEach((doc) => {
            const result = {
                taxa_entrega: doc.data().taxa_entrega,
            }
            this.taxa_entrega = result.taxa_entrega
        })
    },
    methods: {
        diminuirQuantidade(id) {
            var adicionar = true
            var novo_carrinho = []

            for (let i = 0; i < this.acais.length; i++) {
                if (this.acais[i].id == id) {
                    this.acais[i].quantidade--
                    if (this.acais[i].quantidade <= 0) {
                        adicionar = false
                    }
                }

                if (adicionar == true) {
                    novo_carrinho.push(this.acais[i])
                }
            }

            this.acais = novo_carrinho
            if (novo_carrinho.length == 0) {
                localStorage.setItem("carrinho", null)
                this.$router.go({ path: this.$router.path })
            } else {
                localStorage.setItem("carrinho", JSON.stringify(novo_carrinho))
            }

            this.alterarSubtotal()
        },
        aumentarQuantidade(id) {
            var novo_carrinho = []

            for (let i = 0; i < this.acais.length; i++) {
                if (this.acais[i].id == id) {
                    this.acais[i].quantidade++
                }

                novo_carrinho.push(this.acais[i])
                localStorage.setItem("carrinho", JSON.stringify(novo_carrinho))
            }

            this.alterarSubtotal()
        },
        alterarSubtotal() {
            const carrinho = localStorage.getItem("carrinho") ? JSON.parse(localStorage.getItem("carrinho")) : null

            if (carrinho != null) {
                for (let i = 0; i < carrinho.length; i++) {
                    const acai = carrinho[i]
                    this.subtotal = 0
                    this.subtotal += acai.preco * acai.quantidade
                }
            }
        },
        finalizarPedido() {
            if (!auth.currentUser) {
                alert("Faça login!")
            } else if (!this.entrega) {
                alert("Selecione um método de entrega")
            } else if (!this.pagamento) {
                alert("Selecione um método de pagamento")
            } else {
                let total = this.subtotal
                let endereco = auth.currentUser.photoURL

                if (this.entrega == 'Retirar') {
                    endereco = null
                } else if (this.entrega == 'Entregar') {
                    total += this.taxa_entrega
                }

                localStorage.setItem("carrinho", null)
                orderStore.add(auth.currentUser.displayName, auth.currentUser.uid, this.acais, this.entrega, this.pagamento, total, 'Pendente', endereco)
            }
        }
    }
}
</script>

<template>
    <section class="p-4 bg-purple-dark text-white" style="min-height: 82vh;" v-if="acais">
        <div class="row">
            <div class="col-md-7">
                <ol class="list-group list-group-numbered bg-purple-white p-2"
                    style="max-width: 100% !important; margin-inline: 0 !important;">
                    <li class="list-group-item d-flex justify-content-between align-items-start border-0 text-white"
                        v-for="acai in acais">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">{{ acai.acai }}</div>
                            <div class="row">
                                <div class="col" v-if="acai.adicionais.basicos.length != 0">
                                    <p class="m-0">Adicionais básicos:</p>
                                    <ul>
                                        <li v-for="basico in acai.adicionais.basicos">{{ basico }}</li>
                                    </ul>
                                </div>
                                <div class="col" v-if="acai.adicionais.avancados.length != 0">
                                    <p class="m-0">Adicionais avançados:</p>
                                    <ul>
                                        <li v-for="avancado in acai.adicionais.avancados">{{ avancado }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center">
                            <span class="badge bg-primary fs-6 mx-2">{{ acai.preco }}</span>
                            <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-primary" v-on:click="diminuirQuantidade(acai.id)"><i
                                        class="bi bi-dash"></i></button>
                                <button type="button" class="btn btn-primary">{{ acai.quantidade }}</button>
                                <button type="button" class="btn btn-primary" v-on:click="aumentarQuantidade(acai.id)"><i
                                        class="bi bi-plus"></i></button>
                            </div>
                        </div>
                    </li>
                </ol>
            </div>
            <div class="col-md-5">
                <div class="card bg-purple-white text-white mb-3">
                    <div class="card-body">
                        <h6 class="card-title">Entrega</h6>
                        <select class="form-select my-3" v-model="entrega">
                            <option value="Retirar">Retirar no local</option>
                            <option value="Entregar">Entregar no meu endereço</option>
                        </select>
                        <h6 class="card-title">Pagamento no ato da entrega via</h6>
                        <select class="form-select my-3" v-model="pagamento">
                            <option value="Cartão de débito">Cartão de débito</option>
                            <option value="Dinheiro">Dinheiro</option>
                            <option value="Pix">Pix</option>
                        </select>
                        <h6 class="card-title">Resumo do seu pedido</h6>
                        <div class="d-flex justify-content-between" v-if="entrega == 'Entregar'">
                            <span>Subtotal</span>
                            <span>R${{ subtotal }}</span>
                        </div>
                        <div class="d-flex justify-content-between" v-if="entrega == 'Entregar'">
                            <span>Taxa de entrega</span>
                            <span>R${{ taxa_entrega }}</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span>Total</span>
                            <span v-if="entrega == 'Entregar'">R${{ subtotal + taxa_entrega }}</span>
                            <span v-if="entrega == 'Retirar'">R${{ subtotal }}</span>
                        </div>
                        <button type="button" class="btn btn-primary mt-3" v-on:click="finalizarPedido()"><i
                                class="bi bi-cart-check-fill"></i> Finalizar
                            pedido</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="p-4 bg-purple-dark text-white" style="min-height: 82vh;" v-if="!acais">
        <ul class="list-group" style="max-width: 100% !important; margin-inline: 0 !important;">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">Seu carrinho está vazio</div>
                </div>
                <a href="/" class="btn btn-primary"><i class="bi bi-cart-plus-fill"></i> Adicionar açaí</a>
            </li>
        </ul>
    </section>
</template>