<template>
  <div>
    <v-container v-on:mousemove="updateCoordinates">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate autem iste facilis in pariatur?
        Consequatur facere illum quasi nobis laborum consequuntur alias molestiae dolores, quae ea saepe maxime
        enim animi?
      </p>
      <input type="text" placeholder="input" @input="changeTitle" />

      {{title}}
      <p>{{sayhello()}}</p>
      <p>
        <a v-bind:href="link"></a>
      </p>

      <div>
        <v-btn v-on:click="increase(10)" small>click</v-btn>
        <p>{{count}}</p>
      </div>

      <p v-on:mousemove="updateCoordinates">Coordinates:{{x}} /{{y}}</p>
      <div>a={{a}},b={{b}}</div>
      <div>
        <div class="demo">
          <p v-if="show">You can see me</p>
          <p>do you also se me</p>
          <button @click="show=!show">switch</button>
        </div>
        <input type="text" v-model="firstname" placeholder="type......." />
      </div>
      <!--  <div >
              <li v-for="person in persons" :key="person.name" >{{person.name}}</li>
      </div>-->
      <div>
        <ul>
          <li v-for="(person,index) in persons" :key="index">{{person.name}}</li>
        </ul>
      </div>
    </v-container>
    <v-container>
      <customButton
        @onclick="onClickCustomButton"
        :size="'small'"
        :color="comboInput"
        :text=" 'click' "
        :round="radioInput"
      />
      <customform @onchange="onClickForm" :type="'text'" :placeholder="''" :default=" customvalue1 " />
      <customform  @onchange="onClickForm" :placeholder="''" :default=" customvalue2 "  />
      <combo @click="onComboClick"/>
      <radiobutton @change="onRadioButton"/>
    </v-container>
  </div>
</template>

<script>
import {mapGetters} from vuex
import customButton from "@/views/customButton";
import customform from "@/views/customform";
import combo from "@/views/combo"
import radiobutton from "@/views/radiobutton"
export default {
  components: {
    customButton,
    customform,
    combo,
    radiobutton
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
    }
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

    }
  
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