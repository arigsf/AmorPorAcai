import { defineStore } from "pinia"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebase"

export const useOrderStore = defineStore("orders", {
    actions: {
        async add(cliente, uid, acais, entrega, pagamento, total, status, endereco) {
            try {
                await addDoc(collection(db, "pedidos"), {
                    cliente: cliente,
                    uid: uid,
                    acais: acais,
                    entrega: entrega,
                    pagamento: pagamento,
                    total: total,
                    status: status,
                    endereco: endereco,
                })
                this.$router.go({ path: this.$router.path })
            } catch (error) {
                alert(error)
            }
        },
    }
})