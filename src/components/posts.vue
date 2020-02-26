<template>
  <div class="home">
    <v-container>
      <div>
        <v-btn @click="toolbar=!toolbar" depressed class="ma-2">
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-btn>
        <div class="pa-4"  v-if="toolbar">
          <div class=" d-flex justify-space-around">
          <v-btn @click="active='lastWeekPosts'">Last week Posts</v-btn>
          <v-btn @click="active='lastDayPosts'">Last 24 hours Posts</v-btn>
          <v-btn @click="active='last30DaysPosts'">last 30 Days Posts</v-btn>
          <v-btn @click="active='ascending'">Ascending</v-btn>
          <v-btn @click="active='descending'">Descending</v-btn>
          </div>
        </div>
      </div>
      <v-layout class="d-flex flex-wrap justify-space-between">
        <postsCard class="mx-3 my-3" v-for="post in filteredPosts" :key="post.id" :posts="post" />
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import postsCard from "@/components/postsCard.vue";
export default {
  components: {
    postsCard
  },
  data() {
    return {
      active: null,
      toolbar:false
    };
  },
  methods: {},
  created() {
    console.log("created");
    let currentTime = new Date().toLocaleDateString();
    console.log(currentTime);
    let todaysStartingTime = new Date(currentTime).getTime();
    console.log("todaysStartingTime", todaysStartingTime);
    let lastWeekStartingTime =
      moment()
        .subtract(7, "days")
        .format("X") * 1000;
    console.log("lastWeekStartingTime", lastWeekStartingTime);
  },
  computed: {
    ...mapGetters("jsonplaceholder", ["getPosts"]),

    filteredPosts() {
      let currentTime = new Date().toLocaleDateString();
      let todaysStartingTime = new Date(currentTime).getTime();
      let lastWeekStartingTime =
        moment()
          .subtract(7, "days")
          .format("X") * 1000;
      let lastDayStartingTime =
        moment()
          .subtract(1, "days")
          .format("X") * 1000;
      let lastMonthStartingTime =
        moment()
          .subtract(30, "days")
          .format("X") * 1000;
      if (this.active === "lastWeekPosts") {
        return this.getPosts.filter(
          blog => blog.postedtime > lastWeekStartingTime
        );
        console.log(event);
      } else if (this.active === "lastDayPosts") {
        return this.getPosts.filter(
          blog => blog.postedtime > lastDayStartingTime
        );
      } else if (this.active === "last30DaysPosts") {
        return this.getPosts.filter(
          blog => blog.postedtime > lastMonthStartingTime
        );
      } else if (this.active === "ascending") {
        return this.getPosts.sort((a, b) => {
          return a.postedtime - b.postedtime;
        });
      }
      else if(this.active ==="descending"){
           return this.getPosts.sort((a, b) => {
          return b.postedtime - a.postedtime;
        });
      }
      return this.getPosts;
    }
  }
};
</script>

<style>
</style>