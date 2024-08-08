import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import CategoryList from "./CategoryList";
import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
import { toggleAddModal } from "./store";
import AddCategory from "./AddCategory";
import { ToastContainer } from "react-toastify";
import EditCategory from "./EditCategory";
import CategoryGrid from "./CategoryGrid";
import { useGetCardCategoriesQuery, useGetCardsQuery } from "./cardApiSlice";

const CardPostPage = () => {
  const [filler, setfiller] = useState("grid");
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);

  const { cards } = useSelector((state) => state.card);
  console.log("cards", cards);
  const dispatch = useDispatch();
  const {
    data: getCards,
    isLoading: cardsLoading,
    isFetching: cardsFetching,
  } = useGetCardsQuery(undefined, {
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const {
    data: getCardCategories,
    isLoading: cardCategoriesLoading,
    isFetching: cardCategoriesFetching,
  } = useGetCardCategoriesQuery(undefined, {
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  useEffect(() => {
    setIsLoaded(true);
    if (
      !(
        cardsFetching ||
        cardsLoading ||
        cardCategoriesFetching ||
        cardCategoriesLoading
      )
    )
      setIsLoaded(false);
  }, [
    filler,
    cardsFetching,
    cardsLoading,
    cardCategoriesFetching,
    cardCategoriesLoading,
  ]);

  // console.log("getCards", getCards);
  // console.log("getCardCategories", getCardCategories);
  // const sortedCardCategories = []
  //   .concat(getCardCategories)
  //   .sort((a, b) => a.id - b.id);
  return (
    <div>
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Card
        </h4>
        <div
          className={`${
            width < breakpoints.md ? "space-x-rb" : ""
          } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
        >
          <Button
            icon="heroicons:list-bullet"
            text="List view"
            disabled={isLoaded}
            className={`${
              filler === "list"
                ? "bg-slate-900 dark:bg-slate-700  text-white"
                : " bg-white dark:bg-slate-800 dark:text-slate-300"
            }   h-min text-sm font-normal`}
            iconClass=" text-lg"
            onClick={() => setfiller("list")}
          />
          <Button
            icon="heroicons-outline:view-grid"
            text="Grid view"
            disabled={isLoaded}
            className={`${
              filler === "grid"
                ? "bg-slate-900 dark:bg-slate-700 text-white"
                : " bg-white dark:bg-slate-800 dark:text-slate-300"
            }   h-min text-sm font-normal`}
            iconClass=" text-lg"
            onClick={() => setfiller("grid")}
          />
          {/* <Button
            icon="heroicons-outline:filter"
            text="On going"
            className="bg-white dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-900 hover:text-white btn-md  h-min text-sm font-normal"
            iconClass=" text-lg"
          /> */}
          <Button
            icon="heroicons-outline:plus"
            text="Add Category"
            className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
            iconClass=" text-lg"
            onClick={() => dispatch(toggleAddModal(true))}
          />
        </div>
      </div>
      {isLoaded && filler === "grid" && (
        <GridLoading count={getCardCategories?.length} />
      )}
      {isLoaded && filler === "list" && (
        <TableLoading count={getCardCategories?.length} />
      )}

      {filler === "grid" && !isLoaded && (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {getCardCategories?.map((card, cardIndex) => (
            <CategoryGrid card={card} key={cardIndex} />
          ))}
        </div>
      )}
      {filler === "list" && !isLoaded && (
        <div>
          <CategoryList cards={getCardCategories} />
        </div>
      )}
      <AddCategory />
      <EditCategory />
    </div>
  );
};

export default CardPostPage;
