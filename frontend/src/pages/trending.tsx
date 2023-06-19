import React from "react";
import { Line, Bar, Chart } from "react-chartjs-2";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Trending = () => {
  const lineChartData = {
    labels: ["Produkt A", "Produkt B", "Produkt C"],
    datasets: [
      {
        label: "Antal produkter",
        data: [10, 5, 8],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: ["Produkt A", "Produkt B", "Produkt C"],
    datasets: [
      {
        label: "Antal produkter",
        data: [10, 5, 8],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const PiedChartData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <>
      <Grid
        templateColumns={{ sm: "1fr", md: "repeat(4, 1fr)" }}
        gap={7}
        maxWidth="md"
        mx="15vw"
        p={4}
      >
        {/* <GridItem mt="10vh">
          <Line data={lineChartData} />
        </GridItem>
        <GridItem mt="10vh">
          <Bar data={barChartData} />
        </GridItem> */}
      </Grid>
    </>
  );
};

export default Trending;
