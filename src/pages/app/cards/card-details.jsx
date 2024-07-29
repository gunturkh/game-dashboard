import React from "react";
import { useParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import CardsTable from "@/components/partials/Table/cards-table";
import { useGetCardsQuery } from "./cardApiSlice";
const CardDetailsPage = () => {
  const { id } = useParams();
  console.log("categories id", id);
  const { data: getCards } = useGetCardsQuery(id, {
    pollingInterval: 30000,
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  console.log("getCards", getCards);

  return (
    <div className=" space-y-5">
      <div className="grid grid-cols-12 gap-5"></div>
      <div className="grid grid-cols-12 gap-5">
        <div className="xl:col-span-12 lg:col-span-12 col-span-12">
          <Card title="Cards" noborder>
            <CardsTable cardsData={getCards} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsPage;
