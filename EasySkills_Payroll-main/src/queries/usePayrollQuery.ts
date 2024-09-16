import dayjs from "dayjs";
import { getPayrolls } from "../api/payrollService";
import { useQuery } from "@tanstack/react-query";
import { useDate, useFilters } from "../store/useSearchFilterStore";

export const usePayrollQuery = (page: number) => {
  const { perimeterAgencies, perimeterDynamic, resourceTypes } = useFilters();
  const date = useDate();
  const month = dayjs(date).format("YYYY-MM");

  const { data, isLoading } = useQuery({
    queryKey: ["payroll", month, perimeterAgencies, perimeterDynamic, resourceTypes, page],
    queryFn: async () => {
      const { data: payslips, total: totalItems } = await getPayrolls({
        isDetailedMode: false,
        maxResults: 30,
        month,
        page,
        order: "asc",
        saveSearch: true,
        excludeManager: false,
        perimeterAgencies: perimeterAgencies.map(Number) ?? [],
        perimeterDynamic,
        resourceStates: [],
        resourceTypes: resourceTypes.map(Number) ?? [],
        returnMoreData: undefined,
        viewMode: "list",
      });

      return { payslips, totalItems };
    },
  });

  return { data, isLoading };
};
