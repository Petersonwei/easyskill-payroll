import { useEffect, useMemo, useState } from "react";
import PayrollHeader from "../components/PayrollHeader";
import PayrollTable from "../components/PayrollTable";
import SearchBar from "../components/SearchBar";
import { usePayrollQuery } from "../queries/usePayrollQuery";
import Pagination from "../components/Pagination";
import { useDictionaryQuery } from "../queries/useDictionaryQuery";
import { useSetCurrencies } from "../store/useCurrenciesStore";
import { useSalariesQuery } from "../queries/useSalariesQuery";

const PayrollPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = usePayrollQuery(currentPage);
  const salaries = useSalariesQuery();
  const [searchKeyWords, setSearchKeyWords] = useState("");
  const dictionary = useDictionaryQuery();
  const setCurrencies = useSetCurrencies();

  useEffect(() => {
    if (dictionary?.currency) {
      setCurrencies(dictionary.currency);
    }
  }, [dictionary, setCurrencies]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyWords(event.target.value);
    setCurrentPage(1);
  };

  const filterPayslips = useMemo(() => {
    if (searchKeyWords.length >= 2) {
      return data?.payslips.filter((payslip) =>
        (payslip.firstName + payslip.lastName).replace(/\s+/g, "").toLowerCase().includes(searchKeyWords.toLowerCase()),
      );
    }
  }, [data?.payslips, searchKeyWords]);

  return (
    <div className="bg-[#242425] font-sans text-[rgba(255,255,255,0.8)]">
      <PayrollHeader
        isLoading={isLoading}
        payrollSum={filterPayslips ? filterPayslips.length : data?.totalItems ?? 0}
      />
      <SearchBar searchKeywords={searchKeyWords} onChange={handleSearch} handlePageReset={setCurrentPage} />
      <PayrollTable
        salaries={salaries ?? []}
        isLoading={isLoading}
        payslips={filterPayslips ?? data?.payslips ?? []}
        contractTypes={dictionary?.contracts ?? []}
        resetSearchKey={setSearchKeyWords}
      />
      <Pagination
        totalItems={filterPayslips ? filterPayslips.length : data?.totalItems ?? 0}
        currentPage={currentPage}
        itemsPerPage={30}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PayrollPage;
