import { db } from '@/firebaseInit'
const state = {
    Blogs: [],
    isAdmin: null,
    isLogin: null,
    userid: '',
    loading: true

}
const actions = {
   /*  postBlogs:  ({ commit }) => {
        return new Promise((res) => {
            commit("setLoading", true)
            let Blogs = []
            let count = 0
            db.collection("addBlogs").get().then((querySnapshot) => {
                console.log(querySnapshot);
                querySnapshot.forEach((doc) => {
                    console.log(doc);
                    console.log(`${doc.id} => ${doc.data().userid}`);
                    db.collection("registration").doc(doc.data().userid).get().then((documentSnapshot) => {
                        console.log(documentSnapshot.data().name);
                        let blog = { ...doc.data(), id: doc.id, name: documentSnapshot.data().name }
                        console.log(blog);
                        Blogs.push(blog)
                        count += 1
                        console.log(Blogs.length);
                        console.log(count);
                        if (querySnapshot.size === count) {
                           res()
                        }
                    })
                });
            });
            commit("setState", { Blogs })
        })
    } */
    postBlogs:async ({commit})=>{
        commit("setLoading", true)
        let Blogs=[]
        let count =0
        let querySnapshot=await db.collection("addBlogs").get()
         querySnapshot.forEach((doc)=>{
            let documentSnapshot= db.collection("registration").doc(doc.data().userid).get()
              
        })
        
    }
}

const getters = {
    getBlogs: state => state.Blogs,
    getisAdmin: state => state.isAdmin,
    getisLogin: state => state.isLogin,
    getuserId: state => state.userid,
    getLoading: state => state.loading
}
const mutations = {
    setState: (state, payload) => {
        Object.keys(payload).forEach(key => (state[key] = payload[key]))
    },
    resetState: (state) => {
        state.isLogin = false,
            state.isAdmin = false,
            state.username = null,
            state.userid = null
    },
    setLoading: (state, payload) => state.loading = payload
}
export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}

z().then(function (y) {
    console.log(y);
})
function z() {
    return x(1, 21).then(function (a) {
        return a
    }).catch(function (b) {
        console.log(b);
    })
}


function x(a, b) {
    let y = new Promise(function (res, rej) {
        setTimeout(function () { res(62) }, 3000)
    })
    return y
}
                        /*    try {
       let querySnapshot = await db.collection("addBlogs").get()
       for (let doc of querySnapshot) {
           let documentSnapshot = await db.collection("registration").doc(doc.data()).userid.get()
           let blog = { ...doc.data(), id: doc.id, name: documentSnapshot.data().name }
           console.log(blog);
       }
   } catch (error) {
      console.log(error);
   } */

   function makerequest(location){
       return new Promise(function(resolve,reject){
        console.log('making request to `{$location`}');
       })

   }