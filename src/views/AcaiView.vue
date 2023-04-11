<script>
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export default {
    name: 'AcaiView',
    data() {
        return {
            acai: null,
            adicionais: [],
            preco: null,
            basicos: [],
            avancados: []
        }
    },
    async created() {
        const querySnapshot = await getDocs(query(collection(db, "acais"), where("slug", "==", this.$route.params.acai)))
        querySnapshot.forEach((doc) => {
            const result = {
                id: doc.id,
                incluso: doc.data().incluso,
                preco: doc.data().preco,
                slug: doc.data().slug,
                titulo: doc.data().titulo
            }
            this.acai = result
            this.preco = result.preco
        })
        const querySnapshot2 = await getDocs(query(collection(db, "adicionais")))
        querySnapshot2.forEach((doc) => {
            const result = {
                avancados: doc.data().avancados,
                basicos: doc.data().basicos,
                taxa_entrega: doc.data().taxa_entrega,
                preco_basico: doc.data().preco_basico,
                preco_avancado: doc.data().preco_avancado
            }
            this.adicionais = result
        })
    },
    methods: {
        atualizarPreco() {
            this.preco = this.acai.preco + this.adicionais.preco_basico * this.basicos.length + this.adicionais.preco_avancado * this.avancados.length
        },
        adicionarCarrinho() {
            var adicionar = true
            var novo_carrinho = []
            var novo_acai = {
                acai: this.acai.titulo,
                adicionais: {
                    basicos: this.basicos ? this.basicos : null,
                    avancados: this.avancados ? this.avancados : null
                },
                preco: this.preco,
                quantidade: 1
            }

            const carrinho = localStorage.getItem("carrinho") ? JSON.parse(localStorage.getItem("carrinho")) : null

            if (carrinho != null) {
                for (let i = 0; i < carrinho.length; i++) {
                    if (JSON.stringify(novo_acai.acai) == JSON.stringify(carrinho[i].acai) && JSON.stringify(novo_acai.adicionais) == JSON.stringify(carrinho[i].adicionais)) {
                        novo_acai.quantidade += carrinho[i].quantidade
                        novo_carrinho.push(novo_acai)
                        adicionar = false
                    } else {
                        novo_carrinho.push(carrinho[i])
                    }
                }
            } else {
                novo_carrinho.push(novo_acai)
                adicionar = false
            }

            if (adicionar == true) {
                novo_carrinho.push(novo_acai)
            }

            for (let i = 0; i < novo_carrinho.length; i++) {
                novo_carrinho[i].id = i + 1
            }

            localStorage.setItem("carrinho", JSON.stringify(novo_carrinho))
            this.$router.go({ path: this.path })
        }
    }
}
</script>

<template>
    <section class="p-4 bg-purple-dark text-white" style="min-height: 82vh;" v-if="acai">
        <div class="row">
            <div class="col-md-7">
                <div class="card bg-purple-white text-white mb-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h5 class="card-title">{{ acai.titulo }}</h5>
                                <ul class="my-0">
                                    <li v-for="incluso in acai.incluso">{{ incluso }}</li>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <img src="../assets/img/acai-puro.png" class="d-block mx-auto img-fluid">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card bg-purple-white text-white mb-3">
                    <div class="card-body d-flex justify-content-between">
                        <h5 class="card-title">Seu açaí até o momento</h5>
                        <p class="fs-5 fw-semibold m-0">R${{ preco }}</p>
                    </div>
                </div>
                <button type="button" class="btn btn-primary mb-4" v-on:click="adicionarCarrinho()"><i
                        class="bi bi-cart-plus-fill"></i> Adicionar ao
                    carrinho</button>
            </div>
            <div class="col-md-5">
                <div class="row">
                    <div class="col-6">
                        <div class="d-flex flex-column flex-md-row justify-content-center">
                            <div class="list-group list-group-checkable gap-2 border-0 mx-0">
                                <p class="fs-6 fw-semibold m-0">Adicionais básicos</p>
                                <div v-for="basico in adicionais.basicos">
                                    <input class="list-group-item-check pe-none" type="checkbox" name="basicos"
                                        v-bind:id="basico" v-bind:value="basico" v-model="basicos"
                                        v-on:change="atualizarPreco()">
                                    <label class="list-group-item rounded-3 py-2" v-bind:for="basico">
                                        {{ basico }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex flex-column flex-md-row justify-content-center">
                            <div class="list-group list-group-checkable gap-2 border-0 mx-0">
                                <p class="fs-6 fw-semibold m-0">Adicionais avançados</p>
                                <div v-for="avancado in adicionais.avancados">
                                    <input class="list-group-item-check pe-none" type="checkbox" name="avancados"
                                        v-bind:id="avancado" v-bind:value="avancado" v-model="avancados"
                                        v-on:change="atualizarPreco()">
                                    <label class="list-group-item rounded-3 py-2" v-bind:for="avancado">
                                        {{ avancado }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>