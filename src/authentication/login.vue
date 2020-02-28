<template>
  <v-container class="overflow-hidden">
    <div class="justify-center d-flex my-9">
      <v-card outlined width="80vh" height="100%" class="px-6 py-4 overflow-hidden">
        <v-card-title class="title text justify-center mx-auto my-auto">Login</v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
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

          <v-btn :disabled="!valid" color="#42A5F5" class="mr-4 white--text" @click="login">Login</v-btn>
          <v-btn @click="socialGoogleLogin">Google</v-btn>
          <v-btn @click="socialFBLogin">Facebook</v-btn>
          <v-btn @click="socialGithubLogin">Github</v-btn>
          <v-btn
            @click="$router.push( '/signup' )"
            color="success"
            class="float-right white--text"
          >Create Account</v-btn>
        </v-form>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
import firebase from 'firebase'
import { db, storage,auth } from "../firebaseInit";
export default {
  data: () => ({
    valid: true,
    value: true,
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
    checkbox: false,
    isAdmin: false,
    islogin: false
  }),
  methods: {
    login() {
      auth.signInWithEmailAndPassword(this.email, this.password).then(
        response => {
          console.log(response.user.uid);
          alert(`account login succeessfully`);
          this.$router.push('/')
          db.collection("registration")
            .get()
            .then(snapshot => {
              console.log(snapshot);
              snapshot.forEach(doc => {
                this.userid = doc.id;
                this.isAdmin = doc.data().isAdmin;
                this.islogin = true;
                this.setState({ isAdmin: this.isAdmin });
                this.setState({ isLogin: true });
                this.setState({ userid: doc.id });
                this.setState({ username: doc.data().name });

                console.log(this.isAdmin);
                console.log(this.isLogin);
                console.log(this.userid);
               
              });
            });
        },
        err => {
          alert(err.message);
        }
      );
    },
    socialGoogleLogin(event){
      console.log(event);
      const provider=new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result)=>{
        this.$router.push('/');
        console.log(result);
        console.log(provider);
      }).catch((err)=>{
        alert('Oops.'+err.message)
      })
    },
    socialGithubLogin(){
      const provider= new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result)=>{
        this.$router.push('/')
         console.log(result);
        console.log(provider);
      }).catch((err)=>{
        alert('Oops.'+err.message)
      })
    },
    socialFBLogin(){
      const provider= new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result)=>{
        this.$router.push('/')
         console.log(result);
        console.log(provider);
      }).catch((err)=>{
        alert('Oops.'+err.message)
      })
    },
    ...mapMutations("product", ["setState"])
  }
};
</script>
<style  scoped>
.title {
  background-color: #42a5f5;

  color: white;
}
</style> >
  
