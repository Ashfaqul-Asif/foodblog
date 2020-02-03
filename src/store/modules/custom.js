const state={
   colors:''
}
const getters={
  getColors:state=>state.colors
}
const actions={

}
const mutations={
       setColor:(state,paylaod)=>{
        state.colors=paylaod
       }
}

export default{
    state,getters,mutations,actions,namespaced:true
}
