<template  >
  <v-container class="d-flex flex-wrap justify-space-between">
    <FoodCard class="mx-3 my-3" v-for="blog in filterBlogs" :key="blog.id" :blog="blog" />
    {{filterBlogs.length}}
  </v-container>
</template>

<script>
import FoodCard from "@/components/FoodCard.vue";
import db from "@/firebaseInit";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    FoodCard
  },
 
  data() {
    return {};
  },
  computed: {
    ...mapGetters("product", [
      "getBlogs",
      "getRegistrationData",
      "getCategoriesData",
      "getSelectedCat"
    ]),
    filterBlogs() {
      return this.getBlogs.filter(blog => blog.type == this.getSelectedCat);
    }
  },
  methods: {},
  created() {
  
  }
};
</script>

<style>
</style>