import { db } from '@/firebaseInit'
const state = {
    /*  Blogs: [
         {
             id: 1,
             src: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60',
             title: 'lorem1',
             subtitle: 'lorem Ipsum dolor sit1',
             
         },
         {
             id: 2,
             src: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60 ',
             title: 'lorem2',
             subtitle: 'lorem Ipsum dolor sit2',
             
         },
         {
             id: 2,
             src: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60',
             title: 'lorem2',
             subtitle: 'lorem Ipsum dolor sit2',
            
         },
         {
             id: 2,
             src: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60',
             title: 'lorem2',
             subtitle: 'lorem Ipsum dolor sit2',
             
         },
         {
             id: 2,
             src: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60',
             title: 'lorem2',
             subtitle: 'lorem Ipsum dolor sit2',
             
         },
         {
             id: 2,
             src: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60',
             title: 'lorem2',
             subtitle: 'lorem Ipsum dolor sit2',
             
         },
         {
             id: 2,
             src: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60',
             title: 'lorem2',
             subtitle: 'lorem Ipsum dolor sit2',
             
         },
         {
             id: 2,
             src: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60',
             title: 'lorem2',
             subtitle: 'lorem Ipsum dolor sit2',
             
         },
         {
             id: 1,
             src: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60',
             title: 'lorem1',
             subtitle: 'lorem Ipsum dolor sit1',
            
         },
         {
             id: 2,
             src: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60',
             title: 'lorem2',
             subtitle: 'lorem Ipsum dolor sit2',
            
         },
         {
             id: 2,
             src: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60',
             title: 'lorem2',
             subtitle: 'lorem Ipsum dolor sit2',
             
         },
         {
             id: 2,
             src: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60',
             title: 'lorem2',
             subtitle: 'lorem Ipsum dolor sit2',
           
         },
         {
             id: 2,
             src: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60',
             title: 'lorem2',
             subtitle: 'lorem Ipsum dolor sit2',
          
         },
         {
             id: 2,
             src: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60',
             title: 'lorem2',
             subtitle: 'lorem Ipsum dolor sit2',
           
         },
         {
             id: 2,
             src: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60',
             title: 'lorem2',
             subtitle: 'lorem Ipsum dolor sit2',
          
         },
         {
             id: 2,
             src: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60',
             title: 'lorem2',
             subtitle: 'lorem Ipsum dolor sit2',
           
         },
         {
             id: 2,
             src: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60',
             title: 'lorem2',
             subtitle: 'lorem Ipsum dolor sit2',
          
         }
 
     ] */
    Blogs: [],
    isAdmin: false,
    isLogin: false

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
    getisLogin: state => state.isLogin
}
const mutations = {
    setState: (state, payload) => {
        Object.keys(payload).forEach(key => (state[key] = payload[key]))
    }
}
export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}