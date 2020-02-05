<template>
  <v-container >
    <v-card class="overflow-hidden" >
      <v-row class="mx-4"  >
        <v-img v-for="(src, index) in src" :key="index" class=" mx-1  my-5" height="35vh"  :src='src'>
        </v-img>
      </v-row>

      <div py-auto>
        <v-card-title>{{title}}</v-card-title>
        <v-card-subtitle class="pt-">{{subtitle}}</v-card-subtitle>
         <v-divider class="mx-4 my-4"></v-divider>
        <v-card-text class="text--primary">
          <div>{{textarea}}</div>
        </v-card-text>
      </div>
    </v-card>
  </v-container>
</template>

<script>
  import {
    db
  } from '@/firebaseInit'
  import {
    mapGetters,
    mapActions
  } from "vuex";
  export default {

    data() {
      return {
        title: "",
        subtitle: "",
        textarea: "",
        src: ""
      }
    },
    methods: {

    },
    computed: {

    },
    created() {
      console.log(this.$route.params.id);
      let that = this
      db.collection("addBlogs").doc(this.$route.params.id)
        .get()
        .then(function (doc) {

          let Data = doc.data()
          // doc.data() is never undefined for query doc snapshots 
          that.subtitle = Data.subtitle
          that.title = Data.title
          that.textarea = Data.textarea
          that.src = Data.image
          console.log(Data);
          console.log(Data.image);
          console.log(that.src);
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }
  }
</script>

<style>

</style>