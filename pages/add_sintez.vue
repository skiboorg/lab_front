<template lang="pug">
pre {{card}}
pre {{sintez}}
.container
  p.font-bold.mb-5 Новый синтез
  
  p.mb-2 Название синтеза
  InputText.mb-3( v-model="sintez.name" )
  p.mb-2 Код
  InputText.mb-3( v-model="sintez.code" )
  p.mb-2 Затрачено часов
  InputText.mb-3( v-model="sintez.hours" )
  p.mb-2 Дата проведения
  Calendar.mb-3( v-model="sintez.start_date" )
  p.mb-2 Формула формата SMILES
  InputText.mb-3( v-model="sintez.smiles_formula" )
  p.mb-2 Загрузка формулы синтеза
  input.mb-3( type="file" v-on:change="handleFileMain($event)")

  p.font-bold.mb-5 Карточки
  .grid
    .col-3
      Button.mb-3(:disabled="sintez.start_card" label="Добавить главный реактив" @click="firstCardDialog=true")
    .col-3
      Button.mb-3(label="Добавить реактив" @click="addCardDialog = true")
    .col-3
      Button.mb-3(:disabled="sintez.final_card" label="Добавить продукт" @click="finalCardDialog = true")

  .flex.overflow-y-auto.mb-5

    Card(v-if="sintez.start_card" )
      template(#subtitle)
        .flex.justify-content-between.align-items-center
          p Главный реактив
          .p
            i.pi.pi-trash.text-red-300.cursor-pointer.mr-3
            //i.pi.pi-pencil.text-blue-400.cursor-pointer
      template(#content)
        p.mb-2.text-sm.text-400 Формула
        p.mb-3(v-html="sintez.start_card.formula_calculated")
        p.mb-2.text-sm.text-400 Эквивалент
        p.mb-3 1
        p.mb-2.text-sm.text-400 Масса образца
        p.mb-3 {{sintez.start_card.sample_weight}} mg

    Card(v-for="(card,index) in sintez.cards" :key="index" )
      template(#subtitle)
        .flex.justify-content-between.align-items-center
          p Реактив {{index+1}}
          .p
            i.pi.pi-trash.text-red-300.cursor-pointer.mr-3
      template(#content)
        p.mb-2.text-sm.text-400 Формула
        p.mb-3(v-html="card.formula_calculated" )
        p.mb-2.text-sm.text-400 Эквивалент
        p.mb-3(v-html="card.equavalent" )
    Card(v-if="sintez.final_card" )
      template(#subtitle)
        .flex.justify-content-between.align-items-center
          p Продукт
          .p
            i.pi.pi-trash.text-red-300.cursor-pointer.mr-3
            //i.pi.pi-pencil.text-blue-400.cursor-pointer
      template(#content)
        p.mb-2.text-sm.text-400 Формула
        p.mb-3(v-html="sintez.final_card.formula_calculated")



  p.font-bold.mb-5 Шаги

  .border-1.py-2.px-2.mb-3(v-for="(step,index) in sintez.steps" :key="index")
    Editor.mb-3(id="name" v-model="step.text")
    input.mb-3( type="file" v-on:change="handleFile($event,index,'step')")
  Button.mb-5(@click="add('step')" label="Добавить шаг" )

  p.font-bold.mb-5 Изображения

  .border-1.py-2.px-2.mb-3(v-for="(image,index) in sintez.images" :key="index")
    InputText.mb-3(id="name" v-model="image.text")
    input.mb-3( type="file" v-on:change="handleFile($event,index,'image')")
  Button.mb-5(@click="add('image')" label="Добавить картинку" )
  p.font-bold.mb-5 Файлы

  .border-1.py-2.px-2.mb-3(v-for="(file,index) in sintez.files" :key="index")
    InputText.mb-3(id="name" v-model="file.text")
    input.mb-3( type="file" v-on:change="handleFile($event,index,'file')")
  Button.mb-5(@click="add('file')" label="Добавить файл" )
  br
  hr
  Button(@click="save" label="Сохранить" severity="warning")
  p
  Dialog(v-model:visible="firstCardDialog" modal='' header='Главный реактив' :style="{ width: '30vw' }")
    p.mb-3 Введите формулу
    InputText.w-full.mb-3(v-model="card.formula_raw")
    p.mb-2 Формула
    p.mb-3(v-html="card.formula_calculated" )
    p.mb-2 Эквивалент
    p.mb-3 1
    p.mb-2 Введите массу образца
    InputText.w-full.mb-3(v-model="card.sample_weight")
    Button(label="Сохранить" @click="addFirstCard")

  Dialog(v-model:visible="addCardDialog" modal='' header='Реактив' :style="{ width: '30vw' }")
    p.mb-3 Введите формулу
    InputText.w-full.mb-3(v-model="card.formula_raw")
    p.mb-2 Формула
    p.mb-3(v-html="card.formula_calculated" )
    p.mb-2 Введите эквивалент
    InputText.w-full.mb-6(v-model="card.equavalent")
    Button(label="Сохранить" @click="addNextCard")
  Dialog(v-model:visible="finalCardDialog" modal='' header='Продукт' :style="{ width: '30vw' }")
    p.mb-3 Введите формулу
    InputText.w-full.mb-3(v-model="card.formula_raw")
    p.mb-2 Формула
    p.mb-6(v-html="card.formula_calculated" )

    Button(label="Сохранить" @click="addFinalCard")




</template>

<script setup>
const elements = {
  "H": 1.008,
  "He": 4.003,
  "Li": 6.941,
  "Be": 9.012,
  "B": 10.81,
  "C": 12.01,
  "N": 14.01,
  "O": 16.00,
  "F": 19.00,
  "Ne": 20.18,
  "Na": 22.99,
  "Mg": 24.31,
  "Al": 26.98,
  "Si": 28.09,
  "P": 30.97,
  "S": 32.07,
  "Cl": 35.45,
  "Ar": 39.95,
  "K": 39.10,
  "Ca": 40.08,
  "Sc": 44.96,
  "Ti": 47.87,
  "V": 50.94,
  "Cr": 52.00,
  "Mn": 54.94,
  "Fe": 55.85,
  "Co": 58.93,
  "Ni": 58.69,
  "Cu": 63.55,
  "Zn": 65.38,
  "Ga": 69.72,
  "Ge": 72.63,
  "As": 74.92,
  "Se": 78.96,
  "Br": 79.90,
  "Kr": 83.80,
  "Rb": 85.47,
  "Sr": 87.62,
  "Y": 88.91,
  "Zr": 91.22,
  "Nb": 92.91,
  "Mo": 95.94,
  "Tc": 98.00,
  "Ru": 101.07,
  "Rh": 102.91,
  "Pd": 106.42,
  "Ag": 107.87,
  "Cd": 112.41,
  "In": 114.82,
  "Sn": 118.71,
  "Sb": 121.76,
  "Te": 127.60,
  "I": 126.90,
  "Xe": 131.29,
  "Cs": 132.91,
  "Ba": 137.33,
  "La": 138.91,
  "Ce": 140.12,
  "Pr": 140.91,
  "Nd": 144.24,
  "Pm": 145.00,
  "Sm": 150.36,
  "Eu": 151.96,
  "Gd": 157.25,
  "Tb": 158.93,
  "Dy": 162.50,
  "Ho": 164.93,
  "Er": 167.26,
  "Tm": 168.93,
  "Yb": 173.05,
  "Lu": 174.97,
  "Hf": 178.49,
  "Ta": 180.95,
  "W": 183.84,
  "Re": 186.21,
  "Os": 190.23,
  "Ir": 192.22,
  "Pt": 195.08,
  "Au": 196.97,
  "Hg": 200.59,
  "Tl": 204.38,
  "Pb": 207.2,
  "Bi": 208.98,
  "Po": 209.00,
  "At": 210.00,
  "Rn": 222.00,
  "Fr": 223.00,
  "Ra": 226.03,
  "Ac": 227.03,
  "Th": 232.04,
  "Pa": 231.04,
  "U": 238.03,
  "Np": 237.05,
  "Pu": 244.06,
  "Am": 243.06,
  "Cm": 247.07,
  "Bk": 247.07,
  "Cf": 251.08,
  "Es": 252.08,
  "Fm": 257.10,
  "Md": 258.10,
  "No": 259.10,
  "Lr": 262.11,
  "Rf": 267.12,
  "Db": 270.13,
  "Sg": 271.13,
  "Bh": 270.13,
  "Hs": 277.15,
  "Mt": 276.15,
  "Ds": 281.17,
  "Rg": 280.17,
  "Cn": 285.18,
  "Nh": 284.18,
  "Fl": 289.19,
  "Mc": 288.19,
  "Lv": 293.20,
  "Ts": 294.21,
  "Og": 294.21
}
import {useAuthStore} from "~/store/auth";

const runtimeConfig = useRuntimeConfig();
const APIURL = runtimeConfig.public.apiUrl
const authStore = useAuthStore()
const firstCardDialog = ref(false);
const addCardDialog = ref(false);
const finalCardDialog = ref(false);
const route = useRoute()
const router = useRouter()
const project_uuid = route.query.project

const card= ref({
      formula_raw:null,
      formula_calculated:null,
      formula_weight:0,
      equavalent:1,
      sample_weight:0,
      mmols:0,
      is_first_card:null,
      is_final_card:null
}
)

const sintez = ref(
    {
      project_uuid:project_uuid,
      name:null,
      start_date:null,
      hours:0,
      code:null,
      image:null,
      smiles_formula:null,
      steps:[],
      images:[],
      files:[],
      start_card:null,
      cards:[],
      final_card:null,
    }

)

const addFirstCard = () => {
  let temp_card = toRaw(card.value)
  console.log(temp_card)
  temp_card.is_first_card = true
  sintez.value.start_card = temp_card

  card.value={
    formula_raw:null,
    formula_calculated:null,
    formula_weight:0,
    equavalent:1,
    sample_weight:0,
    mmols:0,
    is_first_card:null,
    is_final_card:null
  }
  firstCardDialog.value = false
}

const addNextCard = () => {
  let temp_card = toRaw(card.value)
  console.log(temp_card)
  sintez.value.cards.push(temp_card)

  card.value={
    formula_raw:null,
    formula_calculated:null,
    formula_weight:0,
    equavalent:1,
    sample_weight:0,
    mmols:0,
    is_first_card:null,
    is_final_card:null
  }

  addCardDialog.value = false
}

const addFinalCard = () => {
  let temp_card = toRaw(card.value)
  console.log(temp_card)
  temp_card.is_final_card = true
  sintez.value.final_card = temp_card

  card.value={
    formula_raw:null,
    formula_calculated:null,
    formula_weight:0,
    equavalent:1,
    sample_weight:0,
    mmols:0,
    is_first_card:null,
    is_final_card:null
  }

  finalCardDialog.value = false
}

const handleFileMain = (e) => {
  sintez.value.image = e.target.files[0]

}
const handleFile = (e,index,target) => {
  if (target === 'step')
    sintez.value.steps[index].image = e.target.files[0]
  if (target === 'image')
    sintez.value.images[index].image = e.target.files[0]
  if (target === 'file')
    sintez.value.files[index].image = e.target.files[0]


}

const add = (target) => {
  if (target === 'step')
    sintez.value.steps.push({
      text:'',
      image:null,
    })
  if (target === 'image')
    sintez.value.images.push({
      text:'',
      image:null,
    })
  if (target === 'file')
    sintez.value.files.push({
      text:'',
      image:null,
    })
}



const save = async () => {

  let formData = new FormData();
  let temp_date = new Date(sintez.value.start_date).toLocaleDateString().split('.')
  console.log(temp_date)
  let new_date = `${temp_date[2]}-${temp_date[1]}-${temp_date[0]}`
  sintez.value.start_date = new_date



  formData.append('image', sintez.value.image );

  formData.append('data',JSON.stringify(sintez.value))

  for (let img of sintez.value.steps){
    formData.append('step_images', img.image );
  }

  for (let img of sintez.value.images){
    formData.append('images_images', img.image );
  }

  for (let img of sintez.value.files){
    formData.append('files_images', img.image );
  }
  $fetch( `${APIURL}/api/data/add_sintez`, {
    headers:authStore.headers,
    method: 'POST',
    body: formData
  }).then((response)=>{
    console.log(response)
    router.back()
  }).catch((error)=>{
    console.log(error)
  })

}





const calcFormula = () => {
  card.value.formula_calculated = ''
  card.value.formula_weight = 0
  card.value.formula_raw.split(' ').forEach((el)=>{
    const  element = el.match(/[a-zA-Z]+|[0-9]+/g)[0]
    if (Object.keys(elements).includes(element)){
      const number = parseFloat(el.match(/[a-zA-Z]+|[0-9]+/g)[1])
      card.value.formula_calculated += `${element}<sub>${number ? number : ' '}</sub>`
      //card.value.formula_weight += elements[element] * number
    }
  })
}
watch(()=>card.value.formula_raw, (val)=> {
  if(val)
    calcFormula()
});
</script>

<style lang="sass">
.p-card
  min-width: 300px
  margin-right: 10px
  &:last-child
    margin-right: 0

</style>