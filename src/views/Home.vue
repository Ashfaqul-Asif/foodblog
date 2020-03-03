<template>
  <div class="home">
    <v-container>
      <h3>Categories</h3>
      <div class="d-flex justify-md-space-between my-3">
        <div v-for="category in getCategoriesData" :key="category.id">
          <v-card @click="onclick(category.categoryname)" elevation="4" height="80" width="110">
            <v-img height="100%" width="100%" :src="category.imagesrc"></v-img>
          </v-card>
          <p class="mx-2 my-1">{{category.categoryname}}</p>
        </div>
      </div>

      <v-layout class="d-flex flex-wrap justify-space-between my-10">
        <FoodCard  class="mx-3 my-3" v-for="blog in approvedBlogs" :key="blog.id" :blog="blog" />
        <!--        <FoodCard class="mx-3 my-3  " v-for="blog in getPosts" :key="blog.id" :blog="blog" /> -->
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
    return { 
      selectedcat:'',
      Categories: [
        {
          imagesrc:
            "https://thumbs.dreamstime.com/b/traditional-bengali-food-served-ceremonious-occasion-147487909.jpg",
          name: "Bengali"
        },
        {
          imagesrc:
            "https://duyt4h9nfnj50.cloudfront.net/cuisine-dish-supertype/Dosa.png",
          name: "Indian"
        },

        {
          imagesrc:
            "https://duyt4h9nfnj50.cloudfront.net/sku/7b2a32908c050e6b07252ffcbe651e8c",
          name: "Mexican"
        },
        {
          imagesrc:
            "https://duyt4h9nfnj50.cloudfront.net/sku/a84dc69cee307fba4f559b1e825d8e9e",
          name: "Chineese"
        },
        {
          imagesrc:
            "https://duyt4h9nfnj50.cloudfront.net/sku/a5aa9bbba0172134449b4ad48611d92b",
          name: "FastFood"
        },
        {
          imagesrc:
            "https://duyt4h9nfnj50.cloudfront.net/cuisine-dish-supertype/Biryani.png",
          name: "Biriani"
        }
      ]
    };
  },
  methods: {
    ...mapActions("product", ["postBlogs", "fetchRegistrationData","fetchCategoriesData"]),
    ...mapActions("jsonplaceholder", ["fetchPost"]),
    onclick(event){
     console.log(event);
     this.selectedcat=event
     console.log(this.selectedcat);
     this.$router.push('/news')
    }
  },
  computed: {
    ...mapGetters("product", ["getBlogs", "getRegistrationData","getCategoriesData"]),
    ...mapGetters("jsonplaceholder", ["getPosts"]),
    approvedBlogs() {
      console.log(this.getBlogs);
      let x = this.getBlogs.filter(blog => blog.isApproved);
      console.log(x);
      return x;
    }
  },
  created() {
    //console.log(this.getBlogs);
    //console.log(this.getPosts);
    this.postBlogs();
    this.fetchRegistrationData();
    this.fetchPost();
    this.fetchCategoriesData()
    console.log(this.getCategoriesData);
  }
};
</script>

<style  scoped>
.home {
  background-color: #f4f5f7;
}
</style>
