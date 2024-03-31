import { useQuery } from "react-query";
import LowerNav from "./LowerNav/LowerNav";
import UpperNavBar from "./UpperNav/UpperNav";
import { clientCategory } from "../../../Client/products/Categories";
import { subcategoryClient } from "../../../Client/products/SubCategories";

const fetchCategories = async () => {
  try {
    const categories = await clientCategory.listCategories();

    return categories;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};

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
      <UpperNavBar />
      <LowerNav categories={categories?.results} />
    </>
  );
};

export default NavBar;
