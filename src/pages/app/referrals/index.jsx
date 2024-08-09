import React, { useEffect } from "react";
import { useGetReferralsQuery } from "./referralApiSlice";
import LoaderCircle from "@/components/Loader-circle";
import { useNavigate } from "react-router-dom";
import useWidth from "@/hooks/useWidth";
import { useDispatch } from "react-redux";
import LevelDetailTable from "@/components/partials/Table/level-detail-table";
import { Tree } from "react-arborist";
import Card from "@/components/ui/Card";

export const data = [
  { id: "1", name: "Unread" },
  { id: "2", name: "Threads" },
  {
    id: "3",
    name: "Chat Rooms",
    children: [
      {
        id: "c1",
        name: "General",
        children: [
          { id: "cg1", name: "Random" },
          { id: "cg2", name: "Open Source Projects" },
        ],
      },
      { id: "c2", name: "Random" },
      { id: "c3", name: "Open Source Projects" },
    ],
  },
  {
    id: "4",
    name: "Direct Messages",
    children: [
      { id: "d1", name: "Alice" },
      { id: "d2", name: "Bob" },
      { id: "d3", name: "Charlie" },
    ],
  },
];

function Node({ node, style, dragHandle }) {
  /* This node instance can do many things. See the API reference. */
  return (
    <div
      style={style}
      ref={dragHandle}
      onClick={() => {
        console.log("node", node);
        node.toggle();
      }}
    >
      {node.children.length > 0 ? "👥" : "👤"}{" "}
      {`${node.data.username} ${
        node.children.length > 0 ? `: (${node.children.length})` : ""
      } `}
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

      <Card title={"Referrals"} noborder>
        <Tree
          initialData={getReferrals}
          openByDefault={false}
          /* An accessor can provide a string property name */
          idAccessor="username"
          /* or a function with the data as the argument */
          childrenAccessor={(d) => d.referral}
          // width={600}
          // height={1000}
          indent={24}
          rowHeight={36}
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
