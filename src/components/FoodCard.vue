<template>
  <v-card class="card" v-on:click="onclickblog()"  width="30%">
    
    <v-img @click="deleteImage" class="white--text align-end" height="40vh" :src="blog.image[0]">
      <v-card-title>
      </v-card-title>
    </v-img>
    <v-card-title>
        <!--  {{blog.subtitle}}  -->
    </v-card-title>
    <v-card-subtitle class=" font-weight-black pb-0">{{blog.subtitle}}</v-card-subtitle>
        
      
    <v-card-actions >
      
    </v-card-actions>
      <p class="float-right pr-10 font-weight-light grey--text " >post by-{{blog.username}}</p>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
import { db, storage } from "../firebaseInit";
export default {
  name: "FoodCard",
  props: ["blog"],
  data: () => ({
    username:''
  }),
 /* computed: {
        ...mapGetters("product", ["getusername"]),
    }, */
  methods: {
    onclickblog() {
      console.log(`/newsblog/${this.blog}`);
      this.$router.push({
        path: `/newsblog/${this.blog.blogid}`
      });
    },
    deleteImage() {
      console.log(event);
    },
   
  },
  created() {
    console.log(this.blog);
    console.log("sdsad");
    db.collection("registration").where("this.blog.userid", "==", true)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
   
  }
};
</script>



<style scoped>
.card{
  cursor: pointer;
}
</style>