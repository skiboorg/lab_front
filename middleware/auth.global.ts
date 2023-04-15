import {useAuthStore} from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    console.log(to.name)
    if (!authStore.isLoggedIn && to.name !== 'index') {
        return navigateTo("/");
    }
});