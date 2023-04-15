
export const useApi = () => {
    const runtimeConfig = useRuntimeConfig();
    const APIURL = runtimeConfig.public.apiUrl

    const getData = async () => {
        // const { data:countries} = await useAsyncData(
        //     'countries',
        //     () => $fetch(`${APIURL}/api/data/countries`)
        // )
        // const { data:types} = await useAsyncData(
        //     'types',
        //     () => $fetch(`${APIURL}/api/data/types`)
        // )
        const { data :countries} = await $fetch(`${APIURL}/api/data/countries`)
        //const { data :types} = await $fetch(`${APIURL}/api/data/types`)
        console.log(data)
        // console.log(pending,error,refresh)
        //return {countries,types}
    }



    return {
        getData
    }
}