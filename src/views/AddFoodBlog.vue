<template>
  <v-container>
    <v-card>
      
      <h2 class="light-blue--text pt-2" style=" text-align: center ">Upload Blogs</h2>
      <v-form class="pa-5" ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="title" label="Title" required></v-text-field>

        <v-text-field v-model="subtitle" label="Sub-Title" required></v-text-field>
        <v-textarea v-model="textarea" label="Blog-text" hint="Hint text"></v-textarea>
        <v-combobox
           @change="onChangeComboBox"
          v-model="selectedType"
          class="pt-5"
          :items="getCategories"
          label="select blog type"
        ></v-combobox>
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="confirm">Confirm</v-btn>

        <input class="file" type="file" @change="previewFiles" multiple />

        <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { db, storage } from "../firebaseInit";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    valid: true,
    title: "",
    subtitle: "",
    image: [],
    select: null,
    textarea: "",
    isAdmin: false,
    isLoggedin: false,
    isApproved: false,
    selectedType:'',
  
  }),
  computed: {
    ...mapGetters("product", ["getuserId","getCategoriesData"]),
    getCategories(){
       return this.getCategoriesData.map(cat=>cat.categoryname)
    }
  },

  methods: {
    onChangeComboBox(){
       console.log(this.selectedType);
    },
    previewFiles(event) {
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
            //switch (snapshot.state) {
            // case storage.TaskState.PAUSED:
            //   console.log('upload is paused');
            //   break;
            // case storage.TaskState.RUNINNG:
            //   console.log('upload is running');
            //   break;
            //}
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
              this.image.push(downloadURL);
              console.log("File available at", this.image);
            });
          }
        );
      }
    },
    created() {
      console.log(this.image);
    },
    reset() {
      this.$refs.form.reset();
    },
    confirm() {
      let that = this;
      db.collection("addBlogs")
        .add({
          title: this.title,
          subtitle: this.subtitle,
          textarea: this.textarea,
          image: this.image,
          userid: this.getuserId,
          isApproved: this.isApproved,
          postedtime: Date.now(),
          type:this.selectedType
        })

        .then(function(docRef) {
          that.reset();

          console.log("Document written with ID: ", docRef.id);
          location.reload();
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  }
};
</script>

<style scoped>
.img {
  width: 20%;
}
</style>