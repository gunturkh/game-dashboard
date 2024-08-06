import React from "react";
import { useParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import CardsTable from "@/components/partials/Table/cards-table";
import { useGetCardsQuery } from "./cardApiSlice";
import LoaderCircle from "@/components/Loader-circle";
import useWidth from "@/hooks/useWidth";
import { toggleAddCardModal } from "./store";
import { useDispatch } from "react-redux";
import AddCard from "./AddCard";
const CategoryDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { width, breakpoints } = useWidth();
  console.log("categories id", id);
  const {
    data: getCards,
    isLoading,
    isFetching,
  } = useGetCardsQuery(id, {
    pollingInterval: 30000,
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  console.log("getCards", getCards);

  return (
    <div className=" space-y-5">
      <div className="grid grid-cols-12 gap-5"></div>
      {isLoading || isFetching ? (
        <LoaderCircle />
      ) : (
        <div className="grid grid-cols-12 gap-5">
          <div className="xl:col-span-12 lg:col-span-12 col-span-12">
            <div
              className={`${
                width < breakpoints.md ? "space-x-rb" : ""
              } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse my-4`}
            >
              <Button
                icon="heroicons-outline:plus"
                text="Add Card"
                className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                iconClass=" text-lg"
                onClick={() => dispatch(toggleAddCardModal(true))}
              />
            </div>
            <Card title="Cards" noborder>
              <CardsTable cardsData={getCards} />
            </Card>
          </div>
        </div>
      )}
      <AddCard />
    </div>
  );
};

export default CategoryDetailsPage;
