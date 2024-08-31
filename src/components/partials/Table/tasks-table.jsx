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
import { setEditCardItem } from "@/pages/app/tasks/store";

const TasksTable = ({ tasksData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const actions = [
    // {
    //   name: "view",
    //   icon: "heroicons-outline:eye",
    //   doit: (item) => navigate(`/card/${item.id}`),
    // },
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
      Header: "name",
      accessor: "name",
      Cell: (row) => {
        console.log("row", row);
        return (
          <span className="flex items-center min-w-[150px]">
            <span className="w-8 h-8 rounded-full ltr:mr-3 rtl:ml-3 flex-none">
              <img
                src={row?.data[row?.cell?.row?.index]?.image}
                alt={row?.cell?.value}
                className="object-cover w-full h-full rounded-full"
              />
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
              {row?.cell?.value}
            </span>
          </span>
        );
      },
    },

    {
      Header: "status",
      accessor: "is_published",
      Cell: (row) => {
        return (
          <span className="block min-w-[140px] text-left">
            <span className="inline-block text-center mx-auto py-1">
              {row?.cell?.value === false && (
                <span className="flex items-center space-x-3 rtl:space-x-reverse">
                  <span className="h-[6px] w-[6px] bg-danger-500 rounded-full inline-block ring-4 ring-opacity-30 ring-danger-500"></span>
                  <span>Not Published</span>
                </span>
              )}
              {row?.cell?.value === true && (
                <span className="flex items-center space-x-3 rtl:space-x-reverse">
                  <span className="h-[6px] w-[6px] bg-success-500 rounded-full inline-block ring-4 ring-opacity-30 ring-success-500"></span>

                  <span>Published</span>
                </span>
              )}
            </span>
          </span>
        );
      },
    },
    {
      Header: "Created At",
      accessor: "created_at_unix",
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
      Cell: (row) => {
        return (
          <span>
            {dayjs.unix(row?.cell?.value).format("DD/MM/YYYY HH:mm:ss")}
          </span>
        );
      },
    },
    {
      Header: "Type",
      accessor: "type",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Rewards",
      accessor: "reward_coins",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
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
  const data = useMemo(() => tasksData, []);

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

  if (tasksData.length === 0) return <p>Empty Task</p>;

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

export default TasksTable;
