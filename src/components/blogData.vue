<template>
  <v-container>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :search="search"
      :items="blogs"
      class="elevation-3 px-4 py-6"
    >
      <template v-slot:top>
        <v-toolbar class flat color="white">
          <v-toolbar-title  class=" blue--text">BLOG DETAILS</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-combobox
            @change="onChangeComboBox"
            v-model="select"
            class="pt-5"
            :items="items"
            label="Combobox"
          ></v-combobox>

          <v-spacer></v-spacer>
          <!-- {{pendingBlogs}} -->

          <v-text-field
          
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>
       

      <template class="" v-slot:item.textarea="{item}">
        <p @click="openTextAreaDialog(item.id)">{{item.textarea.substring(0,16)}}...</p>
        <v-dialog v-model="dialogtextarea" max-width="340">
          <v-card>
            <v-card-text>{{item.textarea}}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialogtextarea = false">Back</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.isApproved="{item}">
        <v-icon v-if="item.isApproved">mdi-check</v-icon>
        <v-icon v-else>mdi-close</v-icon>
      </template>
      <template v-slot:item.image="{item}">
        <v-layout class="d-flex flex-wrap">
          <v-img
            @click="(dialog = true,selectedImage=item.image[index])"
            height="20px"
            width="30px"
            v-for="(image, index) in item.image"
            :key="index"
            class="mx-1"
            :src="item.image[index]"
          ></v-img>
          <v-dialog v-model="dialog" max-width="290">
            <v-card>
              <v-img :src="selectedImage"></v-img>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" text @click="dialog = false">Back</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
        <!-- <img  height="20px" width="30" :src="item.image" > -->
      </template>
      <template v-slot:item.action="{item}">
        <v-icon
          v-if="!item.isApproved"
          medidum
          class="mr-2"
          @click="approveBlog(item)"
        >mdi-check-circle</v-icon>
        <v-icon medium @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>


<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { db, storage } from "../firebaseInit";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    PulseLoader
  },
  data: () => ({
    blogs:[],
    loading: true,
    dialog: false,
    dialogtextarea: false,
    selectedImage: "",
    selectedcontent: "",
    selectedTextArea: "",
    search: "",
    color: "#fff",
    size: "10px",
    select: ["All Blogs"],
    items: ["All Blogs", "Approved Blogs", "Pending Blogs"],
    headers: [
      {
        text: "Blog-Id",
        align: "left",
        sortable: false,
        value: "blogid"
      },
      {
        text: "Blogger Name",
        value: "username"
      },
      {
        text: "Title",
        value: "title"
      },
      {
        text: "Subtitle",
        value: "subtitle"
      },
      {
        text: "Blog-Contennt",
        value: "textarea"
      },
      {
        text: "Blog Image",
        value: "image"
      },
      {
        text: "Blog-Status",
        value: "isApproved"
      },

      {
        text: "Actions",
        value: "action",
        sortable: false
      }
    ],

    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

  computed: {
    ...mapGetters("product", ["getBlogs", "getLoading"]),
    pendingBlogs(){
     return this.getBlogs.filter(blog=>blog.isApproved===false)
    },
    pendingBlog() {
      let totalBlogs = this.getBlogs.reduce((acc, cur) => {
        if (cur.isApproved) {
          console.log(acc);
          return (acc += 1);
        }
        return acc;
      }, 0);
      return totalBlogs;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    } /* ,
       pendingBlog(x){
         if (x.length >0) {
           this.loading=false
         }
      } */
  },

  created() {
    // let that =this
    this.blogs=this.getBlogs
    this.postBlogs().then(res => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions("product", ["postBlogs"]),
   async onChangeComboBox(item) {
      let Blogs =[]
     if (item==='Approved Blogs') {
       this.loading=true
        let blogSnapShot = await db.collection("addBlogs").where("isApproved","==",true).get()
        console.log(blogSnapShot);
        for (let index = 0; index < blogSnapShot.docs.length; index++) {
            const blog = blogSnapShot.docs[index];
            console.log(blog.id);
            let userSnapshot = await db.collection("registration").doc(blog.data().userid).get()
            console.log(userSnapshot.data());
            let document = blog.data()
            document.username = userSnapshot.data().name
            document.blogid = blog.id
            Blogs.push(document)
            console.log(Blogs);
        }
            this.blogs=Blogs
              this.loading=false
     }
     else if (item ==='Pending Blogs') {
      this.loading=true
        let blogSnapShot = await db.collection("addBlogs").where("isApproved","==",false).get()
        console.log(blogSnapShot);
        for (let index = 0; index < blogSnapShot.docs.length; index++) {
            const blog = blogSnapShot.docs[index];
            console.log(blog.id);
            let userSnapshot = await db.collection("registration").doc(blog.data().userid).get()
            console.log(userSnapshot.data());
            let document = blog.data()
            document.username = userSnapshot.data().name
            document.blogid = blog.id
            Blogs.push(document)
            console.log(Blogs);
        }
            this.blogs=Blogs
              this.loading=false
       
     } else if (item="All Blogs") {
       this.loading=true
       this.blogs=this.getBlogs
       this.loading=false
     } 
    },
    approveBlog(item) {
      console.log(event);
      confirm("Are you sure you want to approve this Blog") &&
        db
          .collection("addBlogs")
          .doc(item.blogid)
          .update({
            isApproved: true,
            approvedtime: Date.now()
          })
          .then(()=> {
            console.log("Succesfully updated Blogs");
            this.onChangeComboBox(item);
            return false;
          });
    },

    deleteItem(item) {
      /* const index = this.getBlogs.indexOf(item); */
      console.log(item.blogid);
      confirm("Are you sure you want to delete this Blog?") &&
        db
          .collection("addBlogs")
          .doc(item.blogid)
          .delete()
          .then(()=> {
            console.log("Document successfully deleted!");
            this.onChangeComboBox(item)
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
    },
    openTextAreaDialog(id) {
      this.dialogtextarea = true;
      this.selectedTextArea = id;
      console.log(id);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    }
  }
};
</script>