import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import ImageBlock1 from "@/components/partials/widget/block/image-block-1";
import GroupChart1 from "@/components/partials/widget/chart/group-chart-1";
import RevenueBarChart from "@/components/partials/widget/chart/revenue-bar-chart";
import RadialsChart from "@/components/partials/widget/chart/radials";
import SelectMonth from "@/components/partials/SelectMonth";
import CompanyTable from "@/components/partials/Table/company-table";
import RecentActivity from "@/components/partials/widget/recent-activity";
import MostSales from "../../components/partials/widget/most-sales";
import RadarChart from "../../components/partials/widget/chart/radar-chart";
import HomeBredCurbs from "./HomeBredCurbs";
import { useGetDashboardQuery } from "./dashboardApiSlice";
import Loading from "@/components/Loading";
import Calculation from "@/components/partials/widget/chart/LevelCalculation";

const Dashboard = () => {
  const [filterMap, setFilterMap] = useState("usa");
  const [isLoaded, setIsLoaded] = useState(false);
  const {
    data: getDashboard,
    isLoading,
    isFetching,
    error,
    isError,
  } = useGetDashboardQuery(undefined, {
    pollingInterval: 180000,
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  useEffect(() => {
    if (isError && error?.status === 401) {
      toast.error("Session expired, please relogin");
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [error]);

  useEffect(() => {
    setIsLoaded(true);
    if (!(isLoading || isFetching)) setIsLoaded(false);
  }, [isLoading, isFetching]);


  if (isLoaded) {
    return <Loading />;
  }

  const LevelDistribution = ({ data }) => {
    const levelCounts = data?.player_level_count || {};

    if (
      !data ||
      !data.player_level_count ||
      Object.keys(levelCounts).length === 0
    ) {
      return (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No data available
        </div>
      );
    }

    const totalPlayers = Object.values(levelCounts).reduce(
      (sum, { count }) => sum + count,
      0
    );

    return (
      <div className="space-y-4">
        <div className="text-center font-bold text-2xl">
          Total Players: <span className="text-indigo-600 dark:text-indigo-400">{totalPlayers.toLocaleString()}</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(levelCounts).map(([level, { count }]) => {
            const percentage = ((count / totalPlayers) * 100).toFixed(1);
            return (
              <div
                key={level}
                className="bg-gradient-to-br from-white to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-lg shadow-md p-4 flex flex-col items-center transition-all duration-300 hover:scale-105"
              >
                <span className="font-medium text-lg text-indigo-600 dark:text-indigo-400">
                  Level {parseInt(level) + 1}
                </span>
                <span className="font-semibold text-2xl mt-2">
                  {count.toLocaleString()}
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  {" "}
                  players
                </span>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 dark:bg-indigo-400 h-2.5 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                  {percentage}% of total players
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <HomeBredCurbs title="Dashboard" />
      <div className="grid grid-cols-12 gap-5 mb-5">
        <div className="col-span-12">
          <Card bodyClass="p-4">
            <div className="grid md:grid-cols-4 gap-4">
              <GroupChart1 data={getDashboard} />
            </div>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        {/* <div className="lg:col-span-8 col-span-12">
          <Card>
            <div className="legend-ring">
              <RevenueBarChart />
            </div>
          </Card>
        </div> */}
        {/* <div className="lg:col-span-4 col-span-12">
          <Card title="Players Level" headerslot={<SelectMonth />}>
            <RadialsChart data={getDashboard} />
            <Calculation data={getDashboard} />
          </Card>
        </div> */}
        <div className="lg:col-span-12 col-span-12">
          <Card title="Level Distribution" headerslot={<SelectMonth />}>
            {getDashboard ? (
              <LevelDistribution data={getDashboard} />
            ) : (
              <div>Loading dashboard data...</div>
            )}
          </Card>
        </div>
        {/* <div className="lg:col-span-8 col-span-12">
          <Card title="All Company" headerslot={<SelectMonth />} noborder>
            <CompanyTable />
          </Card>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <Card title="Recent Activity" headerslot={<SelectMonth />}>
            <RecentActivity />
          </Card>
        </div>
        <div className="lg:col-span-8 col-span-12">
          <Card
            title="Most Sales"
            headerslot={
              <div className="border border-slate-200 dark:border-slate-700 dark:bg-slate-900 rounded p-1 flex items-center">
                <span
                  className={` flex-1 text-sm font-normal px-3 py-1 transition-all duration-150 rounded cursor-pointer
                ${
                  filterMap === "global"
                    ? "bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-300"
                    : "dark:text-slate-300"
                }  
                `}
                  onClick={() => setFilterMap("global")}
                >
                  Global
                </span>
                <span
                  className={` flex-1 text-sm font-normal px-3 py-1 rounded transition-all duration-150 cursor-pointer
                  ${
                    filterMap === "usa"
                      ? "bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-300"
                      : "dark:text-slate-300"
                  }
              `}
                  onClick={() => setFilterMap("usa")}
                >
                  USA
                </span>
              </div>
            }
          >
            <MostSales filterMap={filterMap} />
          </Card>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <Card title="Overview" headerslot={<SelectMonth />}>
            <RadarChart />
            <div className="bg-slate-50 dark:bg-slate-900 rounded p-4 mt-8 flex justify-between flex-wrap">
              <div className="space-y-1">
                <h4 className="text-slate-600 dark:text-slate-200 text-xs font-normal">
                  Invested amount
                </h4>
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                  $8264.35
                </div>
                <div className="text-slate-500 dark:text-slate-300 text-xs font-normal">
                  +0.001.23 (0.2%)
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-slate-600 dark:text-slate-200 text-xs font-normal">
                  Invested amount
                </h4>
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                  $8264.35
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-slate-600 dark:text-slate-200 text-xs font-normal">
                  Invested amount
                </h4>
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                  $8264.35
                </div>
              </div>
            </div>
          </Card>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
