import { useQuery } from "react-query";
import LowerNav from "./LowerNav";
import UpperNavBar from "./UpperNav";
import { clientCategory } from "../../../Client/products/Categories";

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
  } = useQuery("categories", fetchCategories, {
    keepPreviousData: true,
    staleTime: 1000 * 5, // 5 secs
    // Handle error
    onError: (error) => {
      console.error("Error fetching confirmed orders:", error);
    },
  });

  
  return (
    <>
      <UpperNavBar />
      <LowerNav
        categories={categories?.results}
      />
    </>
  );
};

export default NavBar;
