<template>
  <div>
    <v-radio-group @change="$emit('change',$event)" v-model="radioGroup">
      <v-radio  v-for="(arr,index) in array" :key="`fruit-${index}`" :label="` ${arr}`" :value="arr"></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radioGroup: 'ra1',
      array:["ra1","ra2","ra3"]
    };
  }
};
</script>