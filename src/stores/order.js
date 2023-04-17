import { defineStore } from "pinia"
import { collection, addDoc, doc } from "firebase/firestore"
import { db } from "../firebase"

export const useOrderStore = defineStore("orders", {
    actions: {
        async add(cliente, uid, acais, entrega, pagamento, subtotal, taxa_entrega, total, status, endereco) {
            try {
                await addDoc(collection(db, "pedidos"), {
                    cliente: cliente,
                    uid: uid,
                    acais: acais,
                    entrega: entrega,
                    pagamento: pagamento,
                    subtotal: subtotal,
                    taxa_entrega: taxa_entrega,
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