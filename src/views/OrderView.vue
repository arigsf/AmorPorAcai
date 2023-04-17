<script>
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"

export default {
    name: 'OrderView',
    data() {
        return {
            pedido: null
        }
    },
    async created() {
        const unsub = onSnapshot(doc(db, "pedidos", this.$route.params.pedido), (doc) => {
            const pedido = {
                id: doc.id,
                cliente: doc.data().cliente,
                uid: doc.data().uid,
                acais: doc.data().acais,
                entrega: doc.data().entrega,
                pagamento: doc.data().pagamento,
                subtotal: doc.data().subtotal,
                taxa_entrega: doc.data().taxa_entrega,
                total: doc.data().total,
                status: doc.data().status,
                endereco: doc.data().endereco,
            }
            this.pedido = (pedido) ? pedido : null
        })
    }
}
</script>

<template>
    <section class="p-4 bg-purple-dark text-white" style="min-height: 82vh;" v-if="pedido">
        <div class="row">
            <div class="me-auto">
                <div class="card bg-purple-white text-white mb-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h6>Pedido #{{ pedido.id }}</h6>
                            <span class="badge bg-primary fs-6">{{ pedido.status }}</span>
                        </div>
                        <small class="text-white-50">Acompanhe seu pedido, que é atualizado automaticamente.</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-7">
                <ol class="list-group list-group-numbered bg-purple-white p-2"
                    style="max-width: 100% !important; margin-inline: 0 !important;">
                    <li class="list-group-item d-flex justify-content-between align-items-start border-0 text-white"
                        v-for="acai in pedido.acais">
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
                            <span class="badge bg-primary fs-6 mx-2">R${{ acai.preco }}</span>
                            <span class="badge bg-primary fs-6" v-if="acai.quantidade == 1">{{ acai.quantidade }}
                                unidade</span>
                            <span class="badge bg-primary fs-6" v-if="acai.quantidade > 1">{{ acai.quantidade }}
                                unidades</span>
                        </div>
                    </li>
                </ol>
            </div>
            <div class="col-md-5">
                <div class="card bg-purple-white text-white mb-3">
                    <div class="card-body">
                        <h6 class="card-title">Entrega</h6>
                        <select class="form-select my-3" disabled>
                            <option>{{ pedido.entrega }}</option>
                        </select>
                        <h6 class="card-title">Pagamento no ato da entrega via</h6>
                        <select class="form-select my-3" disabled>
                            <option>{{ pedido.pagamento }}</option>
                        </select>
                        <h6 class="card-title">Resumo do seu pedido</h6>
                        <div class="d-flex justify-content-between" v-if="pedido.entrega == 'Entregar'">
                            <span>Subtotal</span>
                            <span>R${{ pedido.subtotal }}</span>
                        </div>
                        <div class="d-flex justify-content-between" v-if="pedido.entrega == 'Entregar'">
                            <span>Taxa de entrega</span>
                            <span>R${{ pedido.taxa_entrega }}</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span>Total</span>
                            <span>R${{ pedido.total }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="p-4 bg-purple-dark text-white" style="min-height: 82vh;" v-if="!pedido">
        <ol class="list-group" style="max-width: 100% !important; margin-inline: 0 !important;">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">Esse pedido não existe</div>
                </div>
                <a href="/pedidos" class="btn btn-primary"><i class="bi bi-cart-plus-fill"></i> Ver meus pedidos</a>
            </li>
        </ol>
    </section>
</template>