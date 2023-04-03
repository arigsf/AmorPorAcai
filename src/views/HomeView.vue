<script>
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export default {
  name: 'HomeView',
  data() {
    return {
      acais: null
    }
  },
  async created() {
    const querySnapshot = await getDocs(collection(db, "acais"))
    let results = []
    querySnapshot.forEach((doc) => {
      const acai = {
        id: doc.id,
        incluso: doc.data().incluso,
        preco: doc.data().preco,
        slug: doc.data().slug,
        titulo: doc.data().titulo
      }
      results.push(acai)
    })
    this.acais = results
  }
}
</script>

<template>
  <section>
    <div class="p-4 bg-purple-dark text-white">
      <div class="container col-xxl-8 px-4 mt-3">
        <div class="row align-items-center g-5">
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold lh-1 mb-3">Amor por Açaí</h1>
            <p class="lead">Junte-se ao time dos apaixonados por açaí, um fruto brasileiro que ganhou o coração de muita
              gente! Aqui no Amor por Açaí, você pode personalizar o seu com vários adicionais!</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <a href="#acais" class="btn btn-primary btn-lg px-4 me-md-2">Eu amo açaí</a>
            </div>
          </div>
          <div class="col-10 col-sm-8 col-lg-6">
            <img src="../assets/img/acai.png" class="d-block mx-lg-auto" loading="lazy"
              style="max-width: 120%; height: auto;">
          </div>
        </div>
      </div>
    </div>
    <div class="p-4 bg-purple-white">
      <div id="acais" class="row row-cols-1 row-cols-md-3 mb-3 text-center w-75 mx-auto my-5">
        <div class="col" v-for="acai in acais">
          <div class="card text-bg-light mb-4 rounded-3 shadow-sm">
            <div class="card-header py-3">
              <h4 class="my-0 fw-normal">{{ acai.titulo }}</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">R${{ acai.preco }}</h1>
              <ul class="list-unstyled mt-3 mb-4">
                <li v-for="incluso in acai.incluso">{{ incluso }}</li>
              </ul>
              <router-link class="w-100 btn btn-lg btn-outline-primary"
                v-bind:to="{ name: 'acai', params: { acai: acai.slug } }">Quero esse</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
