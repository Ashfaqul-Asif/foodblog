<template>
   <div>
   <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea dolore, beatae mollitia in nulla ipsa aspernatur voluptatem sapiente! Porro, quae ex doloribus voluptatum optio similique blanditiis repudiandae ipsam adipisci voluptates.</p>
  <button @click="$emit('onclick',$event)"  :class="['size-'+size ,'color-'+color]">Default Button</button>
   </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    color: {
      type: String,
      default: "blue"
    },
    size: {
      type: String,
      default: "normal"
    }
  },
  created() {
    console.log(this.color);
    console.log(this.size);
    console.log(this);
  },
 
};
</script>
<style scoped>
.size-medium {
  border: none;
  padding: 10px 30px;
  font-size: 13px;
}
.button{
  text-align: center;
  text-decoration: none;
  display: inline-block;
}

.size-small {
  border: none;
  padding: 10px 30px;
  font-size: 10px;
}


.size-large {
  border: none;
  padding: 10px 30px;
  font-size: 18px;
}

.color-black {
  background-color: black;
  color: white;
}

.color-white {
  background-color: white;
  color: black;
}

.color-red {
  background-color: rgb(233, 16, 16);
  color: white;
}
</style>