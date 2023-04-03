<script>
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export default {
    name: 'AcaiView',
    data() {
        return {
            acai: null,
            adicionais: null
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
        })
    }
}
</script>

<template></template>