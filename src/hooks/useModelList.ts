import useSWR from "swr";
import { listLocalModels } from "@/services/api";

const fetchLocalModels = async () => {
  const response = await listLocalModels();
  return response.models;
};

export const useModelList = () => {
  const {
    data: modelList,
    error: modelListError,
    mutate: refetchModelList,
  } = useSWR("localModels", fetchLocalModels);

  return { modelList, modelListError, refetchModelList };
};
