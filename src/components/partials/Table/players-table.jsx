import React, { useState, useMemo, useCallback } from "react";
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
import debounce from "lodash/debounce";

const PlayersTable = ({ playersData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

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
  const data = useMemo(() => playersData, [playersData]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 50, // Adjust this value based on your needs
        sortBy: [{ id: "id", desc: true }],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    state: { pageIndex, pageSize },
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageOptions,
  } = tableInstance;

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value) => {
      setGlobalFilter(value || undefined);
    }, 300),
    []
  );

  // Handle search input changes
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <>
      <div className="p-2">
        {/* Search input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-3 py-2 text-sm text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          />
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps()}
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
                  {...getTableBodyProps()}
                >
                  {page?.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} key={row.id}>
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()} className="table-td py-2" key={cell.column.id}>
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value))
              }}
              className="ml-2 border rounded"
            >
              {[10, 20, 30, 40, 50, 100, 200].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="px-3 py-1 border rounded mr-1">
              {'<<'}
            </button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage} className="px-3 py-1 border rounded mr-1">
              {'<'}
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage} className="px-3 py-1 border rounded mr-1">
              {'>'}
            </button>
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="px-3 py-1 border rounded">
              {'>>'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayersTable;
