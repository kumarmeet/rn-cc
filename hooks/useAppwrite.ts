import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useAppwrite = (fn: () => any) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();
      setData(response);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setIsLoading, setData]);

  const reFetch = async () => await fetchData();

  return {
    data,
    isLoading,
    reFetch,
  };
};
