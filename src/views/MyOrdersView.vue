<script>
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { auth, db } from "../firebase"
import LoadingComponent from "../components/LoadingComponent.vue"

export default {
    name: 'MyOrdersView',
    data() {
        return {
            pedidos: null,
            loading: null,
        }
    },
    async created() {
        this.loading = true
        const q = query(collection(db, "pedidos"), where("uid", "==", auth.currentUser.uid))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const pedidos = []
            querySnapshot.forEach((doc) => {
                const pedido = {
                    id: doc.id,
                    cliente: doc.data().cliente,
                    uid: doc.data().uid,
                    acais: doc.data().acais,
                    entrega: doc.data().entrega,
                    pagamento: doc.data().pagamento,
                    total: doc.data().total,
                    status: doc.data().status,
                    endereco: doc.data().endereco,
                }
                pedidos.push(pedido)
            })
            this.pedidos = (pedidos.length > 0) ? pedidos : null
        })
        this.loading = null
    },
    components: { LoadingComponent }
}
</script>

<template>
    <LoadingComponent v-show="loading" />
    <section class="p-4 bg-purple-dark text-white" style="min-height: 82vh;" v-if="pedidos">
        <div class="row">
            <ol class="list-group list-group-numbered bg-purple-white p-2"
                style="max-width: 100% !important; margin-inline: 0 !important;">
                <li class="list-group-item d-flex justify-content-between align-items-start border-0 text-white"
                    v-for="pedido in pedidos">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">Pedido #{{ pedido.id }}</div>
                    </div>
                    <div>
                        <span class="badge bg-primary mx-2">{{ pedido.status }}</span>
                        <span class="badge bg-primary">{{ pedido.data }}</span>
                        <router-link v-bind:to="{ name: 'pedido', params: { pedido: pedido.id } }"
                            class="text-decoration-none"><button type="button" class="btn btn-sm btn-primary"><i
                                    class="bi bi-eye-fill"></i></button>
                        </router-link>
                    </div>
                </li>
            </ol>
        </div>
    </section>
    <section class="p-4 bg-purple-dark text-white" style="min-height: 82vh;" v-if="!pedidos">
        <ol class="list-group" style="max-width: 100% !important; margin-inline: 0 !important;">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">Você ainda não fez nenhum pedido</div>
                </div>
                <a href="/" class="btn btn-primary"><i class="bi bi-cart-plus-fill"></i> Fazer agora</a>
            </li>
        </ol>
    </section>
</template>