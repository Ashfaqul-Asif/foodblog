<template>
  <v-container>
    <div class="justify-center d-flex my-9">
      <v-card outlined  width="80vh" height="100%" class="px-6 py-4">
        <v-card-title  class=" title text justify-center mx-auto my-auto">Registration</v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          <v-text-field
            autocomplete="current-password"
            :value="password"
            label="Enter password"
            hint="Your password passed! Password rules are not meant to be broken!"
            :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (value = !value)"
            :type="value ? 'password' : 'text'"
            :rules="passwordRules"
            @input="_=>password=_"
          ></v-text-field>
          <v-divider class="mx-4 my-4"></v-divider>
          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
          ></v-checkbox>

          <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Signup</v-btn>
        </v-form>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { db, storage } from "../firebaseInit";
export default {
  data: () => ({
    valid: true,
    value: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    select: null,
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
          v
        ) ||
        "Min. 8 characters with at least one capital letter, a number and a special character."
    ],
    checkbox: false
  }),

  methods: {
    validate() {
      let that = this;
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        db.collection("registration")
          .add({
            email: this.email,
            name: this.name,
            password: this.password,
            isAdmin: false
          })
     
          .then(function(docRef) {
            that.$refs.form.reset();
         
            console.log("Document written with ID: ", docRef.id);
             that.$router.push('/login');
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
      }
    }
  }
};
</script>
<style  scoped>
.title{
    background-color: #4CAF50;

    color:white
}
</style> >
  
