import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import useWidth from "@/hooks/useWidth";

const RadialsChart = ({ data }) => {
  console.log("radial data", data);
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();
  const series = data?.player_level_count?.map((d) => `${d.count}`);
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
            color: isDark ? "#CBD5E1" : "#475569",
          },
          value: {
            fontSize: "16px",
            color: isDark ? "#CBD5E1" : "#475569",
          },
          total: {
            show: true,
            label: "Total",
            color: isDark ? "#CBD5E1" : "#475569",
            formatter: function () {
              return `${data?.player_level_count?.reduce((acc, curr) => {
                acc = acc + curr.count;
                return acc;
              }, 0)} Players`;
            },
          },
        },
        track: {
          background: "#E2E8F0",
          strokeWidth: "97%",
        },
      },
    },
    labels: data?.player_level_count?.map((d) => `Level ${d.level}`),
    colors: [
      "#4669FA",
      "#FA916B",
      "#50C793",
      "#0CE7FA",
      "#1F4B47",
      "#A3F9D5",
      "#007A8D",
      "#003F42",
      "#3F5EDF",
      "#203271",
      "#0F172A",
    ],
  };

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="radialBar"
        height={width > breakpoints.md ? 360 : 250}
      />
    </div>
  );
};

export default RadialsChart;
