<template>
  
  <v-navigation-drawer v-model="isDrawer" :mini-variant.sync="mini" app>
    <p></p>
    <v-list-item>
      <v-list-item-avatar>
        <v-img ></v-img>
      </v-list-item-avatar>
          
      <v-list-item-title></v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

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
</template>

<script>


export default {
  props: {
    drawer: Boolean,
    user: Object
  },
  data() {
    return {
      isDrawer: false,
      items: [
        {
          title: "Check-In",
          icon: "check_circle",
     
        },
        {
          title: "Users",
          icon: "mdi-account-group-outline",
         
        },
        {
          title:"Attendande",
          icon:"spellcheck",
       
        },
      
      ],
      mini: true
    };
  },
  watch: {
    drawer(val) {
      this.isDrawer = val;
    },
    isDrawer(val) {
      this.$emit("drawer", val);
    }
  },
  computed: {
   
  },

  methods: {
   
    onclickItem(item) {
    
      this.$router.push({ path: item.route });
      console.log(item.route);
    }
  }
};
</script>
<style scoped>
.card {
  height: 100vh;
}
</style>
