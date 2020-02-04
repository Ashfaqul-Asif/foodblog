const state={
   colors:'',
   radioInput:''
   
}
const getters={
  getColors:state=>state.colors,
  getRadioInput:state=>state.radioInput
}
const actions={

}
const mutations={
       setColor:(state,paylaod)=>{
        state.colors=paylaod
       },
       setRadioInput:(state,payload)=>{
         state.radioInput=payload
       }
}

export default{
    state,getters,mutations,actions,namespaced:true
}
