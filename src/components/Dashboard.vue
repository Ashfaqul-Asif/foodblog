<template>
  <v-container>
    <div class="d-flex flex-wrap">
      <v-card class="my-1">
        <canvas class="canvas" id="Blog-chart"></canvas>
      </v-card>
      <v-card class="mx-2 my-1">
        <canvas class="canvas" id="myChart"></canvas>
      </v-card>
      <v-card class="my-1">
        <canvas class="canvas" id="myChart"></canvas>
      </v-card>
    </div>
  </v-container>
</template>
<script>
import { db, storage } from "../firebaseInit";
import Chart from "chart.js";

import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },

  mounted() {
    this.createPieChart();
    this.createBarChart();
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
    console.log(this.getTime());
  },
  methods: {
    createBarChart() {
      var ctx = document.getElementById("myChart").getContext("2d");

      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "FriDay",
            "SaturDay",
            "MonDay",
            "TuesDay",
            "WednesDay",
            "WednesDay"
          ],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 29, 3, 5, 2, 3],
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
      let thursday = (
        await db
          .collection("addBlogs")
          .where("postedtime", ">=", todaysStartingTime - 5 * 86400000)
          .where("postedtime", "<", todaysStartingTime - 4 * 86400000)
          .get()
      ).size;
      console.log(thursday);
      let wednesday = (
        await db
          .collection("addBlogs")
          .where("postedtime", ">=", todaysStartingTime - 6 * 86400000)
          .where("postedtime", "<", todaysStartingTime - 5 * 86400000)
          .get()
      ).size;
      console.log(wednesday);
    },

    createPieChart() {
      console.log(this.getBlogs);
      let allBlogs = this.getBlogs.length;

      let approvedblogs = this.getBlogs.reduce((acc, cur) => {
        return cur.isApproved ? (acc += 1) : acc;
      }, 0);
      let pendingPost = allBlogs - approvedblogs;
      console.log(allBlogs, approvedblogs, pendingPost);
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
    }
  }
};
</script>
<style scoped>
.canvas {
  width: 350px !important;
  height: 300px !important;
  padding: 10px !important;
}
</style>