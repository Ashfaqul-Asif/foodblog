<template>
<div>
   <v-app-bar app color="white">
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-btn v-if="!getisLogin" @click="login()" class="btn blue--text">Login</v-btn>
      <v-btn v-else @click="logout()" class="btn blue--red" >Logout</v-btn>
      <!-- {{getisAdmin === undefined ?"true":"false"}}sdsad -->
     
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in filterItems" :key="item.title" link>
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
    <router-view></router-view>
</div>
    
</template>

<script>
import { mapGetters,mapMutations } from "vuex";
export default {
    data: () => ({
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
    ...mapGetters("product", ["getisAdmin", "getisLogin"]),
    filterItems(){
      if (this.getisAdmin) {
        return this.items.filter(item=>item.title !== 'Admin Panel')
      }else {
        return this.items
      }
    }
  },
  created() {
    console.log(this.$store.getters["product/getisAdmin"]);
    console.log("app created => ", this.getisAdmin, this.getisLogin);
  }
}
</script>

<style>
.btn {
  overflow: hidden;
  left: 90%;
}


</style>