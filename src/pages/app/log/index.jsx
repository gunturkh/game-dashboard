import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { toast, ToastContainer } from "react-toastify";
import {
  useGetLogsLevelQuery,
  useGetLogsPointQuery,
  useGetLogsProfitQuery,
} from "./logsApiSlice";
import { useNavigate } from "react-router-dom";
import LoaderCircle from "@/components/Loader-circle";
import { LazyLog } from "@melloware/react-logviewer";
import dayjs from "dayjs";

const LogPage = () => {
  const navigate = useNavigate();
  const [filler, setfiller] = useState("points");
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [points, setPoints] = useState("");
  const [profits, setProfits] = useState("");
  const [levels, setLevels] = useState("");

  // const { cards } = useSelector((state) => state.dailycombo);
  const {
    data: getLogsPoint,
    isLoading: logsPointLoading,
    isFetching: logsPointFetching,
    error,
    isError,
  } = useGetLogsPointQuery(undefined, {
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const {
    data: getLogsProfit,
    isLoading: logsProfitLoading,
    isFetching: logsProfitFetching,
  } = useGetLogsProfitQuery(undefined, {
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const {
    data: getLogsLevel,
    isLoading: logsLevelLoading,
    isFetching: logsLevelFetching,
  } = useGetLogsLevelQuery(undefined, {
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  console.log("getLogsPoint", getLogsPoint);
  console.log("getLogsProfit", getLogsProfit);
  console.log("getLogsLevel", getLogsLevel);

  useEffect(() => {
    if (isError && error?.status === 401) {
      toast.error("Session expired, please relogin");
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [error]);

  useEffect(() => {
    setIsLoaded(true);
    if (
      !(
        logsPointFetching ||
        logsPointLoading ||
        logsProfitFetching ||
        logsLevelFetching
      )
    )
      setIsLoaded(false);
  }, [
    logsPointFetching,
    logsPointLoading || logsProfitFetching || logsLevelFetching,
  ]);

  useEffect(() => {
    if (getLogsPoint) {
      const logs = getLogsPoint?.items?.map(
        (item) =>
          `[${dayjs(item.created_at_unix * 1000).format(
            "YYYY-MM-DD HH:mm:ss"
          )}] id: ${item.id}, player: ${item.player_name}, player_id: ${
            item.player_id
          }, data: ${item.data}`
      );
      console.log("logs", logs);
      const joinedLogs = logs.join("\n");
      console.log("joinedLogs", joinedLogs);
      setPoints(joinedLogs);
    }
  }, [getLogsPoint]);

  useEffect(() => {
    if (getLogsProfit) {
      const logs = getLogsProfit?.items?.map(
        (item) =>
          `[${dayjs(item?.created_at_unix * 1000).format(
            "YYYY-MM-DD HH:mm:ss"
          )}] id: ${item?.id}, player: ${item?.player_name}, player_id: ${
            item?.player_id
          }, data: ${item?.data}`
      );
      console.log("logs", logs);
      const joinedLogs = logs.join("\n");
      console.log("joinedLogs", joinedLogs);
      setProfits(joinedLogs);
    }
  }, [getLogsProfit]);

  useEffect(() => {
    if (getLogsLevel) {
      const logs = getLogsLevel?.items?.map(
        (item) =>
          `[${dayjs(item?.created_at_unix * 1000).format(
            "YYYY-MM-DD HH:mm:ss"
          )}] id: ${item?.id}, player: ${item?.player_name}, player_id: ${
            item?.player_id
          }, data: ${item?.data}`
      );
      console.log("logs", logs);
      const joinedLogs = logs.join("\n");
      console.log("joinedLogs", joinedLogs);
      setLevels(joinedLogs);
    }
  }, [getLogsLevel]);

  if (isLoaded) return <LoaderCircle />;
  return (
    <div>
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Logs
        </h4>
      </div>
      <div
        className={`${
          width < breakpoints.md ? "space-x-rb" : ""
        } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse my-2`}
      >
        <Button
          icon="heroicons:list-bullet"
          text="Points"
          disabled={isLoaded}
          className={`${
            filler === "points"
              ? "bg-slate-900 dark:bg-slate-700  text-white"
              : " bg-white dark:bg-slate-800 dark:text-slate-300"
          }   h-min text-sm font-normal`}
          iconClass=" text-lg"
          onClick={() => setfiller("points")}
        />
        <Button
          icon="heroicons-outline:list-bullet"
          text="Profits"
          disabled={isLoaded}
          className={`${
            filler === "profit"
              ? "bg-slate-900 dark:bg-slate-700 text-white"
              : " bg-white dark:bg-slate-800 dark:text-slate-300"
          }   h-min text-sm font-normal`}
          iconClass=" text-lg"
          onClick={() => setfiller("profit")}
        />
        <Button
          icon="heroicons-outline:list-bullet"
          text="Levels"
          disabled={isLoaded}
          className={`${
            filler === "level"
              ? "bg-slate-900 dark:bg-slate-700 text-white"
              : " bg-white dark:bg-slate-800 dark:text-slate-300"
          }   h-min text-sm font-normal`}
          iconClass=" text-lg"
          onClick={() => setfiller("level")}
        />
      </div>
      {getLogsPoint && filler === "points" && (
        <Card title="Points" noborder>
          <LazyLog
            loadingComponent={LoaderCircle}
            caseInsensitive
            enableHotKeys
            enableSearch
            extraLines={1}
            height="520"
            onLineContentClick={function noRefCheck() {}}
            selectableLines
            text={points}
          />
        </Card>
      )}
      {getLogsPoint && filler === "profit" && (
        <Card title="Profits" noborder>
          <LazyLog
            loadingComponent={LoaderCircle}
            caseInsensitive
            enableHotKeys
            enableSearch
            extraLines={1}
            height="520"
            onLineContentClick={function noRefCheck() {}}
            selectableLines
            text={profits}
          />
        </Card>
      )}
      {getLogsPoint && filler === "level" && (
        <Card title="Levels" noborder>
          <LazyLog
            loadingComponent={LoaderCircle}
            caseInsensitive
            enableHotKeys
            enableSearch
            extraLines={1}
            height="520"
            onLineContentClick={function noRefCheck() {}}
            selectableLines
            text={levels}
          />
        </Card>
      )}
    </div>
  );
};

export default LogPage;
