import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import weekdayPlugin from 'dayjs/plugin/weekday.js'
import objectPlugin from 'dayjs/plugin/toObject.js'
import isTodayPlugin from 'dayjs/plugin/isToday.js'
import durationPlugin from 'dayjs/plugin/duration.js'

export default defineNuxtPlugin((nuxtApp) => {
    dayjs.extend(relativeTime)
    dayjs.extend(weekdayPlugin)
    dayjs.extend(objectPlugin)
    dayjs.extend(isTodayPlugin)
    dayjs.extend(durationPlugin)
    dayjs.locale('ru',{weekStart:1})

    nuxtApp.provide('dayjs', dayjs)
})
declare module '#app' {
    interface NuxtApp {
        $dayjs: dayjs.Dayjs
    }
}
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $dayjs(date?: dayjs.ConfigType): dayjs.Dayjs
    }
}