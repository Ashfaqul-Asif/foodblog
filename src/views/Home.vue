<template>
  <div class="home d-flex flex-wrap">
    <FoodCard v-for="blog in getBlogs" :key="blog.id" :blog="blog" />
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
    FoodCard
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

</style>
