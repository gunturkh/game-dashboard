import React from "react";
import { useParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import CardsTable from "@/components/partials/Table/cards-table";
const CardDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className=" space-y-5">
      <div className="grid grid-cols-12 gap-5">
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="xl:col-span-12 lg:col-span-12 col-span-12">
          <Card title="Cards" noborder>
            <CardsTable />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsPage;
