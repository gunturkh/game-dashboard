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
import { setEditPlayerItem } from "@/pages/app/players/store";

const PlayersTable = ({ playersData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const COLUMNS = [
    {
      Header: "ID",
      accessor: "id",
      Cell: (row) => {
        return (
          <span className="flex items-center min-w-[50px]">
            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
              {row?.cell?.value}
            </span>
          </span>
        );
      },
    },
    {
      Header: "User Name",
      accessor: "username",
      Cell: (row) => {
        console.log("row player", row);
        return (
          <span className="flex items-center min-w-[150px] cursor-pointer">
            <div
              onClick={() => {
                dispatch(setEditPlayerItem(row?.row?.original));
              }}
              className="font-bold text-sm text-blue-800 dark:text-blue-300 capitalize"
            >
              {`${row?.cell?.row?.original?.first_name} ${
                row?.cell?.row?.original?.last_name
              } ${row?.cell?.value ? `(${row?.cell?.value})` : ""}`}
            </div>
          </span>
        );
      },
    },
    {
      Header: "Points Balance",
      accessor: "points_balance",
      Cell: (row) => {
        return (
          <span className="flex items-center min-w-[150px]">
            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
              {row?.cell?.value}
            </span>
          </span>
        );
      },
    },
    {
      Header: "Points Total",
      accessor: "points_total",
      Cell: (row) => {
        return (
          <span className="flex items-center min-w-[150px]">
            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
              {row?.cell?.value}
            </span>
          </span>
        );
      },
    },
    {
      Header: "First Name",
      accessor: "first_name",
      Cell: (row) => {
        return (
          <span className="flex items-center min-w-[150px]">
            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
              {row?.cell?.value}
            </span>
          </span>
        );
      },
    },
    {
      Header: "Last Name",
      accessor: "last_name",
      Cell: (row) => {
        return (
          <span className="flex items-center min-w-[150px]">
            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
              {row?.cell?.value}
            </span>
          </span>
        );
      },
    },
    {
      Header: "Register Date",
      accessor: "created_at_unix",
      Cell: (row) => {
        return (
          <span className="flex items-center min-w-[150px]">
            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
              {dayjs.unix(row?.cell?.value).format("DD/MM/YYYY HH:mm:ss")}
              {/* {row?.cell?.value} */}
            </span>
          </span>
        );
      },
    },
    {
      Header: "Referee",
      accessor: "referee_id",
      Cell: (row) => {
        const data = row?.data?.filter((r) => r.id === row?.cell?.value)[0];
        return (
          <span className="flex items-center min-w-[150px]">
            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
              {`id: ${row?.cell?.value} - ${data?.first_name} ${
                data?.last_name
              } ${data?.username ? `(${data?.username})` : ""}`}
            </span>
          </span>
        );
      },
    },
    {
      Header: "Referral Code",
      accessor: "referral_code",
      Cell: (row) => {
        return (
          <span className="flex items-center min-w-[150px]">
            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
              {row?.cell?.value}
            </span>
          </span>
        );
      },
    },
    {
      Header: "Level",
      accessor: "level",
      Cell: (row) => {
        return (
          <span className="flex items-center min-w-[150px]">
            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
              {row?.cell?.value}
            </span>
          </span>
        );
      },
    },
    {
      Header: "Profit per Hour",
      accessor: "profit_per_hour",
      Cell: (row) => {
        return (
          <span className="flex items-center min-w-[150px]">
            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
              {row?.cell?.value}
            </span>
          </span>
        );
      },
    },
    {
      Header: "Spending Amount",
      accessor: "spending_amount",
      Cell: (row) => {
        return (
          <span className="flex items-center min-w-[150px]">
            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
              {row?.cell?.value}
            </span>
          </span>
        );
      },
    },
    {
      Header: "Cards Bought",
      accessor: "upgraded_card_cnt",
      Cell: (row) => {
        return (
          <span className="flex items-center min-w-[150px]">
            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
              {row?.cell?.value}
            </span>
          </span>
        );
      },
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => playersData, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: data?.length,
        sortBy: [{ id: "id", desc: true }],
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
      <div className="p-2">
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
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="table-td py-2"
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

export default PlayersTable;
