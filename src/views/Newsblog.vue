<template>
  <v-container>
    <v-card  class="overflow-hidden pb-10">
      <v-row class="mx-4">
        <v-img @click="deleteImage(index)"  v-for="(src, index) in src" :key="index" class="mx-1 my-5" height="35vh" :src="src"></v-img>
      </v-row>
      <div class="mx-3" >
        <v-card-title v-if="!editTitlefield" @dblclick="editTitlefield=true" >{{title}}</v-card-title>
        <v-text-field v-else @dblclick="editTitlefield=false" v-model="title" label="edit title"></v-text-field>
        <div class="my-2">
      </div>
        <v-card-subtitle v-if="!editSubtitlefield" @dblclick="editSubtitlefield=true"  class="pt-1">{{subtitle}}</v-card-subtitle>
        <v-text-field v-else @dblclick="editSubtitlefield=false" label="Edit subtitle" v-model="subtitle" ></v-text-field>
        <v-divider class="mx-4 my-4"></v-divider>
        <v-card-text >
          <div v-if="!editTextareafield" @dblclick="editTextareafield=true">{{textarea}}</div>

          <div v-else @dblclick="editTextareafield=false">
          <v-textarea  label="Edit textarea" v-model="textarea" ></v-textarea>
          </div>
        </v-card-text>
      </div>
      <v-btn class="fab" color="red " @click="deleteBlog" dark small absolute fab>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
import { db } from "@/firebaseInit";
import { mapGetters, mapActions } from "vuex";
import { functions } from 'firebase';
export default {
  data() {
    return {
      title: "",
      subtitle: "",
      textarea: "",
      src: "",
      editTitlefield:false,
      editSubtitlefield:false,
      editTextareafield:false,
      editblog:false
    };
  },
  watch: {
    editTitlefield(newValue){
     console.log(this.title);
      console.log("new value -", newValue);
    }
  },
  methods: {
    deleteBlog(event) {
      db.collection("addBlogs")
        .doc(this.$route.params.id)
        .delete()
        .then(()=> {
          console.log("Document successfully deleted!");
          this.$router.go(-1)
          console.log(this.$router);
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    },
    editTitle(){

    },
    deleteImage(index){ 
      this.src.splice(index,1)
      console.log(this.src);
      db.collection("addBlogs").doc(this.$route.params.id).get().then(doc=>{
        console.log(doc);
        doc.ref.update({
          image:this.src
        })

      })
    }
  },
  computed: {},
  created() {
    console.log(this.$route.params.id);
    let that = this;
    db.collection("addBlogs")
      .doc(this.$route.params.id)
      .get()
      .then(function(doc) {
        let Data = doc.data();
        // doc.data() is never undefined for query doc snapshots
        that.subtitle = Data.subtitle;
        that.title = Data.title;
        that.textarea = Data.textarea;
        that.src = Data.image;
        console.log(Data);
        console.log(Data.image);
        console.log(that.src);
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }
};
</script>

<style  scoped>
.fab {
  bottom: 3px;
  right: 10px;
}
</style>