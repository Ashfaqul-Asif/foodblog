
import axios from "axios"
import moment from "moment";

const state = {
    posts: []
}
const actions = {
    fetchPost: async ({ commit }) => {
        let res = await axios.get("https://jsonplaceholder.typicode.com/posts")
        let posts = res.data

        console.log("fetchPost A");
        posts = posts.map(post => {
            //console.log(gets());
            return {
                ...post,
                postedtime: moment().subtract(getRandomNumber(0,20), 'days').format('X')*1000
            }
        })
        console.log("fetchPost B");
        console.log(posts);

        !res.error && commit("setPosts", posts)
    }

}
const mutations = {
    setPosts: (state, payload) => state.posts = payload
}
const getters = {
    getPosts: state => state.posts
}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}


console.log(getRandomNumber(1, 30));
export default {
    state, getters, mutations, actions, namespaced: true
}