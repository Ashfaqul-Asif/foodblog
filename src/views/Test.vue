<template>
    <div>
        <v-container  v-on:mousemove="updateCoordinates">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate autem iste facilis in pariatur?
                Consequatur facere illum quasi nobis laborum consequuntur alias molestiae dolores, quae ea saepe maxime
                enim animi?</p>
            <input type="text" placeholder="input" @input="changeTitle">
            {{title}}

            <p>{{sayhello()}} </p>
            <p>
                <a v-bind:href="link"></a>
            </p>

            <div >
                <v-btn v-on:click="increase(10)" small>click</v-btn>
                <p>{{count}}</p>
                
            </div>

            <p v-on:mousemove="updateCoordinates">Coordinates:{{x}} /{{y}}</p>
            <div>
                a={{a}},b={{b}}
            </div>




        </v-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                link: 'https://www.google.com',
                count:0,
                x:0,
                y:0,
                a:1
                
            }
        },
        computed: {
                b:function(){
                    return this.a+10
                }
            },
        methods: {
            changeTitle: function (event) {
                this.title = event.target.value
                console.log(event);
            },
            sayhello: function () {
                return 'hello'
            },
            increase:function(step){
           
                if (this.count>=19) {
                    this.count+=step
                }else{
                     this.count++
                }
            },
            updateCoordinates:function (event) {
                this.x = event.clientX;
                this.y = event.clientY;

            },
        },
    }
</script>

<style lang="stylus" scoped>

</style>