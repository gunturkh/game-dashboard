import React, { useEffect } from "react";
import { useGetTaskSubmissionsQuery } from "./taskApiSlice";
import LoaderCircle from "@/components/Loader-circle";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import AddCategory from "../cards/AddCategory";
import { useDispatch } from "react-redux";
import { toggleAddModal } from "../projects/store";
import AddTask from "./AddTask";
import Card from "@/components/ui/Card";
import { toggleAddCardModal } from "./store";
import TasksTable from "@/components/partials/Table/tasks-table";
import EditTask from "./EditTask";
import TaskSubmissionTable from "@/components/partials/Table/task-submissions-table";

function TaskSubmissions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width, breakpoints } = useWidth();
  const {
    data: getTaskSubmissions,
    isLoading,
    isFetching,
    error,
    isError,
  } = useGetTaskSubmissionsQuery(undefined, {
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  useEffect(() => {
    console.log("error", error);
    console.log("isError", isError);
    if (isError && error?.status === 401) {
      toast.error("Session expired, please relogin");
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [error, isError]);

  console.log("getTaskSubmissions", getTaskSubmissions);
  if (isLoading || isFetching) return <LoaderCircle />;
  return (
    <div>
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center mb-4"></div>

      <div
        className={`${
          width < breakpoints.md ? "space-x-rb" : ""
        } mb-4 md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
      >
        <Button
          icon="heroicons-outline:plus"
          text="Add Tasks"
          className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
          iconClass=" text-lg"
          onClick={() => dispatch(toggleAddCardModal(true))}
        />
      </div>
      {getTaskSubmissions && (
        <Card title={"Tasks"} noborder>
          <TaskSubmissionTable tasksData={getTaskSubmissions} />
        </Card>
      )}
      <AddTask />
      <EditTask />
    </div>
  );
}

export default TaskSubmissions;
