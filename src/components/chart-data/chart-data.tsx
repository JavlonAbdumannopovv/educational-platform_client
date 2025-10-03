import {
  Box,
  Card,
  CardBody,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import SectionTitle from "../section-title/section-title";
import { Line } from "react-chartjs-2";

const ChartData = ({ dataArr, title, subtitle }) => {
  const [chartData] = useState({
    labels: dataArr.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: dataArr.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  return (
    <Card
      mt={10}
      background={useColorModeValue("gray.50", "gray.700")}
      boxShadow={"lg"}
    >
      <CardBody>
        <HStack gap={4}>
          <SectionTitle title={title} subtitle={subtitle} w={"30%"}/>
          <Box className="chart-container" w={"70%"}>
            <Line
              data={chartData}
              options={{
                plugins: {
                  title: { display: false },
                  legend: { display: false },
                },
              }}
            />
          </Box>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default ChartData;
