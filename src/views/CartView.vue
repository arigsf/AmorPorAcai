<script>
export default {
    name: 'CartView',
    data() {
        return {
            acais: null,
        }
    },
    async created() {
        const carrinho = localStorage.getItem("carrinho") ? JSON.parse(localStorage.getItem("carrinho")) : null
        this.acais = carrinho
    },
    methods: {

    }
}
</script>

<template>
    <section class="p-4 bg-purple-dark text-white" style="min-height: 82vh;" v-if="acais">
        <div class="row">
            <div class="col-md-6">

                <ol class="list-group list-group-numbered" style="max-width: 100% !important; margin-inline: 0 !important;">
                    <li class="list-group-item d-flex justify-content-between align-items-start" v-for="acai in acais">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">{{ acai.acai }}</div>
                            <div class="row">
                                <div class="col-md-6" v-if="acai.adicionais.basicos.length != 0">
                                    <p class="m-0">Adicionais básicos:</p>
                                    <ul>
                                        <li v-for="basico in acai.adicionais.basicos">{{ basico }}</li>
                                    </ul>
                                </div>
                                <div class="col-md-6" v-if="acai.adicionais.avancados.length != 0">
                                    <p class="m-0">Adicionais avançados:</p>
                                    <ul>
                                        <li v-for="avancado in acai.adicionais.avancados">{{ avancado }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <span class="badge bg-primary rounded-pill">14</span>
                    </li>
                </ol>
            </div>
            <div class="col-md-6"></div>
        </div>
    </section>
</template>