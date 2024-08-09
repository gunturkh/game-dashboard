import React, { useEffect } from "react";
import { useGetReferralsQuery } from "./referralApiSlice";
import LoaderCircle from "@/components/Loader-circle";
import { useNavigate } from "react-router-dom";
import useWidth from "@/hooks/useWidth";
import { useDispatch } from "react-redux";
import LevelDetailTable from "@/components/partials/Table/level-detail-table";
import { Tree } from "react-arborist";
import Card from "@/components/ui/Card";
import { Icon } from "@iconify/react";

function Node({ node, style, dragHandle }) {
  /* This node instance can do many things. See the API reference. */
  return (
    <div style={style} ref={dragHandle} onClick={() => node.toggle()}>
      <div className="flex items-center gap-1 border-b border-neutral-200">
        {node.isOpen && node.children.length > 0 ? (
          <Icon icon="heroicons:arrow-down-solid"/>
        ) : node.children.length > 0 ? (
          <Icon icon="heroicons:arrow-right-solid" />
        ) : null}
        {node.children.length > 0 ? (
          <Icon icon="heroicons:user-group-solid" />
        ) : (
          <Icon icon="heroicons:user-solid" />
        )}{" "}
        <span className="font-semibold">{node.data.username}</span>
        {node.children.length > 0 && (
          <span className="font-semibold text-green-400">
            {" "}
            + {node.children.length}
          </span>
        )}
      </div>
    </div>
  );
}

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

      <Card title={"Referrals"} noborder bodyClass="px-6 py-1">
        <Tree
          initialData={getReferrals}
          openByDefault={false}
          /* An accessor can provide a string property name */
          idAccessor="username"
          /* or a function with the data as the argument */
          childrenAccessor={(d) => d.referral}
          width={"100%"}
          height={1000}
          indent={24}
          rowHeight={30}
          paddingTop={10}
          paddingBottom={10}
          padding={25 /* sets both */}
        >
          {Node}
        </Tree>
        {/* <LevelDetailTable levelsData={getLevels} /> */}
      </Card>
    </div>
  );
}

export default Referrals;
