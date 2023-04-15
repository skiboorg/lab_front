<template lang="pug">
.container
  p.font-bold.mb-5 Новый пользователь

  p.mb-2 Логин
  InputText.mb-3( v-model="user.login" )
  p.mb-2 ФИО
  InputText.mb-3( v-model="user.fio" )
  p.mb-2 Должность
  InputText.mb-3( v-model="user.work" )
  p.mb-2 Пароль
  InputText.mb-3( v-model="user.password" )
  p.mb-2 Комметарий
  Textarea.mb-3( v-model="user.comment")
  p.mb-2 Фото
  input.mb-3( type="file" v-on:change="handleFile($event)")
  Button(@click="save" label="Сохранить" )
</template>

<script setup>
import {useAuthStore} from "~/store/auth";
const router = useRouter()
const runtimeConfig = useRuntimeConfig();
const APIURL = runtimeConfig.public.apiUrl
const authStore = useAuthStore()

const user = ref({
  fio:null,
  work:null,
  avatar:null,
  login:null,
  comment:null,
  password:null
})

const handleFile = (e) => {
  user.value.avatar = e.target.files[0]
  console.log(user.value)
}

const save = async () => {

  let formData = new FormData();
  formData.append('image', user.value.avatar );

  formData.append('data',JSON.stringify(user.value))
  await $fetch( `${APIURL}/api/user/add_user`, {
    headers:authStore.headers,
    method: 'POST',
    body: formData
  } );
  router.back()
}
</script>