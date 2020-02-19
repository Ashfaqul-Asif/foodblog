<template>
  <v-container>
    <div class="d-flex flex-wrap">
      <v-card class="my-1">
        <canvas class="canvas" id="Blog-chart"></canvas>
      </v-card>
      <v-card class="mx-2 my-1">
        <canvas class="canvas" id="myChart"></canvas>
      </v-card>

        <v-card class="mx-2 my-1">
        <canvas class="canvas" id="signupChart"></canvas>
      </v-card>
     
    </div>
  </v-container>
</template>
<script>
import moment from "moment";
import { db, storage } from "../firebaseInit";
import Chart from "chart.js";

import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      barData: [],
      signUpData:[]
    };
  },

  mounted() {
    this.createPieChart();
/*     this.createsignUpChart(); */
    //this.createBarChart();
    console.log(new Date().toString());

    console.log(new Date().toDateString());
    console.log(new Date().getUTCMonth());
    console.log(new Date().getUTCDate());
    console.log(new Date().getDay());
    console.log(new Date().getHours());
    console.log(new Date().getUTCHours());
    let x = new Date().toLocaleDateString();

    console.log("x", x);

    console.log(new Date(x).getTime());
  },

  computed: {
    ...mapGetters("product", ["getBlogs"])
  },
  created() {
    this.signUpData
    this.postBlogs();
    console.log("before");

    this.getTime();

    console.log(this.barData);
    console.log(
      moment(new Date().toDateString()).format("MMMM Do YYYY, h:mm:ss a")
    );
    console.log(moment(new Date().toDateString()).add(7, "d"));
  },
  methods: {
    ...mapActions("product", ["postBlogs"]),
    async getTime() {
      let currentTime = new Date().toLocaleDateString();
      let todaysStartingTime = new Date(currentTime).getTime();
      console.log(todaysStartingTime);
      let weekStartingTime = [
        todaysStartingTime,
        todaysStartingTime - 86400000,
        todaysStartingTime - 2 * 86400000,
        todaysStartingTime - 3 * 86400000,
        todaysStartingTime - 4 * 86400000,
        todaysStartingTime - 5 * 86400000,
        todaysStartingTime - 6 * 86400000
      ];
      /* array.forEach(element => {
        
      }); */
      let todaypost = (
        await db
          .collection("addBlogs")
          .where("postedtime", ">=", todaysStartingTime)
          .get()
      ).size;
      console.log(todaypost);
      console.log(new Date(todaysStartingTime - 86400000 + 3600000));

      let yesterdaypost = (
        await db
          .collection("addBlogs")
          //.where("postedtime", ">=", todaysStartingTime - 86400000)
          .where("postedtime", "<", todaysStartingTime)
          .get()
      ).size;
      console.log(yesterdaypost);
      let sundaypost = (
        await db
          .collection("addBlogs")
          .where("postedtime", ">=", todaysStartingTime - 2 * 86400000)
          .where("postedtime", "<", todaysStartingTime - 86400000)
          .get()
      ).size;
      console.log(sundaypost);
      let saturdaypost = (
        await db
          .collection("addBlogs")
          .where("postedtime", ">=", todaysStartingTime - 3 * 86400000)
          .where("postedtime", "<", todaysStartingTime - 2 * 86400000)
          .get()
      ).size;
      console.log(saturdaypost);
      let fridaypost = (
        await db
          .collection("addBlogs")
          .where("postedtime", ">=", todaysStartingTime - 4 * 86400000)
          .where("postedtime", "<", todaysStartingTime - 3 * 86400000)
          .get()
      ).size;
      console.log(fridaypost);
      let thursdaypost = (
        await db
          .collection("addBlogs")
          .where("postedtime", ">=", todaysStartingTime - 5 * 86400000)
          .where("postedtime", "<", todaysStartingTime - 4 * 86400000)
          .get()
      ).size;
      console.log(thursdaypost);
      let wednesdaypost = (
        await db
          .collection("addBlogs")
          .where("postedtime", ">=", todaysStartingTime - 6 * 86400000)
          .where("postedtime", "<", todaysStartingTime - 5 * 86400000)
          .get()
      ).size;
       let todaysignup = (
        await db
          .collection("addBlogs")
          .where("signuptime", ">=", todaysStartingTime)
          .get()
      ).size;
      console.log(todaysignup);
      console.log(new Date(todaysStartingTime - 86400000 + 3600000));

      let yesterdaysignup = (
        await db
          .collection("addBlogs")
          .where("signuptime", ">=", todaysStartingTime - 86400000)
          .where("signuptime", "<", todaysStartingTime)
          .get()
      ).size;
      console.log(yesterdaysignup);
      let sundaysignup = (
        await db
          .collection("addBlogs")
       /*    .where("signuptime", ">=", todaysStartingTime - 2 * 86400000) */
          .where("signuptime", "<", todaysStartingTime - 86400000)
          .get()
      ).size;
      console.log(sundaysignup);
      let saturdaysignup = (
        await db
          .collection("addBlogs")
          .where("signuptime", ">=", todaysStartingTime - 3 * 86400000)
          .where("signuptime", "<", todaysStartingTime - 2 * 86400000)
          .get()
      ).size;
      console.log(saturdaysignup);
      let fridaysignup = (
        await db
          .collection("addBlogs")
          .where("signuptime", ">=", todaysStartingTime - 4 * 86400000)
          .where("signuptime", "<", todaysStartingTime - 3 * 86400000)
          .get()
      ).size;
      console.log(fridaysignup);
      let thursdaysignup = (
        await db
          .collection("addBlogs")
          .where("signuptime", ">=", todaysStartingTime - 5 * 86400000)
          .where("signuptime", "<", todaysStartingTime - 4 * 86400000)
          .get()
      ).size;
      console.log(thursdaysignup);
      let wednesdaysignup = (
        await db
          .collection("addBlogs")
          .where("signuptime", ">=", todaysStartingTime - 6 * 86400000)
          .where("signuptime", "<", todaysStartingTime - 5 * 86400000)
          .get()
      ).size;

      this.signUpData.push( wednesdaysignup,
        thursdaysignup,
        fridaysignup,
        saturdaysignup,
        sundaysignup,
        yesterdaysignup,
        todaysignup)

      this.barData.push(
        wednesdaypost,
        thursdaypost,
        fridaypost,
        saturdaypost,
        sundaypost,
        yesterdaypost,
        todaypost
      );

      let days = [
        "Sunday",
        "MonDay",
        "TuesDay",
        "WednesDay",
        "Thursday",
        "FriDay",
        "SaturDay"
      ];
      let dayOfWeek = new Date().getDay();
      let formatedRevDays = days
        .slice(dayOfWeek)
        .concat(days.slice(0, dayOfWeek))
        .reverse();
      console.log(this.barData);
      this.createBarChart(formatedRevDays);
      this.createsignUpChart(formatedRevDays)
    },
    createBarChart(days) {
      var ctx = document.getElementById("myChart").getContext("2d");

      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: days,
          datasets: [
            {
              label: " of Votes",
              data: this.barData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 1
            }
          ]
        },

        options: {
          legend:{

            display: false,
          },
          
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    },
     createsignUpChart(days) {
      var ctx = document.getElementById("signupChart").getContext("2d");

      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: days,
          datasets: [
            {
              label: " of Votes",
              data: this.signUpData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 1
            }
          ]
        },

        options: {
          legend:{

            display: false,
          },
          
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    },

    createPieChart() {
      console.log(this.getBlogs);
      let allBlogs = this.getBlogs.length;

      let approvedblogs = this.getBlogs.reduce((acc, cur) => {
        return cur.isApproved ? (acc += 1) : acc;
      }, 0);
      let pendingPost = allBlogs - approvedblogs;
      console.log("methods");
      const ctx = document.getElementById("Blog-chart");

      const myChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["allBlogs", "approvedblogs", "pendingPost"],
          datasets: [
            {
              label: "Number of Blogs",
              data: [allBlogs, approvedblogs, pendingPost],
              backgroundColor: ["#29b6f6", "#A8E6DE", "#5D807B"],
              borderColor: ["#757575", "#757575", "#757575"],
              borderWidth: 2
            }
          ]
        },

        options: {
          responsive: true
          /*  scales:{
            xAxes:[{
              ticks:{
                fontSize:10
              }
            }]
          } */
        }
      });
      console.log("mychart", myChart);
    }
  }
};
</script>
<style scoped>
.canvas {
  width: 350px !important;
  height: 260px !important;
  padding: 10px !important;
}
</style>