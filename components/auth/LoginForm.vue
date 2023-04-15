<template>
  <form @submit.prevent="handleSubmit(!v$.$invalid)" class="w-full p-fluid surface-card py-8 px-5 sm:px-8 " style="border-radius: 53px">
    <div class="text-center mb-5">
      <img src="https://placehold.co/600x400" alt="Image" height="50" class="mb-3" />
      <div class="text-900 text-3xl font-medium mb-3">Вход</div>
    </div>

    <div  class="">

      <label for="login"
             v-if="v$.login.$invalid && formData.login || v$.login.$invalid && submitted"
             class="p-error text-sm block mb-2">Логин должен быть минимум 4 символа</label>
      <label for="login" v-else class="block text-600 text-sm  mb-2">Ващ логин</label>
      <InputText id="login"
                 type="text"
                 class="w-full md:w-30rem mb-3 "
                 :class="{'p-invalid':v$.login.$invalid && formData.login || v$.login.$invalid && submitted}"
                 v-model="formData.login" />


      <label for="password"
             v-if="v$.password.$invalid && formData.password || v$.password.$invalid && submitted"
             class="p-error text-sm block mb-2">Пароль должен быть минимум 8 символов</label>
      <label for="password" v-else class="block text-600 text-sm  mb-2">Пароль</label>

      <Password id="password" v-model="formData.password"

                :toggleMask="true"
                :feedback="false"
                class="w-full mb-3"
                :class="{'p-invalid':v$.password.$invalid && formData.password || v$.password.$invalid && submitted}"
                inputClass="w-full"
      />
      <div class="flex align-items-center justify-content-between mb-5 gap-5">
        <div class="flex align-items-center">
          <Checkbox v-model="formData.remember_me" id="rememberme1" binary class="mr-2"></Checkbox>
          <label @click="formData.remember_me = !formData.remember_me" for="rememberme1" class="block text-600 text-sm  cursor-pointer">Запомнить меня</label>
        </div>
        <p class="font-medium no-underline ml-2 text-right cursor-pointer text-primary" @click="changeForm('forgot')" >Забыли пароль?</p>
      </div>
      <Button label="Войти" :loading="loading" type="submit" class="w-full p-3 text-xl mb-2 md:mb-3"></Button>
      <p class="text-center">Нет аккаунта?
        <span @click="changeForm('register')" class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Зарегистрироваться</span>
      </p>
    </div>
  </form>
  <Toast/>
</template>
<script setup >
import { email, required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import {useAuthStore} from "~/store/auth";


const emits = defineEmits(['changeForm'])

const authStore = useAuthStore()
const { $toast } = useNuxtApp()
const router = useRouter()

const formData = reactive({
  login: 'test1',
  password: '123',
  remember_me: false
});
const submitted = ref(false)
const loading = ref(false)
const rules = {
  login: { required,minLengthValue: minLength(3) },
  password: { required,minLengthValue: minLength(3) },
};

const v$ = useVuelidate(rules, formData);

const changeForm = (formType) => {
  emits('changeForm',formType)
}

const handleSubmit = async (isFormValid) => {
  submitted.value = true
  if (!isFormValid) {
    return;
  }
  loading.value = true
  const result = await authStore.login(formData.login,formData.password)
  if (result.error.value){
    if (result.error.value.data.non_field_errors){
      result.error.value.data.non_field_errors.forEach((el)=>{
        $toast.add({severity:'error', summary: 'Ошибка авторизации', detail:el, life: 3000});
      })
    }
    loading.value = false
  }else {
    $toast.add({
      severity: 'success',
      summary: 'Успешная авторизация',
      detail: 'Получение данных пользователя...',
      life: 3000
    });

    if (formData.remember_me) {
      const cookie = useCookie('auth_token', {
        maxAge: 86400
      })
      cookie.value = authStore.auth_token
    } else {
      const cookie = useCookie('auth_token')
      cookie.value = authStore.auth_token
    }
    await authStore.getUser()
    router.push('/projects')

  }
}

</script>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}
.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>