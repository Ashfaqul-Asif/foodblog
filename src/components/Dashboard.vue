<template>
  <v-container>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores consequuntur, iste, id quis, at quaerat illum
      aut voluptatem magnam animi non culpa vel. Vitae earum vel itaque ea, voluptatum repellendus?
    </p>
    <canvas id="Blog-chart"></canvas>
    <!-- <canvas id="planet-chart"></canvas> -->
  </v-container>
</template>

<script>
import Chart from "chart.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    this.createChart("planet-chart");
  },
  computed: {
    ...mapGetters("product", ["getBlogs"])
  },
  methods: {
    /*   createChart(chartId) {
      const ctx = document.getElementById(chartId);
      console.log(ctx);
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "Mercury",
            "Venus",
            "Earth",
            "Mars",
            "Jupiter",
            "Saturn",
            "Uranus",
            "Neptune"
          ],
          datasets: [
            {
              // one line graph
              label: "Number of Moons",
              data: [0, 0, 1, 2, 67, 62, 27, 14],
              backgroundColor: [
                "rgba(54,73,93,.5)", // Blue
                "rgba(54,73,93,.5)",
                "rgba(54,73,93,.5)",
                "rgba(54,73,93,.5)",
                "rgba(54,73,93,.5)",
                "rgba(54,73,93,.5)",
                "rgba(54,73,93,.5)",
                "rgba(54,73,93,.5)"
              ],
              borderColor: [
                "#36495d",
                "#36495d",
                "#36495d",
                "#36495d",
                "#36495d",
                "#36495d",
                "#36495d",
                "#36495d"
              ],
              borderWidth: 3
            },
            {
              // another line graph
              label: "Planet Mass (x1,000 km)",
              data: [4.8, 12.1, 12.7, 6.7, 139.8, 116.4, 50.7, 49.2],
              backgroundColor: [
                "rgba(71, 183,132,.5)" // Green
              ],
              borderColor: ["#47b784"],
              borderWidth: 3
            }
          ]
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25
                }
              }
            ]
          }
        }
      });
    } */

    createChart() {
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
              label: "Number of Moons",
              data: [allBlogs, approvedblogs, pendingPost],
              backgroundColor: [
                "#29b6f6",
                "#ffff00",
                "#00bfa5"
              ],
              borderColor: ["#36495d", "#36495d", "#36495d"],
              borderWidth: 3
            }
          ]
        },
        options: {
          responsive: true,
          lineTension: 1,
        
        }
      });
    }
  }
};
</script>

<style>
</style>