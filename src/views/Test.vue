<template>
  
  <div>
    <h1>Grid System</h1>
    <v-container class="my-5">
        <v-flex xs12 sm6>

        </v-flex>
    </v-container>

    <template>
  <v-card id="create">
    <v-container fluid>
      <v-row class="child-flex">
        <v-col cols="12" sm="6" md="4">
          <v-subheader>Options</v-subheader>
          <v-checkbox v-model="hover" label="Open on hover" hide-details></v-checkbox>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-subheader>FAB location</v-subheader>
          <v-checkbox v-model="top" label="Top" hide-details></v-checkbox>
          <v-checkbox v-model="right" label="Right" hide-details></v-checkbox>
          <v-checkbox v-model="bottom" label="Bottom" hide-details></v-checkbox>
          <v-checkbox v-model="left" label="Left" hide-details></v-checkbox>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-subheader>Speed dial direction</v-subheader>
          <v-radio-group v-model="direction" hide-details>
            <v-radio value="top" label="Top"></v-radio>
            <v-radio value="right" label="Right"></v-radio>
            <v-radio value="bottom" label="Bottom"></v-radio>
            <v-radio value="left" label="Left"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-subheader>Transition</v-subheader>
          <v-radio-group v-model="transition" hide-details>
            <v-radio value="slide-y-transition" label="Slide y"></v-radio>
            <v-radio value="slide-y-reverse-transition" label="Slide y reverse"></v-radio>
            <v-radio value="slide-x-transition" label="Slide x"></v-radio>
            <v-radio value="slide-x-reverse-transition" label="Slide x reverse"></v-radio>
            <v-radio value="scale-transition" label="Scale"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-container>
    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
        >
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-card>
</template>

   
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import list from "@/views/list"
import customButton from "@/views/customButton";
import customform from "@/views/customform";

import radiobutton from "@/components/radiobutton"
export default {
 /*  components: {
    customButton,
    customform,
    radiobutton,
    list
  },
  data() {
    return {
      persons: [
        { name: "asif", age: "20" },
        { name: "anik", age: 40 }
      ],
      title: "",
      link: "https://www.google.com",
      count: 0,
      x: 0,
      y: 0,
      a: 1,
      firstname: "",
      lastname: "",
      show: true,
      customvalue1: "",
      customvalue2: "",
      comboInput:"",
      radioInput:""
    };
   
  },
  computed: {
    b: function() {
      return this.a + 10;
    },
      ...mapGetters('custom',['getColors'])
  },
  methods: {
    changeTitle: function(event) {
      this.title = event.target.value;
      console.log(event);
    },
    sayhello: function() {
      return "hello";
    },
    increase: function(step) {
      if (this.count >= 19) {
        this.count += step;
      } else {
        this.count++;
      }
    },
    updateCoordinates: function(event) {
      this.x = event.clientX;
      this.y = event.clientY;
    },
    onclick: function() {
      console.log(ksaldsalkdksa);
    },
    onClickCustomButton(event) {
      console.log(event);
    },

    onClickForm(event) {
      this.customvalue1 = event;
      this.customvalue2=event;

      console.log(this.customvalue1);
      console.log(this.customvalue2);
    },
    onComboClick(value){
        
        this.comboInput=value
      
    },
    onRadioButton(event){
      
      this.radioInput=event
      console.log(this.radioInput);

    },
  },
  created() {
    
  },
  watch: {
    firstname(params) {
      console.log(this);
    }
  } */
};
</script>

<style lang="stylus" scoped>

</style>