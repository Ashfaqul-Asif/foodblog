import { db } from '@/firebaseInit'
const state = {
    Blogs: [],
    isAdmin: false,
    isLogin: false,
    username:''

}
const actions = {

    postBlogs: ({ commit }) => {
        let Blogs = []
        db.collection("addBlogs").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc);
                console.log(`${doc.id} => ${doc.data()}`);
                let blog = { ...doc.data(), id: doc.id }
                console.log(blog);
                Blogs.push(blog)
                console.log(Blogs);
            });
        });
        commit("setState", { Blogs })
    }
}

const getters = {
    getBlogs: state => state.Blogs,
    getisAdmin: state => state.isAdmin,
    getisLogin: state => state.isLogin,
    getusername:state=>state.username
}
const mutations = {
    setState: (state, payload) => {
        Object.keys(payload).forEach(key => (state[key] = payload[key]))
    },
    resetState:(state)=>{
       state.isLogin=false,
       state.isAdmin=false
    }
}
export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}