<template>
  <div class="home">
    <v-container>
      <v-layout class="d-flex flex-wrap justify-space-between ">
        <FoodCard class="mx-3 my-3  " v-for="blog in approvedBlogs" :key="blog.id" :blog="blog" />
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import FoodCard from "@/components/FoodCard.vue";
import db from "@/firebaseInit";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "home",
  components: {
    FoodCard
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("product", ["postBlogs","fetchRegistrationData"])
  },
  computed: {
    ...mapGetters("product", ["getBlogs","getRegistrationData"]),
     approvedBlogs() {
      console.log(this.getBlogs);
      let x = this.getBlogs.filter(blog => blog.isApproved);
      console.log(x);
      return x;
    } 
  },
  created() {
    //console.log(this.getBlogs);
    this.postBlogs();
    this.fetchRegistrationData()
  }
};
</script>

<style  scoped>
.home {
  background-color: #f4f5f7;
}
</style>
