import React, { useState, useMemo } from "react";
import { teamData } from "../../../constant/table-data";

import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import { Menu } from "@headlessui/react";

import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEditCardItem } from "@/pages/app/dailycombo/store";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
const DailyComboTable = ({ dailycomboDatas }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const actions = [
    {
      name: "view",
      icon: "heroicons-outline:eye",
      doit: (item) => navigate(`/dailycombo/${item.id}`),
    },
    {
      name: "edit",
      icon: "heroicons:pencil-square",
      doit: (item) => dispatch(setEditCardItem(item)),
    },
    // {
    //   name: "delete",
    //   icon: "heroicons-outline:trash",
    // },
  ];

  const COLUMNS = [
    {
      Header: "Combination",
      accessor: "combination",
      Cell: (row) => {
        console.log("row", row);
        return (
          <span className="flex items-center min-w-[500px] gap-2">
            {row?.cell?.value?.map((item, index) => (
              <div
                key={`${item?.name}-${index}`}
                className="h-full flex flex-1 items-center flex-col justify-center gap-2"
              >
                <div className="w-10 h-10 flex justify-center rounded-full flex-none">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <div className="flex flex-1 justify-center text-[9px] text-slate-600 dark:text-slate-300 capitalize">
                  {item?.name}
                </div>
              </div>
            ))}
          </span>
        );
      },
    },

    // {
    //   Header: "status",
    //   accessor: "is_published",
    //   Cell: (row) => {
    //     return (
    //       <span className="block min-w-[140px] text-left">
    //         <span className="inline-block text-center mx-auto py-1">
    //           {row?.cell?.value === false && (
    //             <span className="flex items-center space-x-3 rtl:space-x-reverse">
    //               <span className="h-[6px] w-[6px] bg-danger-500 rounded-full inline-block ring-4 ring-opacity-30 ring-danger-500"></span>
    //               <span>Not Published</span>
    //             </span>
    //           )}
    //           {row?.cell?.value === true && (
    //             <span className="flex items-center space-x-3 rtl:space-x-reverse">
    //               <span className="h-[6px] w-[6px] bg-success-500 rounded-full inline-block ring-4 ring-opacity-30 ring-success-500"></span>

    //               <span>Published</span>
    //             </span>
    //           )}
    //         </span>
    //       </span>
    //     );
    //   },
    // },
    {
      Header: "Date",
      accessor: "date",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Created At",
      accessor: "created_at_unix",
      sortingFn: "datetime",
      Cell: (row) => {
        return (
          <span>
            {dayjs.unix(row?.cell?.value).format("DD/MM/YYYY HH:mm:ss")}
          </span>
        );
      },
    },
    {
      Header: "Updated At",
      accessor: "updated_at_unix",
      sortingFn: "datetime",
      Cell: (row) => {
        return (
          <span>
            {dayjs.unix(row?.cell?.value).format("DD/MM/YYYY HH:mm:ss")}
          </span>
        );
      },
    },
    {
      Header: "action",
      accessor: "action",
      Cell: (row) => {
        return (
          <div className=" text-center">
            <div className="grid grid-cols-[100px_100px_100px] gap-2 divide-x divide-slate-100 dark:divide-slate-800">
              {actions.map((item, i) => (
                <div key={i} onClick={() => item.doit(row?.row?.original)}>
                  <div
                    className={`
                
                  ${
                    item.name === "delete"
                      ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
                      : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                  }
                   w-full border border-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
                   first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                  >
                    <span className="text-base">
                      <Icon icon={item.icon} />
                    </span>
                    <span>{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      },
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => dailycomboDatas, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: data?.length,
      },
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { pageIndex, pageSize } = state;

  return (
    <>
      <div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className=" bg-slate-100 dark:bg-slate-700">
                  {headerGroups?.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          scope="col"
                          className=" table-th "
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps}
                >
                  {page?.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          console.log("cell td", cell.row.values.date);
                          const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
                          const currentHour = dayjs().hour();
                          const currentMinute = dayjs().minute();
                          const currentSecond = dayjs().second();
                          const currentTime = dayjs(cell.row.values.date)
                            .add(currentHour, "hour")
                            .add(currentMinute, "minute")
                            .add(currentSecond, "second")
                            .format("YYYY-MM-DD HH:mm:ss");

                          const before = dayjs().isBefore(
                            dayjs(currentTime)
                              .startOf("d")
                              .add(18, "hour")
                              .format("YYYY-MM-DD HH:mm:ss")
                          );
                          const after = dayjs().isAfter(
                            dayjs(currentTime)
                              .subtract(1, "days")
                              .startOf("d")
                              .add(18, "hour")
                              .format("YYYY-MM-DD HH:mm:ss")
                          );
                          console.log(
                            cell.row.values.date,
                            "after value",
                            dayjs()
                              .subtract(1, "days")
                              .startOf("d")
                              .add(18, "hour")
                              .format("YYYY-MM-DD HH:mm:ss")
                          );
                          console.log({
                            before,
                            after,
                            current: currentTime,
                          });
                          // const before2 = dayjs(cell.row.values.date).isAfter(
                          //   dayjs(cell.row.values.date)
                          //     .subtract(1, "days")
                          //     .startOf("d")
                          //     .add(18, "hours")
                          //     .format("YYYY-MM-DD HH:mm:ss")
                          // );

                          // const current = dayjs(cell.row.values.date).isBetween(
                          //   dayjs(cell.row.values.date)
                          //     .subtract(1, "days")
                          //     .startOf("d")
                          //     .add(18, "hours"),
                          //   dayjs(cell.row.values.date)
                          //     .startOf("d")
                          //     .add(18, "hours")
                          //     .add(1, "days")
                          // );
                          // console.log("current", current, cell.row.values.date);
                          // console.log("before", before);
                          const setBackground = () => {
                            if (before && after) {
                              return "bg-green-200";
                            } else if (after) {
                              return "bg-red-200";
                            } else return "";
                          };
                          return (
                            <td
                              {...cell.getCellProps()}
                              className={`table-td py-2 ${setBackground()}`}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyComboTable;
