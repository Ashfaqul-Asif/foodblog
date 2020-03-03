<template>
  <v-app class="app">
    <router-view></router-view>
  </v-app>
</template>

<script>
import FoodCard from "./components/FoodCard";

import { mapGetters, mapMutations } from "vuex";

export default {
  name: "App",

  components: {
    FoodCard
  },
  data() {
    return {};
  },
  computed: {}
  /*   data: () => ({
    drawer: null,

    items: [
      {
        title: "Admin Panel",
        route: "/addfoodblog",
        icon: "mdi-account-tie"
      },
      {
        title: "Login",
        route: "/login",
        icon: "mdi-login"
      }
    ]
  }), */
  /*   methods: {
    onclickItem(item) {
      console.log(this.$router.history.current.path);
      if (this.$router.history.current.path !== item.route) {
        this.$router.push(item.route);
      }
    },
    login() {
      console.log(event);
      if (this.$router.history.current.path !== "/login") {
        this.$router.push("/login");
      }
        console.log(this.$store.state);
        console.log(this.$store);
    },
    logout() {
      console.log(event);
      this.resetState()
      this.$router.push('/')
    
    },
    ...mapMutations("product",["resetState"])
  },
  computed: {
    ...mapGetters("product", ["getisAdmin", "getisLogin"])
  },
  created() {
    console.log(this.$store.getters["product/getisAdmin"]);
    console.log("app created => ", this.getisAdmin, this.getisLogin);
  } */
};
</script>
<style>
.v-application--wrap{
  background-color: whitesmoke
 
}
</style>

