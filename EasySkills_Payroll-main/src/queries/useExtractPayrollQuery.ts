import { useQuery } from "@tanstack/react-query";
import { getExtractPayrolls } from "../api/extract-payroll";

export const useExtractPayrollQuery = (month: string) => {
  const { data } = useQuery({
    queryKey: ["extract-payroll", month],
    queryFn: async () => {
      const extractPayrollRes = await getExtractPayrolls(month);
      return extractPayrollRes.data;
    },
  });

  return data;
};
