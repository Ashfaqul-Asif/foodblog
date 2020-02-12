<template>
  <v-container>
    <v-data-table :headers="headers" :items="getBlogs" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="success">
          <v-toolbar-title class="white--text">BLOG DETAILS</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{item}">
        <v-icon medium @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>


<script>
import { db,storage } from "../firebaseInit"
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Blog-Id",
        align: "left",
        sortable: false,
        value: "id"
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
        text: "Actions",
        value: "action",
        sortable: false
      }
    ],
    /*  getBlogs: [], */
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
    ...mapGetters("product", ["getBlogs"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.postBlogs();
  },
  methods: {
    ...mapActions("product", ["postBlogs"]),

    deleteItem(item) {
      /* const index = this.getBlogs.indexOf(item); */
      console.log(item.id);
      confirm("Are you sure you want to delete this item?") &&
        
      db.collection("addBlogs")
        .doc(item.id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
         
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
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

 
     