<template lang="pug">


.container
  .grid.pt-5.mb-5
    .col-5
      dropdown.w-full.h-full(optionlabel='name' placeholder='Прокты')
    .col-2
      Button.w-full(label="НА ГЛАВНУЮ" type="button" severity="warning" outlined)
    .col-2
      Button.w-full.bg-green-500(label="КОМАНДА")
    .col-3
      dropdown.w-full.h-full(optionlabel='name' placeholder='Иван Иванов')
  Button.mb-5.mr-3(label="Назад" @click="$router.back()")
  Button.mb-5.mr-3(label="Редактировать" )

  Button.mb-5(label="Изменить статус" )
  p.font-bold.mb-5.text-2xl {{sintez.name}}
    span.text-sm.ml-3.text-400 {{sintez.code}}
  img.mb-5(:src="sintez.image")
  p.mb-2.font-bold Формула формата SMILES
  p.bg-black-alpha-10.p-2.mb-5 {{sintez.smiles_formula}}
  p.mb-2.font-bold Реактивы
  .flex.overflow-y-auto.mb-5
    Card(v-for="(card,index) in sintez.cards" :key="index" )
      template(#subtitle)
        p(v-if="card.is_first_card" ) Главный реактив
        p(v-else-if="card.is_final_card" ) Продукт
        p(v-else) Реактив {{index}}
      template(#content)
        p.mb-2.text-sm.text-400 Формула
        p.mb-3(v-html="card.formula_calculated" )
        p.mb-2.text-sm.text-400 Молекулярная масса
        p.mb-3(v-html="card.formula_weight" )
        p.mb-2.text-sm.text-400 Эквивалент
        p.mb-3(v-html="card.equavalent" )
        p.mb-2.text-sm.text-400 Масса образца
        p.mb-3 {{card.sample_weight}} mg
        p.mb-2.text-sm.text-400 Количество молей
        p {{card.mmols}} mmol
  p.mb-2.font-bold Шаги
  .bg-black-alpha-10.p-2.mb-2(v-for="step in sintez.steps" :key="step.id"  )
    p(v-html="step.text")
    a(v-if="step.image" :href="step.image" target="_blank")
      img.step-img(:src="step.image")
  .mb-5
  p.mb-2.font-bold Изображения
  .grid.mb-5
    .col-3(v-for="img in sintez.images" :key="img.id" )
      a(:href="img.image" target="_blank")
        img.img.mb-2(:src="img.image")
      p.text-sm.text-400 {{img.text}}
  p.mb-2.font-bold Файлы
  .grid.mb-5
    .col-3(v-for="file in sintez.files" :key="file.id" )
      a(:href="file.file" target="_blank")
        Button(:label="file.text" severity="secondary" outlined)

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
const runtimeConfig = useRuntimeConfig();
const APIURL = runtimeConfig.public.apiUrl

const route = useRoute()
const uuid = route.query.id

const { data:sintez} = await useAsyncData(
    'sintez',
    () => $fetch(`${APIURL}/api/data/sintez?id=${uuid}`)
)
console.log(sintez)


const calcCard = () => {
  let first_card_mmols = 0
  for (let card of sintez.value.cards){
    card.formula_calculated = ''
    card.formula_weight = parseFloat(0)
    card.formula_raw.split(' ').forEach((el)=>{
      const  element = el.match(/[a-zA-Z]+|[0-9]+/g)[0]
      if (Object.keys(elements).includes(element)){
        const number = parseFloat(el.match(/[a-zA-Z]+|[0-9]+/g)[1])
        card.formula_calculated += `${element}<sub>${number ? number : ' '}</sub>`
        card.formula_weight += elements[element] * number
      }
    })
    //calc fist_card
    if (card.is_first_card){
      card.mmols = parseFloat(card.sample_weight) / card.formula_weight
      first_card_mmols = card.mmols
    }
    //calc fist_card
    if (!card.is_first_card && !card.is_final_card){
      card.mmols = parseFloat(card.equavalent) * first_card_mmols
      card.sample_weight = card.mmols * card.formula_weight
    }
    if (card.is_final_card){
      card.sample_weight = first_card_mmols * card.formula_weight
    }

  }

}

calcCard()
</script>
<style lang="sass">
.step-img
  width: 100px
  height: 100px
  object-fit: contain

.p-card
  min-width: 300px
  margin-right: 10px
  &:last-child
    margin-right: 0

</style>