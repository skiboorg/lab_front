import {useAuthStore} from "~/store/auth";

export default defineNuxtPlugin(async () => {
    const authStore = useAuthStore()
    const auth_token = useCookie('auth_token')
    console.log('init token', auth_token.value)
    if (auth_token.value){
        authStore.setToken(auth_token.value)
        await authStore.getUser()
    }
})