<template lang="pug">
.container
  .grid.pt-5.mb-5
    .col-3
      dropdown.w-full.h-full(optionlabel='name' placeholder='Прокты')
    .col-2
      Button.w-full(label="НА ГЛАВНУЮ" type="button" severity="warning" outlined)
    .col-2
      Button.w-full.bg-green-500(label="КОМАНДА")
    .col-2
      Button.w-full.bg-red-500(label="ДОБАВИТЬ СИНТЕЗ" @click="$router.push(`/add_sintez?project=${project.uuid}`)")
    .col-3
      dropdown.w-full.h-full(optionlabel='name' placeholder='Иван Иванов')
  .grid
    .col-7
      p.font-bold.mb-5.text-2xl Проведенные работы
    .col-5
      InputText.mr-3(placeholder="Поиск по коду")
      Button(label="Фильтрация" )
  client-only
    DataTable(:value="project.sintezes")

      Column(field='code' header='Код')
      Column(field='worker.fio' header='Исполнитель' sortable)
      Column(field='start_date' header='Дата проведения' sortable)
        template(#body="slotProps")
          p {{new Date(slotProps.data.start_date).toLocaleDateString()}}
      Column(field='start_date' header='Дата создания')
        template(#body="slotProps")
          p {{new Date(slotProps.data.created_at).toLocaleDateString()}}
      Column(field='hours' header='Часов')
      Column(field='status' header='Статус')
        template(#body="slotProps")
          Tag(:severity="slotProps.data.status===null ? 'warning' : slotProps.data.status ? 'success' : 'danger'" ) {{slotProps.data.status===null ? 'В РАБОТЕ' : slotProps.data.status ? 'УСПЕШНО' : 'НЕ УСПЕШНО'}}
      Column(field='url' header='')
        template(#body="slotProps")
          i.pi.pi-arrow-right.cursor-pointer(@click="$router.push(`/sintez?id=${slotProps.data.uuid}`)")

</template>



<script setup>
  const runtimeConfig = useRuntimeConfig();
  const APIURL = runtimeConfig.public.apiUrl

  const route = useRoute()
  const uuid = route.query.id

  const { data:project} = await useAsyncData(
  'project',
  () => $fetch(`${APIURL}/api/data/project?id=${uuid}`)
  )

</script>
