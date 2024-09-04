import React from "react";
import { colors } from "@/constant/data";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";

/**
 * @function Calculation
 * @description Render a pie chart with a legend
 * @param {Object} props Component props
 * @param {number} [props.height=335] The height of the chart
 * @returns {ReactElement} The chart
 */
const Calculation = ({ height = 335, data }) => {
  const [isDark] = useDarkMode();
  const series = data?.player_level_count?.map((d) => d.count);

  const options = {
    labels: data?.player_level_count?.map((d) => `Level ${d.level}`),
    dataLabels: {
      enabled: true,
    },

    colors: [
      colors.success,
      colors.warning,
      "#A3A1FB",
      colors.danger,
      colors.info,
      colors.gray,
      colors["dark-gray"],
      "#FFD700",
      colors.primary,
      colors.secondary,
    ],
    legend: {
      position: "bottom",
      fontSize: "12px",
      fontFamily: "Inter",
      fontWeight: 400,
      labels: {
        colors: isDark ? "#CBD5E1" : "#475569",
      },
      markers: {
        width: 6,
        height: 6,
        offsetY: -1,
        offsetX: -5,
        radius: 12,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <>
      <Chart options={options} series={series} type="pie" height={height} />
    </>
  );
};

export default Calculation;
