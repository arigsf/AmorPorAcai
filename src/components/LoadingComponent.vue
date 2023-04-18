<script>
export default {
    name: 'LoadingComponent'
}
</script>

<template>
    <div class="spinner-wrapper">
        <div class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<style>
.spinner-wrapper {
    background-color: #571770;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
}

.spinner-border{
    height: 40px;
    width: 40px;
    color: #fff !important;
}
</style>