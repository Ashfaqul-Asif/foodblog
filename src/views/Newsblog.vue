<template>
  <div>
    <v-container>
      <v-card class="overflow-hidden pb-10">
        <v-row class="mx-4">
          <v-img
            @click="deleteImage(index)"
            v-for="(src, index) in src"
            :key="index"
            class="mx-1 my-5"
            height="35vh"
            :src="src"
          ></v-img>
        </v-row>
        <div class="ml-6" v-if="!getisAdmin && getisLogin">
          <input type="file" @change="uploadFiles" multiple />
        </div>
        <div class="mx-3">
          <v-card-title v-if="!editTitlefield" @dblclick="editTitle">{{title}}</v-card-title>
          <v-text-field v-else @dblclick="editTitlefield=false" v-model="title" label="edit title"></v-text-field>
          <div class="my-2"></div>
          <v-card-subtitle
            v-if="!editSubtitlefield"
            @dblclick="editSubtitle"
            class="pt-1"
          >{{subtitle}}</v-card-subtitle>
          <v-text-field
            v-else
            @dblclick="editSubtitlefield=false"
            label="Edit subtitle"
            v-model="subtitle"
          ></v-text-field>
          <v-divider class="mx-4 my-4"></v-divider>
          <v-card-text>
            <div v-if="!editTextareafield" @dblclick="editTextarea">{{textarea}}</div>

            <div v-else @dblclick="editTextareafield=false">
              <v-textarea label="Edit textarea" v-model="textarea"></v-textarea>
            </div>
          </v-card-text>
        </div>
        <v-btn
          v-if="getisAdmin"
          class="fab"
          color="red "
          @click="deleteBlog"
          dark
          small
          absolute
          fab
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-divider class="mx-4 my-2"></v-divider>
        <v-card class="px-3 mx-4 my-1 elevation-1">
          <form class="d-flex">
            <v-text-field v-model="comment" label="write a comment" required></v-text-field>
            <v-btn class="commentButton" bottom fab small elevation="0" @click="postComment">
              <v-icon>mdi-message-plus-outline</v-icon>
            </v-btn>
          </form>
        </v-card>
        <v-card class="px-3 mx-4 my-1 elevation-1">
          <p class="px-3 pt-3">
            <v-icon>mdi-account</v-icon>name
          </p>
          <p
            class="px-3 pb-3"
          >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint in debitis laboriosam rem expedita voluptas incidunt. Nesciunt at veritatis inventore, vitae magnam cumque quibusdam culpa ducimus debitis, nam eaque nobis.</p>
        </v-card>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { db, storage } from "@/firebaseInit";
import { mapGetters, mapActions } from "vuex";
import { functions } from "firebase";
import navbar from "@/layout/navbar";
export default {
  components: {
    navbar
  },
  data() {
    return {
      title: "",
      subtitle: "",
      textarea: "",
      src: [],
      editTitlefield: false,
      editSubtitlefield: false,
      editTextareafield: false,
      editblog: false,
      blogref: {},
      image: [],
      isAdmin: false,
      comment: "",
      comments:[]
    };
  },
  watch: {
    editTitlefield(newValue) {
      if (!newValue) {
        console.log(this.title);
        console.log("new value -", newValue);
        this.blogref.update({
          title: this.title
        });
      }
    },
    editSubtitlefield(newValue) {
      if (!newValue) {
        console.log();
        this.blogref.update({
          subtitle: this.subtitle
        });
      }
    },
    editTextareafield(newValue) {
      if (!newValue) {
        this.blogref.update({
          textarea: this.textarea
        });
      }
    }
  },
  methods: {
    deleteBlog(event) {
      if (isAdmin) {
        db.collection("addBlogs")
          .doc(this.$route.params.id)
          .delete()
          .then(() => {
            console.log("Document successfully deleted!");
            location.reload();
            console.log(this.$router);
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      } else return 0;
    },

    uploadFiles(event) {
      console.log(storage);
      console.log(event.target.files);
      for (let i = 0; i < event.target.files.length; i++) {
        let imagefile = event.target.files[i];

        let storageRef = storage.ref("image" + imagefile.name);

        let task = storageRef.put(imagefile);
        console.log(this);
        task.on(
          "state_changed",
          snapshot => {
            console.log(this);
            console.log(snapshot);
            let percentage =
              (snapshot.bytesTransferred / snapshot.totalbytes) * 100;
            console.log("upload is" + percentage + "%done");
          },
          error => {
            console.log(this);
            console.log(error);
          },
          () => {
            console.log(this);
            console.log(this.image);
            task.snapshot.ref.getDownloadURL().then(downloadURL => {
              console.log(downloadURL);
              this.src.push(downloadURL);
              console.log("File available at", this.image);
              this.blogref.update({
                image: this.src
              });
            });
          }
        );
      }
    },

    deleteImage(index) {
      if (!this.getisAdmin) {
        this.src.splice(index, 1);
        console.log(this.src);
        db.collection("addBlogs")
          .doc(this.$route.params.id)
          .get()
          .then(doc => {
            console.log(doc);
            doc.ref.update({
              image: this.src
            });
          });
      } else return 0;
    },
    editTitle(event) {
      if (!this.getisAdmin && this.getisLogin) {
        this.editTitlefield = true;
      }
    },
    editSubtitle(event) {
      if (!this.getisAdmin && this.getisLogin) {
        this.editSubtitlefield = true;
      }
    },
    editTextarea(event) {
      if (!this.getisAdmin && this.getisLogin) {
        this.editTextareafield = true;
      }
    },
    postComment(event) {
      console.log(this.comment);
      let comments = this.commentsRef(this.$route.params.id);
      comments.add({
        comment: this.comment,
        commentedById: this.getuserId,
        commentedByName: this.getUserName,
        commentedTime: Date.now()
      });
      this.comment = "";
    },
    commentsRef(id) {
      return db
        .collection("addBlogs")
        .doc(id)
        .collection("comments");
    },
    async fetchComments() {
      let commentsData=[]
      let comments = this.commentsRef(this.$route.params.id);
      console.log(comments);
      try {
        let commentsSnapshot = await comments.get();
      console.log(commentsSnapshot);
      commentsSnapshot.forEach(doc => {
        this.comments.push(doc.data());
        
      });
      } catch (error) {
        console.log(error.message);
      }
      console.log(this.comments);
      
    }
  },
  computed: {
    ...mapGetters("product", [
      "getisAdmin",
      "getisLogin",
      "getuserId",
      "getUserName"
    ])
  },
  created() {
    this.fetchComments();
    console.log(this.$route.params.id);
    let that = this;
    db.collection("addBlogs")

      .doc(this.$route.params.id)
      .get()
      .then(function(doc) {
        console.log(doc.ref);
        that.blogref = doc.ref;
        let Data = doc.data();
        // doc.data() is never undefined for query doc snapshots
        that.subtitle = Data.subtitle;
        that.title = Data.title;
        that.textarea = Data.textarea;
        that.src = Data.image;
        console.log(Data);
        console.log(Data.image);
        console.log(that.src);
        console.log(that.blogref);
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    console.log(this.getisAdmin);
  }
};
</script>

<style  scoped>
.fab {
  bottom: 3px;
  right: 10px;
}
.input {
  display: hidden;
}
.upload {
  visibility: hidden;
}
.commentButton {
  top: 15px !important;
}
</style>