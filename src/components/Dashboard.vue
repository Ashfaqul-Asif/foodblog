<template>
  <div class="d-flex div">
    <router-view></router-view>
    <v-container class="justify-center">
      <div class="justify-space-around">
        <div v-if="getisAdmin" class="d-flex flex-wrap">
          <v-card class="my-1">
            <canvas class="canvas mx-auto" id="Blog-chart"></canvas>
            <v-card-subtitle text--color>Total Blogs</v-card-subtitle>
          </v-card>
          <v-card class="mx-1 my-1">
            <canvas class="canvas mx-auto" id="myChart"></canvas>
            <v-card-subtitle>Blogs posted</v-card-subtitle>
          </v-card>

          <v-card class="mx-1 my-1">
            <canvas class="canvas" id="signupChart"></canvas>
            <v-card-subtitle>Daily Signup</v-card-subtitle>
          </v-card>
        </div>
        <div class="d-flex flex-wrap justify-space-between">
          <v-card>
            <canvas class="canvas1" id="individualBlogs"></canvas>
            <v-card-subtitle>Your Blogs</v-card-subtitle>
          </v-card>
          <v-card>
            <canvas class="canvas1" id="Individualbar-chart"></canvas>
            <v-card-subtitle>Your Blogs</v-card-subtitle>
          </v-card>
        </div>
      </div>

      <div v-if="getisadmin" class="d-flex justify-space-around py-10">
        <v-card height="20vh" width="20vw">
          <v-icon class="mx-2" style="font-size: 60px;">mdi-post-outline</v-icon>
          <!-- <v-icon style="font-size:24px"  >mdi-post-outline</v-icon> -->
          <div class="float-right text-right overflow-hidden">
            <v-card-subtitle>Total Blogs</v-card-subtitle>
            <v-card-title>{{totalblogs}}</v-card-title>
          </div>
        </v-card>
        <v-card height="20vh" width="20vw">
          <v-icon class="mx-2" style="font-size: 60px;">mdi-account-multiple</v-icon>

          <div class="float-right text-right overflow-hidden">
            <v-card-subtitle>Total Account</v-card-subtitle>
            <v-card-title>{{totalAccount}}</v-card-title>
          </div>
        </v-card>
      </div>
    </v-container>
  </div>
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
      signUpData: [],
      formatDays: []
    };
  },

  mounted() {
    if (this.getisAdmin) {
      this.createPieChart();
    }

    this.createIndividualPieChart();
    this.createIndividualBarChart();

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
    ...mapGetters("product", [
      "getBlogs",
      "getRegistrationData",
      "getisAdmin",
      "getUserName"
    ]),
    totalblogs() {
      return this.getBlogs.length;
    },
    totalAccount() {
      return this.getRegistrationData.length;
    },
    individualBlogs() {
      return this.getBlogs.filter(blog => blog.username === this.getUserName);
    }
  },
  created() {
    console.log("username", this.$store.getters["product/getUserName"]);
    console.log("sdsds", this.individualBlogs);
    console.log("Blogs", this.getBlogs);
    this.signUpData;
    this.fetchRegistrationData();
    console.log("before");
    console.log("total", this.totalblogs);

    this.getTime();

    console.log(this.barData);
    console.log(
      moment(new Date().toDateString()).format("MMMM Do YYYY, h:mm:ss a")
    );
  },
  methods: {
    ...mapActions("product", ["fetchRegistrationData"]),

    async getTime() {
      let currentTime = new Date().toLocaleDateString();
      let todaysStartingTime = new Date(currentTime).getTime();
      console.log("todaysStartingTime", todaysStartingTime);
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
          .collection("registration")
          .where("signuptime", ">=", todaysStartingTime)
          .get()
      ).size;
      console.log("todaysignup", todaysignup);

      let yesterdaysignup = (
        await db
          .collection("registration")
          .where("signuptime", ">=", todaysStartingTime - 86400000)
          .where("signuptime", "<", todaysStartingTime)
          .get()
      ).size;
      console.log(yesterdaysignup);
      let sundaysignup = (
        await db
          .collection("registration")
          /*    .where("signuptime", ">=", todaysStartingTime - 2 * 86400000) */
          .where("signuptime", "<", todaysStartingTime - 86400000)
          .get()
      ).size;
      console.log(sundaysignup);
      let saturdaysignup = (
        await db
          .collection("registration")
          .where("signuptime", ">=", todaysStartingTime - 3 * 86400000)
          .where("signuptime", "<", todaysStartingTime - 2 * 86400000)
          .get()
      ).size;
      console.log(saturdaysignup);
      let fridaysignup = (
        await db
          .collection("registration")
          .where("signuptime", ">=", todaysStartingTime - 4 * 86400000)
          .where("signuptime", "<", todaysStartingTime - 3 * 86400000)
          .get()
      ).size;
      console.log(fridaysignup);
      let thursdaysignup = (
        await db
          .collection("registration")
          .where("signuptime", ">=", todaysStartingTime - 5 * 86400000)
          .where("signuptime", "<", todaysStartingTime - 4 * 86400000)
          .get()
      ).size;
      console.log(thursdaysignup);
      let wednesdaysignup = (
        await db
          .collection("registration")
          .where("signuptime", ">=", todaysStartingTime - 6 * 86400000)
          .where("signuptime", "<", todaysStartingTime - 5 * 86400000)
          .get()
      ).size;

      this.signUpData.push(
        wednesdaysignup,
        thursdaysignup,
        fridaysignup,
        saturdaysignup,
        sundaysignup,
        yesterdaysignup,
        todaysignup
      );

      this.barData.push(
        wednesdaypost,
        thursdaypost,
        fridaypost,
        saturdaypost,
        sundaypost,
        yesterdaypost,
        todaypost
      );

      /* let days = [
        "Sunday",
        "MonDay",
        "TuesDay",
        "WednesDay",
        "Thursday",
        "FriDay",
        "SaturDay"
      ];
      let dayOfWeek = new Date().getDay(); */

      let daysSorted = [];
      for (var i = 0; i < 7; i++) {
        var startdate = moment()
          .subtract(i, "days")
          .format("dddd");
        console.log("startdate", startdate);
        daysSorted.push(startdate);
      }
      let formatedRevDays = daysSorted.reverse();

      /*  for (var i = 0; i < 7; i++) {
        var newDate = new Date(today.setDate(today.getDate() - 1));
       
        daysSorted.push(days[newDate.getDay()]);
      }
      let formatedRevDays = daysSorted.reverse() */

      console.log(this.barData);
      this.createBarChart(formatedRevDays);
      this.createsignUpChart(formatedRevDays);
    },
    createBarChart(days) {
      var ctx = document.getElementById("myChart").getContext("2d");

      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: days,
          datasets: [
            {
              label: " Daily Signup",
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
          legend: {
            display: false
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
    createIndividualPieChart() {
      /*       let currentTime = new Date().toLocaleDateString();
      let todaysStartingTime = new Date(currentTime).getTime();
      console.log("todaysStartingTime", todaysStartingTime);
      let todaypost = (
        await db
          .collection("addBlogs")
          .where("postedtime", ">=", todaysStartingTime)
          .get()
      ).size;
      console.log(todaypost); */
      let currentTime = new Date().toLocaleDateString();
      let todaysStartingTime = new Date(currentTime).getTime();
      console.log(this.individualBlogs);

      this.individualBlogs.forEach(blog => {
        let x = blog.approvedtime;
        console.log(x);
      });
      let IntotalBlogs = this.individualBlogs.length;
      let Inapprovedblogs = this.individualBlogs.reduce((acc, cur) => {
        return cur.isApproved ? (acc += 1) : acc;
      }, 0);
      let InpendingPost = IntotalBlogs - Inapprovedblogs;
      console.log("IntotalBlogs", IntotalBlogs, Inapprovedblogs, InpendingPost);

      var ctx = document.getElementById("individualBlogs").getContext("2d");
      const myChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["allBlogs", "approvedblogs", "pendingPost"],
          datasets: [
            {
              label: "Number of Blogs",
              data: [IntotalBlogs, Inapprovedblogs, InpendingPost],
              backgroundColor: ["firebrick", "lightblue", "yellow"],
              borderColor: ["white", "white", "white"],
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
    },
    createIndividualBarChart() {
      let currentTime = new Date().toLocaleDateString();
      let todaysStartingTime = new Date(currentTime).getTime();
      let lastweekStartingTime = todaysStartingTime - 7 * 86400000;
      console.log(lastweekStartingTime);

      let daysSorted = [];
      for (var i = 0; i < 7; i++) {
        var startdate = moment()
          .subtract(i, "days")
          .format("dddd");
        console.log("startdate", startdate);
        daysSorted.push(startdate);
      }
      console.log(daysSorted);

      let formatedRevDays = daysSorted.reverse();

      var ctx = document.getElementById("Individualbar-chart").getContext("2d");

      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: daysSorted,
          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: [
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "teal",
                "lightBlue",
                "grey"
              ],
              data: [0, 0, 0, 0, 1, 0, 0]
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: "Your Daily Posted Blogs"
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
              label: "Number of Blogs",
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
          legend: {
            display: false
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
  width: 24vw !important;
  height: 260px !important;
  padding: 10px !important;
}
.canvas1 {
  width: 35vw !important;
  height: 260px;
}
.card {
  min-width: -webkit-fill-available;
}
.icon {
  height: 100px;
}
.div {
  background-color: whitesmoke;
}
</style>