import { useQuery } from "@tanstack/react-query";
import { getDictionary } from "../api/dictionary";

export const useDictionaryQuery = () => {
  const { data } = useQuery({
    queryKey: ["dictionary"],
    queryFn: async () => {
      const dictionaryRes = await getDictionary();
      return dictionaryRes.data;
    },
  });

  return data;
};
