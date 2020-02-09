<template>
  
  <div>


  <cutomButton/>
  <customform/>
  <radiobutton/>
  </div>

     
   </template>

<script>
import { mapGetters } from 'vuex'
import list from "@/views/list"
import customButton from "@/views/customButton";
import customform from "@/views/customform";

import radiobutton from "@/components/radiobutton"
import system from "@/components/system"

export default {
  components: {
    customButton,
    customform,
    radiobutton,
    list,
    system
 
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
  } 
};
</script>

<style lang="stylus" scoped>

</style>