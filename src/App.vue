<template>
  <v-app>
    <v-app-bar app color="white">
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-btn v-if="!getisLogin" @click="login()" class="btn blue--text">Login</v-btn>
      <v-btn v-else @click="logout()">Logout</v-btn>
      {{getisAdmin === undefined ?"true":"false"}}sdsad
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-on:click="onclickItem(item)">
              {{
              item.title
              }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import FoodCard from "./components/FoodCard";
import { mapGetters } from "vuex";

export default {
  name: "App",

  components: {
    FoodCard
  },
  data: () => ({
    drawer: null,

    items: [
      {
        title: "Admin Panel",
        route: "/addfoodblog"
      },
      {
        title: "Login",
        route: "/login"
      }
    ]
  }),
  methods: {
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
    },
    logout() {}
  },
  computed: {
    ...mapGetters("product", ["getisAdmin" , "getisLogin"])
  },
  created() {
    console.log(this.$store.getters["product/getisAdmin"]);
    console.log("app created => ", this.getisAdmin, this.getisLogin);
  }
};
</script>
<style >
.btn {
  overflow: hidden;
  left: 90%;
}
</style>