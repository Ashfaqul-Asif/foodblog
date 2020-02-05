<template>
  <v-app>
    <v-app-bar app color="teal lighten-3" >  
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
     <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
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
  import FoodCard from './components/FoodCard';

  export default {
    name: 'App',

    components: {
      FoodCard,
    },

    data: () => ({
       drawer: null,
       
         items: [
        {
          title: "customButton",
          route:"/custombutton"
     
        },
        {
          title: "Admin Panel",
          route:"/addfoodblog"
        }
        
        
      
      ],
    }),
    methods: {
     onclickItem(item){
       console.log(this.$router.history.current.path);
        if (this.$router.history.current.path !== item.route) {
          this.$router.push( item.route );
        }
     
     }
    },
  };
</script>