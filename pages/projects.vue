<template lang="pug">
.container.mt-5
  .grid
    .col-10
      p.font-bold.mb-5 ПРОЕКТЫ
    .col-2
      p {{authStore.user.fio}}
  .grid.mb-7
    .col-3(v-for="project in projects" :key="project.id" )
      Card.cursor-pointer(@click="$router.push(`/project?id=${project.uuid}`)")
        template(#header)
          .relative
            img.progect-img(v-if="project.image" :src='project.image')
            img.progect-img(v-else src='https://placehold.co/600x400')
            .tags.absolute
              Tag.w-4rem.mb-1(:severity="project.ready_percent < 30 ? 'danger' : project.ready_percent > 30 && project.ready_percent < 60 ? 'warning' :  project.ready_percent > 60 && project.ready_percent < 99 ? 'info' : project.ready_percent > 99 ? 'success' : 'help' ") {{project.ready_percent}}%
              Tag.w-4rem(severity="warning" ) {{project.total_hours}} ч

        template(#title)
          p {{project.name}}
        template(#subtitle)
          p(v-html="project.description" )
        template(#content)
          p.text-500.mb-1.text-sm Дата начала {{new Date(project.start_date).toLocaleDateString()}}
          p.text-500.text-sm Дата конца  {{project.end_date ? `по ${new Date(project.end_date).toLocaleDateString()}` : `в процессе`}}



    .col-3
      .h-full.flex.flex-column.align-items-center.justify-content-center.shadow-1.cursor-pointer(@click="$router.push('add_project')")
        i.pi.pi-plus.font-bold.text-2xl.text-primary
  p.font-bold.mb-5 Мои пользователи
  .grid
    .col-2(v-for="user in users" :key="user.id" )
      Card
        template(#header)
          .flex.justify-content-center.pt-4
            img.worker-img(v-if="user.avatar" :src='user.avatar')
            img.worker-img(v-else src='https://placehold.co/600x400')
        template(#content)
          p.text-center.text-xl {{user.fio}}
          p.text-center.text-500 {{user.work}}
    .col-2
      .h-full.flex.flex-column.align-items-center.justify-content-center.shadow-1.cursor-pointer(@click="$router.push('add_user')")
        i.pi.pi-plus.font-bold.text-2xl.text-primary


</template>
<script setup>
import {useAuthStore} from "../store/auth";
const authStore = useAuthStore()
const runtimeConfig = useRuntimeConfig();
const APIURL = runtimeConfig.public.apiUrl

const [
  { data: projects },
  { data: users },
] = await Promise.all(
    [
      useFetch(`${APIURL}/api/data/projects?id=${authStore.user.uuid}`),
      useFetch(`${APIURL}/api/user/my_users?id=${authStore.user.uuid}`),
    ]
)



</script>
<style lang="sass" scoped>
.tags

.tags
  display: flex
  flex-direction: column
  top: 10px
  right: 10px
.progect-img
  width: 100%
  height: 205px
  object-fit: cover
.worker-img
  width: 100px
  height: 100px
  border-radius: 100%
  object-fit: cover
</style>