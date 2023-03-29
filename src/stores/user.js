import { defineStore } from "pinia"
import { auth } from "../firebase/index"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            user: null,
        }
    },
    actions: {
        async register(email, senha, nome, endereco) {
            try {
                await createUserWithEmailAndPassword(auth, email, senha)
                await updateProfile(auth.currentUser, { displayName: nome, photoURL: endereco })
                this.user = auth.currentUser
                this.$router.go({ path: this.$router.path })
            } catch (error) {
                if (error.code == "auth/email-already-in-use") {
                    alert("Email já está em uso!")
                } else if (error.code == "auth/invalid-email") {
                    alert("Email inválido!")
                } else {
                    alert("Ocorreu um erro ao cadastrar! Código do erro: " + error.code)
                }
            }
        },
        async login(email, senha) {
            try {
                await signInWithEmailAndPassword(auth, email, senha)
                this.user = auth.currentUser
                this.$router.go({ path: this.$router.path })
            } catch (error) {
                if (error.code == "auth/user-not-found") {
                    alert("Email e/ou senha incorretos!")
                } else if (error.code == "auth/wrong-password") {
                    alert("Email e/ou senha incorretos!")
                } else if (error.code == "auth/invalid-email") {
                    alert("Email inválido!")
                } else {
                    alert("Ocorreu um erro ao logar! Código do erro: " + error.code)
                }
            }
        },
        async logout(){
            await signOut(auth)
            this.user = null
            this.$router.go({ path: this.$router.path })
        }
    }
})