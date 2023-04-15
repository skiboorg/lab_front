import { defineStore } from 'pinia'


export const useAuthStore = defineStore('authStore',()=>{
    const userData = reactive({})
    const auth_token = ref(null)
    const isLoggedIn = ref(false)
    const router = useRouter()
    const auth_token_cookie = useCookie('auth_token')

    const runtimeConfig = useRuntimeConfig();
    const APIURL = runtimeConfig.public.apiUrl

    const user = computed(()=>userData.value)

    const headers = computed(()=>{
        return {'Authorization': `Token ${auth_token.value}`}
    })

    const getUser = async () => {
        const response = await useFetch(`${APIURL}/api/user/me`,{
            headers:headers.value,
            method:'get',

        })
        if (response.error.value){
            userData.value={}
            isLoggedIn.value=false
            auth_token.value = null
            auth_token_cookie.value = null
            router.push('/')
        }else {
            userData.value = response.data.value
            isLoggedIn.value = true
        }
    }

    const setToken = (token) => {
        auth_token.value = token
    }

    const login = async ( login,password) => {
        const data = {
            login,
            password
        }

        const response = await useFetch(`${APIURL}/auth/token/login/`,{
            method:'post',
            body:data,

        })
        if (response.data.value){
            // @ts-ignore
            auth_token.value = response.data.value.auth_token
        }

        return response

    }
    const register = async ( login,password,is_tourist) => {
        const data = {
            login,
            password,
            is_tourist:is_tourist.value
        }
        const response = await useFetch($`{APIURL}/auth/users/`,{
            method:'post',
            body:data
        })
        return response
    }


    return{
        login,register,getUser,setToken, isLoggedIn,auth_token,user,headers
    }
})