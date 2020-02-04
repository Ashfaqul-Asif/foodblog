<template>
  <div>
    <v-radio-group @change="setRadioInput" v-model="radioGroup">
      <v-radio  v-for="(arr,index) in array" :key="`fruit-${index}`" :label="` ${arr}`" :value="arr"></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      radioGroup: 'ra1',
      array:["ra1","ra2","ra3"]
    };
  },
  methods: {
    ...mapMutations("custom",["setRadioInput"])
  },
  computed: {
    
  },
};
</script>