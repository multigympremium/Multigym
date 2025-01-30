import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../UseAxioSecure";

function useInvoiceData({
  query = "",
  id = "",
  isShowAddTransaction = false,
  isShowEdit = false,
  isDeleteTransaction = false,
  isSubmit = false,
  slashQuery = "",
  isShowAddPackage = false,
  isShowEditMember = false,
  isDeleteInvoice = false,
  startDate,
}) {
  const [invoiceData, setInvoiceData] = useState([]);
  const [summary, setSummary] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const [method_summary, setMethod_summary] = useState([]);
  const [cumulativeBalance, setCumulativeBalance] = useState({});
console.log(summary);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosSecure.get(
          `/invoice${(slashQuery && "/" + slashQuery) || ""}${
            (id && "/" + id) || ""
          }${(query && "?" + query) || ""}`
        );

        if (res) {
          console.log("res 16561", res?.data, res?.data?.data);
          if (res?.data?.length > 0) {
            setInvoiceData(res?.data);
          } else if (
            res?.data?.data?.length === 0 ||
            res?.data?.data?.length > 0
          ) {
            setInvoiceData(res?.data?.data);
          }
          setSummary(res?.data?.summary);
          setReceivers(res?.data?.receivers);
          setMethod_summary(res?.data?.method_summary);
          setCumulativeBalance(res?.data?.cumulativeBalance);
        }

        // setCurrentPage(res?.data?.currentPage);
        // setTotalItems(res?.data?.totalItems);
      } catch (error) {
        console.error("res 16561", error);
      }
    }
    fetchData();
  }, [
    axiosSecure,
    id,
    query,
    isShowEdit,
    isShowAddTransaction,
    isDeleteTransaction,
    isSubmit,
    slashQuery,
    isShowAddPackage,
    isShowEditMember,
    isDeleteInvoice,
    startDate,
  ]);
  return {
    invoiceData,
    summary,
    receivers,
    method_summary,
    cumulativeBalance,
  };
}

export default useInvoiceData;
