<template>
  <div>
      <v-container>
        <combo/>
      <customButton
        @onclick="onClickCustomButton"
        :size="'medium'"
        :color="getColors"
        :text=" 'click' "
        :round="getRadioInput"
      /> 
      <radiobutton/>
      </v-container>
  </div>
</template>
        
<script>
import {mapGetters} from 'vuex'
import radiobutton from "@/components/radiobutton"
import customButton from "@/components/customButton"
import combo from "@/components/combo"
export default {
  components:{
    customButton,combo,radiobutton,combo
  },
  data() {
    return {
      
    }
  },
  methods: {
     onClickCustomButton(event) {
      console.log(event);
    }
  },
  computed: {
    ...mapGetters('custom',['getColors','getRadioInput'])

  },
}
</script>
<style scoped>

</style>>
  
