<template>
<div class="home">
<v-container>
  <v-layout class="d-flex flex-wrap mt-4 pt-10 " >
  <FoodCard class="mx-2 my-2" v-for="blog in getBlogs" :key="blog.id" :blog="blog" />
  </v-layout>
  </v-container>
</div>
</template>

<script>
// @ is an alias to /src
import FoodCard from "@/components/FoodCard.vue";
import db from '@/firebaseInit'
import { mapGetters,mapActions } from "vuex";

export default {
  name: "home",
  components: {
    FoodCard,
  },
  data() {
    return {};
  },
  methods: {
     ...mapActions("product",['postBlogs']) 
  },
  computed: { ...mapGetters("product", ["getBlogs"]) },
  created() {
    
    console.log(this.getBlogs);
  
    this.postBlogs()

  },
};
</script>

<style  scoped>
.home{
  background-color: #F4F5F7
}
</style>
