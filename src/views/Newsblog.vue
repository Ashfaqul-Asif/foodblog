<template>
  <v-container>
     <v-card
    class=""
  >
    <v-img
      class="white--text align-end"
      height="30vh"
      :src='src'
    >
      <v-card-title>
        {{title}}</v-card-title>
    </v-img>
   
    <v-card-subtitle class="pb-0">{{subtitle}}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{textarea}}</div>
    </v-card-text>
  </v-card>
  </v-container>
</template>

<script>
import {db} from '@/firebaseInit'
import { mapGetters,mapActions } from "vuex";
export default {

   data(){
    return{
      title:"",
      subtitle:"",
      textarea:"",
      src:""
    }
   },
   methods:{
       
   },
   computed:{

   },
   created(){
     console.log(this.$route.params.id);
     let that=this
     db.collection("addBlogs").doc(this.$route.params.id)
     .get()
      .then(function(doc) {
            let Data=doc.data()
            // doc.data() is never undefined for query doc snapshots 
            that.subtitle=Data.subtitle
            that.title=Data.title
            that.textarea=Data.textarea
            that.src=Data.image
            console.log(Data);
    })     
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
   }
}
</script>

<style>

</style>