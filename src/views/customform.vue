<template>
  <div>
    <v-container>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, tempore. Neque repudiandae adipisci tenetur eligendi at illum explicabo dolore recusandae earum, incidunt debitis, natus facere nobis ex omnis dignissimos rerum?</p>
      
      <form>
          <p>name</p>
        <input v-model="text" @keyup="$emit('onchange',text)"  :type="type" :placeholder="placeholder" />
      </form>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text:''
    };
  },
  props: {
    type: String,
    placeholder:String
    
  }
};
</script>

<style>
.container {
  padding: 10px 10px 10px 10px;
}
</style>