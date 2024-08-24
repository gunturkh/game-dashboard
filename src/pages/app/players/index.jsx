import React from "react";
import { useGetPlayersQuery } from "./playersApiSlice";
import LoaderCircle from "@/components/Loader-circle";
import Card from "@/components/ui/Card";
import PlayersTable from "@/components/partials/Table/players-table";
import EditPlayer from "./EditPlayer";

function Players() {
  const {
    data: getPlayers,
    isLoading,
    isFetching,
    error,
    isError,
  } = useGetPlayersQuery(undefined, {
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  console.log("getPlayers", getPlayers);
  if (isLoading || isFetching) return <LoaderCircle />;
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-4"></div>

      {getPlayers && (
        <Card title={"Players"} noborder>
          {/* <LevelDetailTable levelsData={getLevels} /> */}
          <PlayersTable playersData={getPlayers} />
        </Card>
      )}
      <EditPlayer />
    </div>
  );
}

export default Players;
