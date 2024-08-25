import React from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import CardsTable from "@/components/partials/Table/cards-table";
import { useGetCardByIdQuery, useGetCardsQuery } from "./cardApiSlice";
import LoaderCircle from "@/components/Loader-circle";
import { useDispatch } from "react-redux";
import AddCard from "./AddCard";
import CardDetailTable from "@/components/partials/Table/card-detail-table";
const CardDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log("card id", id);
  const {
    data: getCardById,
    isLoading,
    isFetching,
  } = useGetCardByIdQuery(id, {
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  console.log("card by id query", getCardById);

  return (
    <div className=" space-y-5">
      <div className="grid grid-cols-12 gap-5"></div>
      {isLoading || isFetching ? (
        <LoaderCircle />
      ) : (
        <div className="grid grid-cols-12 gap-5">
          <div className="xl:col-span-12 lg:col-span-12 col-span-12">
            <Card title="Card Detail" noborder>
              <header className="flex justify-between items-center">
                <div className="flex space-x-4 items-center rtl:space-x-reverse">
                  <div className="flex-none">
                    <img
                      src={getCardById?.image}
                      alt={getCardById?.name}
                      className="object-cover w-20 h-20 rounded-full"
                    />
                  </div>
                  <div className="font-medium text-base leading-6">
                    <div className="dark:text-slate-200 text-slate-900 max-w-[160px] truncate">
                      {getCardById?.name}
                    </div>
                  </div>
                </div>
                <span className="block min-w-[140px] text-left">
                  <span className="inline-block text-center mx-auto py-1">
                    {getCardById?.is_active === false && (
                      <span className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="h-[6px] w-[6px] bg-danger-500 rounded-full inline-block ring-4 ring-opacity-30 ring-danger-500"></span>
                        <span>Inactive</span>
                      </span>
                    )}
                    {getCardById?.is_active == true && (
                      <span className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="h-[6px] w-[6px] bg-success-500 rounded-full inline-block ring-4 ring-opacity-30 ring-success-500"></span>

                        <span>Active</span>
                      </span>
                    )}
                  </span>
                </span>
              </header>

              <div className="flex flex-col gap-1 py-4">
                <div className="text-slate-600 dark:text-slate-400 text-sm">
                  Available for (hours): {getCardById?.available_duration}
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">
                  Status:{" "}
                  {`${
                    getCardById?.is_published ? "Published" : "Not Published"
                  }`}
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">
                  Requirements: {`${!getCardById?.condition ? "Empty" : ""}`}
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">
                  Description: {getCardById?.description}
                </div>
                {getCardById?.condition && (
                  <>
                    <div className="text-slate-600 dark:text-slate-400 text-sm">
                      {getCardById?.condition
                        ? `Card: ${getCardById?.condition?.name}`
                        : "null"}
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 text-sm">
                      {getCardById?.condition
                        ? `Level: ${getCardById?.condition?.level}`
                        : "null"}
                    </div>
                  </>
                )}
              </div>
              <div className="flex space-x-4 rtl:space-x-reverse py-2">
                {/* created date */}
                <div>
                  <span className="block date-label">Created At</span>
                  <span className="block date-text">
                    {dayjs(getCardById?.created_at).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  </span>
                </div>
                {/* updated date */}
                <div>
                  <span className="block date-label">Updated At</span>
                  <span className="block date-text">
                    {dayjs(getCardById?.updated_at).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  </span>
                </div>
              </div>
              <CardDetailTable cardData={getCardById.levels} />
            </Card>
          </div>
        </div>
      )}
      <AddCard />
    </div>
  );
};

export default CardDetailsPage;
