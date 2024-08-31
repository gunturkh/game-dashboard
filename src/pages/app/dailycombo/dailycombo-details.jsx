import React from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import { useGetDailyComboByIdQuery } from "./dailycomboApiSlice";
import LoaderCircle from "@/components/Loader-circle";
import { useDispatch } from "react-redux";
import { formatAndRoundNumber } from "./utils";
const DailyComboDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log("card id", id);
  const {
    data: getDailyComboById,
    isLoading,
    isFetching,
  } = useGetDailyComboByIdQuery(id, {
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  console.log("daily combo by id query", getDailyComboById);

  return (
    <div className=" space-y-5">
      <div className="grid grid-cols-12 gap-5"></div>
      {isLoading || isFetching ? (
        <LoaderCircle />
      ) : (
        <div className="grid grid-cols-12 gap-5">
          <div className="xl:col-span-12 lg:col-span-12 col-span-12">
            <Card title="Daily Combo Detail" noborder>
              <header className="flex justify-between items-center">
                <div className="flex space-x-4 items-center rtl:space-x-reverse">
                  {getDailyComboById?.combination?.map((item) => {
                    return (
                      <div className="flex flex-col justify-center items-center">
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="object-cover w-10 h-10 rounded-full"
                        />
                        <div className="font-light text-base leading-6">
                          <div className="dark:text-slate-200 text-slate-900 max-w-[160px] truncate">
                            {item?.name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </header>

              <div className="flex flex-col gap-1 py-4">
                <div className="text-slate-600 dark:text-slate-400 text-sm">
                  Reward:{" "}
                  {formatAndRoundNumber(getDailyComboById?.reward_coins)}
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">
                  Date: {`${getDailyComboById?.date}`}
                </div>
              </div>
              <div className="flex space-x-4 rtl:space-x-reverse py-2">
                {/* created date */}
                <div>
                  <span className="block date-label">Created At</span>
                  <span className="block date-text">
                    {dayjs(getDailyComboById?.created_at_unix).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  </span>
                </div>
                {/* updated date */}
                <div>
                  <span className="block date-label">Updated At</span>
                  <span className="block date-text">
                    {dayjs(getDailyComboById?.updated_at_unix).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyComboDetailsPage;
