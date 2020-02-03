<template>
  <v-container id="dropdown-example">

      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta amet harum debitis minus iste possimus nostrum qui culpa, est rem eum ad, dolore nesciunt esse voluptatum! Adipisci possimus ducimus quas?
    <v-row>
      <v-col cols="12" sm="4">
        <p>Overflow</p>

        <v-combobox
          @change="setColor"
          class="my-2"
          :items="dropdown_font"
          label="Colors"
          target="#dropdown-example"
        ></v-combobox>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
 import {mapMutations} from 'vuex'
  export default {
    data: () => ({
      dropdown_font: ['red','black', 'white'],
      dropdown_icon: [
        { text: 'list', callback: () => console.log('list') },
      ],
    }),
    methods: {
     ...mapMutations("custom",["setColor"]),
    }
  }
</script>