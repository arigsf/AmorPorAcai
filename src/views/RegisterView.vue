<script setup>
import { ref } from "vue"
import { useUserStore } from "../stores/user"

const nome = ref("")
const email = ref("")
const senha = ref("")
const rua = ref("")
const numero = ref("")
const bairro = ref("")

const userStore = useUserStore()

const register = () => {
    const endereco = rua.value + ", " + numero.value + ". " + bairro.value + ". Cláudio-MG"
    userStore.register(email.value, senha.value, nome.value, endereco)
}
</script>

<template>
    <section class="p-4 bg-purple-dark" style="min-height: 82vh">
        <form class="col-md-5 mx-auto my-5 rounded border p-4" @submit.prevent="register">
            <h1 class="h3 mb-3 fw-normal text-white">Cadastre-se</h1>
            <p class="text-white"><i class="bi bi-person-fill"></i> Dados pessoais</p>
            <div class="form-floating mb-2">
                <input type="text" class="form-control text-dark" id="nome" placeholder="Nome..." v-model="nome">
                <label class="text-dark" for="nome">Nome</label>
            </div>
            <div class="form-floating mb-2">
                <input type="email" class="form-control text-dark" id="email" placeholder="name@example.com" v-model="email">
                <label class="text-dark" for="email">Email</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control text-dark" id="senha" placeholder="Password" v-model="senha">
                <label class="text-dark" for="senha">Senha</label>
            </div>
            <p class="text-white"><i class="bi bi-geo-alt-fill"></i> Endereço</p>
            <div class="row">
                <div class="col-md-8">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control text-dark" id="rua" placeholder="Rua/Avenida..." v-model="rua">
                        <label class="text-dark" for="rua">Rua/Avenida</label>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control text-dark" id="numero" placeholder="Número..." v-model="numero">
                        <label class="text-dark" for="numero">Número</label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-5">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control text-dark" id="bairro" placeholder="Bairro..." v-model="bairro">
                        <label class="text-dark" for="bairro">Bairro</label>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control text-dark" id="cidade" placeholder="Cidade..."
                            value="Cláudio" readonly>
                        <label class="text-dark" for="cidade">Cidade</label>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control text-dark" id="estado" placeholder="Estado..." value="MG"
                            readonly>
                        <label class="text-dark" for="estado">Estado</label>
                    </div>
                </div>
            </div>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Cadastrar</button>
        </form>
    </section>
</template>