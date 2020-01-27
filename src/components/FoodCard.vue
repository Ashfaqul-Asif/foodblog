<template>
    <v-card
    class="mx-auto my-4"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="blog.image"
    >
      <v-card-title>
        <div>
          {{blog.title}}
        </div>
      </v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0" >
      {{blog.subtitle}}
    </v-card-subtitle>
    <v-card-text class="text--primary">
    <!--   <div>Whitehaven Beach</div>

      <div>Whitsunday Island, Whitsunday Islands</div> -->
     <!--  {{getBlogs.subtitle}} -->
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="green"
        text
        bottom
        left
        v-on:click="onclickblog()"
      >
  
        click
      </v-btn>     
    </v-card-actions>
  </v-card>
</template>
<script>
 import { mapGetters } from 'vuex';
export default {
  name: 'FoodCard',
  props:['blog'],
  data: () => ({
     
  }),
 
  methods: {
     onclickblog(){
      //  let path = "/newsblog/"+this.blog.id
      //  let path2 = `/newsblog/${Date.now()}/weaewe`
      console.log( `/newsblog/${this.blog}`);
       this.$router.push({ path: `/newsblog/${this.blog.id}` }) 
    }
  },
};
</script>
