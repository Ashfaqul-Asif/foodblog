<template>
  <div>
    <v-container> 
      <form>
        <input v-model="text" @keyup="$emit('onchange',text)"  :type="type" :placeholder="placeholder" />
      </form>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text:this.default
    };
  },
  props: {
    type: String,
    placeholder:String,
    default:String
  },
  watch: {
    default(){
        this.text=this.default
    }
  },
};
</script>

<style>

</style>