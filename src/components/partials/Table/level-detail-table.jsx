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

const LevelDetailTable = ({ levelsData }) => {
  const navigate = useNavigate();

  const actions = [
    {
      name: "view",
      icon: "heroicons-outline:eye",
      doit: (item) => navigate(`/card/${item.id}`),
    },
    {
      name: "edit",
      icon: "heroicons:pencil-square",
    },
    {
      name: "delete",
      icon: "heroicons-outline:trash",
    },
  ];

  const COLUMNS = [
    {
      Header: "level",
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
      Header: "minimum score",
      accessor: "minimum_score",
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
  const data = useMemo(() => levelsData, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: data.length,
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

export default LevelDetailTable;
