<template lang="pug">
.container
  p.font-bold.mb-5 Новый проект

  p.mb-2 Название
  InputText.mb-3( v-model="project.name" )
  p.mb-2 Процент готовности
  InputText.mb-3( v-model="project.ready_percent" )
  p.mb-2 Описание
  Editor.mb-3(id="name" v-model="project.description")
  p.mb-2 Дата начала
  Calendar.mb-3( v-model="project.start_date" )
  p.mb-2 Дата завершения
  Calendar.mb-3( v-model="project.end_date" )
  p.mb-2 Изображение
  input.mb-3( type="file" v-on:change="handleFile($event)")
  p.mb-2 Пользователи
  MultiSelect(v-model="project.selectedUsers" :options="users" optionLabel="fio")
  br
  br
  Button(@click="save" label="Сохранить" )
</template>

<script setup>
import {useAuthStore} from "~/store/auth";
const router = useRouter()
const runtimeConfig = useRuntimeConfig();
const APIURL = runtimeConfig.public.apiUrl
const authStore = useAuthStore()

const project = ref({
  name:null,
  description:null,
  file:null,
  selectedUsers:null,
  start_date:null,
  end_date:null,
  ready_percent:null,

})

const [
  { data: users },
] = await Promise.all(
    [
      useFetch(`${APIURL}/api/user/my_users?id=${authStore.user.uuid}`),
    ]
)

const handleFile = (e) => {
  project.value.file = e.target.files[0]
}

const save = async () => {

  let formData = new FormData();
  let temp_date
  if (project.value.start_date){
    temp_date = new Date(project.value.start_date).toLocaleDateString().split('.')
    console.log(temp_date)
    let new_date = `${temp_date[2]}-${temp_date[1]}-${temp_date[0]}`
    project.value.start_date = new_date
  }
  if (project.value.end_date){
    temp_date = new Date(project.value.end_date).toLocaleDateString().split('.')
    console.log(temp_date)
    let new_date = `${temp_date[2]}-${temp_date[1]}-${temp_date[0]}`
    project.value.end_date = new_date
  }


  formData.append('image', project.value.file );

  formData.append('data',JSON.stringify(project.value))
  await $fetch( `${APIURL}/api/data/add_project`, {
    headers:authStore.headers,
    method: 'POST',
    body: formData
  } );
  router.back()
}
</script>