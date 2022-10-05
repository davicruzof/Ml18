import { getMe } from "services/Auth/auth";
import React from "react";
import { useQuery } from "react-query";

const Home: React.FC = () => {
  const { data: userData, isLoading } = useQuery("getEnterprises", {
    queryFn: () => getMe(),
    enabled: true,
    keepPreviousData: false,
  });

  console.log(userData);

  return <div>kkkk</div>;
};

export default Home;
