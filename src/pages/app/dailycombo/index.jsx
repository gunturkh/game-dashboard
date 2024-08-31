import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { toggleAddModal } from "./store";
import { toast, ToastContainer } from "react-toastify";
import { useGetDailyComboQuery } from "./dailycomboApiSlice";
import { useNavigate } from "react-router-dom";
import DailyComboTable from "@/components/partials/Table/dailycombo-table";
import LoaderCircle from "@/components/Loader-circle";

const DailyComboPage = () => {
  const navigate = useNavigate();
  // const [filler, setfiller] = useState("grid");
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);

  const { cards } = useSelector((state) => state.dailycombo);
  const dispatch = useDispatch();
  const {
    data: getDailyCombo,
    isLoading: dailyComboLoading,
    isFetching: dailyComboFetching,
    error,
    isError,
  } = useGetDailyComboQuery(undefined, {
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  console.log("getDailyCombo", getDailyCombo);

  useEffect(() => {
    if (isError && error?.status === 401) {
      toast.error("Session expired, please relogin");
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [error]);

  useEffect(() => {
    setIsLoaded(true);
    if (!(dailyComboFetching || dailyComboLoading)) setIsLoaded(false);
  }, [dailyComboFetching, dailyComboLoading]);

  if (isLoaded) return <LoaderCircle />;
  return (
    <div>
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Daily Combo
        </h4>
        <div
          className={`${
            width < breakpoints.md ? "space-x-rb" : ""
          } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
        >
          <Button
            icon="heroicons-outline:plus"
            text="Add Daily Combo"
            className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
            iconClass=" text-lg"
            onClick={() => dispatch(toggleAddModal(true))}
          />
        </div>
      </div>
      {getDailyCombo && (
        <Card title="Daily Combo" noborder>
          <DailyComboTable dailycomboDatas={getDailyCombo?.items} />
        </Card>
      )}
    </div>
  );
};

export default DailyComboPage;
