<template>
    <section class="p-4 bg-purple-dark" style="min-height: 82vh">
        <form class="col-md-5 mx-auto my-5 rounded border p-4">
            <h1 class="h3 mb-3 fw-normal text-white">Login</h1>
            <div class="form-floating mb-2">
                <input type="email" class="form-control" id="email" placeholder="name@example.com">
                <label for="email">Email</label>
            </div>
            <div class="form-floating mb-2">
                <input type="password" class="form-control" id="senha" placeholder="Password">
                <label for="senha">Senha</label>
            </div>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Entrar</button>
        </form>
    </section>
</template>