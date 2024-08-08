import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import CardsTable from "@/components/partials/Table/cards-table";
import { useGetCardsQuery } from "./cardApiSlice";
import LoaderCircle from "@/components/Loader-circle";
import useWidth from "@/hooks/useWidth";
import { toggleAddCardModal } from "./store";
import { useDispatch } from "react-redux";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const CategoryDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width, breakpoints } = useWidth();
  const { editCardModal } = useSelector((state) => state.card);
  console.log("categories id", id);
  const {
    data: getCards,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetCardsQuery(id, {
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  console.log("getCards", getCards, error);

  useEffect(() => {
    if (isError && error?.status === 401) {
      toast.error("Session expired, please relogin");
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [error]);
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
            {getCards && (
              <Card title="Cards" noborder>
                <CardsTable cardsData={getCards} />
              </Card>
            )}
          </div>
        </div>
      )}
      <AddCard />
      {editCardModal && <EditCard />}
    </div>
  );
};

export default CategoryDetailsPage;
