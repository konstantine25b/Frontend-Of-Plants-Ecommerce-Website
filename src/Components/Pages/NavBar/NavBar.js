import { useQuery } from "react-query";
import LowerNav from "./LowerNav/LowerNav";
import UpperNavBar from "./UpperNav/UpperNav";
import { clientCategory } from "../../../Client/products/Categories";
import { fetchCategories } from "../../../Client/Requests/CategoriesRequests";



const NavBar = () => {
  const {
    data: categories,
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery("categories", fetchCategories, {
    keepPreviousData: true,
    staleTime: 1000 * 5, // 5 secs
    // Handle error
    onError: (error) => {
      console.error("Error fetching confirmed orders:", error);
    },
  });

  if (isLoading) {
    return <div></div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <UpperNavBar categories={categories?.results}/>
      <LowerNav categories={categories?.results} />
    </>
  );
};

export default NavBar;
