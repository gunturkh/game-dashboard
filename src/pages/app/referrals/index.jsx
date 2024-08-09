import React, { useEffect } from "react";
import { useGetReferralsQuery } from "./referralApiSlice";
import LoaderCircle from "@/components/Loader-circle";
import { useNavigate } from "react-router-dom";
import useWidth from "@/hooks/useWidth";
import { useDispatch } from "react-redux";
import LevelDetailTable from "@/components/partials/Table/level-detail-table";
import Card from "@/components/ui/Card";

function Referrals() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width, breakpoints } = useWidth();
  const {
    data: getReferrals,
    isLoading,
    isFetching,
    error,
    isError,
  } = useGetReferralsQuery(undefined, {
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  useEffect(() => {
    console.log("error", error);
    console.log("isError", isError);
    if (isError && error?.status === 401) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [error, isError]);

  console.log("getReferrals", getReferrals);
  if (isLoading || isFetching) return <LoaderCircle />;
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-4"></div>

      <Card title={"Referrals"} noborder>
        {/* <LevelDetailTable levelsData={getLevels} /> */}
      </Card>
    </div>
  );
}

export default Referrals;
