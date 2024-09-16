import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSalaries, updateSalary } from "../api/salary";

export const SALARIES_QUERY_KEY = "salary";
export const useSalariesQuery = () => {
  const { data } = useQuery({
    queryKey: [SALARIES_QUERY_KEY],
    queryFn: getSalaries,
  });

  return data;
};

export const useUpdateSalaryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSalary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SALARIES_QUERY_KEY] });
    },
  });
};
