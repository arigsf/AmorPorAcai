<script setup>
import { RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<template>
  <main>
    <NavbarComponent />
    <RouterView />
    <FooterComponent />
  </main>

</template>