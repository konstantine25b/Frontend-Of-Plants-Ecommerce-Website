import { clientCategory } from "../products/Categories";

export const fetchCategories = async () => {
  try {
    const categories = await clientCategory.listCategories();

    return categories;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};