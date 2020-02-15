import { db } from '@/firebaseInit'
const state = {
    Blogs: [],
    isAdmin: null,
    isLogin: null,
    userid:''

}
const actions = {

   postBlogs:async ({ commit }) => {
        let Blogs = []
        return await db.collection("addBlogs").get().then((querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
                console.log(doc);
                console.log(`${doc.id} => ${doc.data().userid}`);
                db.collection("registration").doc(doc.data().userid).get().then((documentSnapshot)=>{
                  console.log(documentSnapshot.data().name);
                  let blog = { ...doc.data(), id: doc.id ,name:documentSnapshot.data().name}
                  console.log(blog.name);
                  Blogs.push(blog)
                  console.log(Blogs);
                  if(lastindex){
                      return
                  }
                })
            });
        });
        commit("setState", { Blogs })
    }
}

const getters = {
    getBlogs: state => state.Blogs,
    getisAdmin: state => state.isAdmin,
    getisLogin: state => state.isLogin,
    getuserId:state=>state.userid
}
const mutations = {
    setState: (state, payload) => {
        Object.keys(payload).forEach(key => (state[key] = payload[key]))
    },
    resetState:(state)=>{
       state.isLogin=false,
       state.isAdmin=false,
       state.username=null,
       state.userid=null
    }
}
export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}