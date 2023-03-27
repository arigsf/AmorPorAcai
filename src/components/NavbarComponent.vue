<script>
import { auth } from "../firebase"
const cart = JSON.parse(localStorage.getItem('carrinho'))

export default {
    name: 'NavbarComponent',
    data() {
        return {
            isLoggedIn: false,
            currentUser: null,
            carrinho: 0
        }
    },
    created() {
        if (auth.currentUser) {
            this.isLoggedIn = true
            this.currentUser = auth.currentUser
        }
        this.carrinho = (cart) ? cart.length : 0
    }
}
</script>

<template>
    <nav class="navbar navbar-expand-lg border-bottom bg-purple-dark" data-bs-theme="dark">
        <div class="container-fluid">
            <a href="/" class="navbar-brand">MyBurger</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a href="/" class="nav-link active">Início</a>
                    </li>
                    <li class="nav-item" v-if="!isLoggedIn">
                        <a href="/login" class="nav-link active">Login</a>
                    </li>
                    <li class="nav-item" v-if="!isLoggedIn">
                        <a href="/cadastrar" class="nav-link active">Cadastrar</a>
                    </li>
                    <li class="nav-item">
                        <a href="/carrinho" class="nav-link active"><i class="bi bi-cart-fill mx-1"></i>Carrinho <span
                                class="badge bg-primary">{{ carrinho }}</span></a>
                    </li>
                    <li class="nav-item" v-if="isLoggedIn">
                        <div class="btn-group">
                            <a class="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i class="bi bi-person-fill mx-1"></i>{{ currentUser.displayName }}
                            </a>
                            <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                                <li v-if="!(currentUser.uid == 'Hb5QUZrxGiW6tCorKfp8aNmAOLY2')"><a class="dropdown-item"
                                        href="/pedidos">Meus pedidos</a></li>
                                <li v-if="!(currentUser.uid == 'Hb5QUZrxGiW6tCorKfp8aNmAOLY2')"><a class="dropdown-item"
                                        href="/conta">Minha conta</a></li>
                                <li v-if="currentUser.uid == 'Hb5QUZrxGiW6tCorKfp8aNmAOLY2'"><a class="dropdown-item"
                                        href="/admin">Painel administrativo</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" v-on:click="logout" href="#">Sair</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>