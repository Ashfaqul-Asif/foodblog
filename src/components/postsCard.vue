<template>
  <v-card  class="card " v-on:click="onclickblog()" width="30%">
    <v-img
      class="white--text align-end"
      height="30vh"
      src="https://media.gettyimages.com/photos/pumpkin-salad-picture-id635912088?s=612x612"
    ></v-img>
    <v-card-title>{{posts.title}}</v-card-title>
    <v-card-subtitle class="font-weight-black pb-0">{{posts.body}}</v-card-subtitle>
    <p class="float-right absolute bottom pr-10 font-weight-light grey--text"></p>
  </v-card>
</template>
<script>
export default {
  name: "postsCard",
  props: ["posts"],
  data() {
    return {
      
    }
  },
};
</script>

<style scoped>
.card {
  cursor: pointer;
}
</style>