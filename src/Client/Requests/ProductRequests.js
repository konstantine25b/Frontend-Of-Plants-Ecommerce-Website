import { clientProduct } from "../products/Product";

export const fetchProduct = async (id) => {
  try {
    const response = await clientProduct.getProduct(id);
    return response;
  } catch (error) {
    throw new Error("Failed to fetch subcategory data");
  }
};

export const fetchSubcategoryData = async (
    id,
    sizeFilter = undefined,
    price__gte = undefined,
    price__lte = undefined,
    page = 1,
    dataInfo = [],
    prevPage = 1
  ) => {
    try {
      const response = await clientProduct.listProducts(
        {
          subcategory: id,
          size: sizeFilter,
          price__gte: price__gte,
          price__lte: price__lte,
        },
        page,
        dataInfo,
        prevPage
      );
      return response;
    } catch (error) {
      throw new Error("Failed to fetch subcategory data");
    }
  };


export const fetchSearchData = async (
  title = undefined,
  sizeFilter = undefined,
  price__gte = undefined,
  price__lte = undefined,
  page = 1,
  dataInfo = [],
  prevPage = 1
) => {
  try {
    const response = await clientProduct.listProducts(
      {
        title: title,
        size: sizeFilter,
        price__gte: price__gte,
        price__lte: price__lte,
      },
      page,
      dataInfo,
      prevPage
    );
    return response;
  } catch (error) {
    throw new Error("Failed to fetch subcategory data");
  }
};


export const fetchLastItemsData = async (
  quantity__lte=5,
  sizeFilter = undefined,
  price__gte = undefined,
  price__lte = undefined,
  page = 1,
  dataInfo = [],
  prevPage = 1
) => {
  try {
    const response = await clientProduct.listProducts(
      {
        quantity__lte: quantity__lte,
        size: sizeFilter,
        price__gte: price__gte,
        price__lte: price__lte,
      },
      page,
      dataInfo,
      prevPage
    );
    return response;
  } catch (error) {
    throw new Error("Failed to fetch subcategory data");
  }
};

export const fetchFeaturedData = async () => {
  try {
    const response = await clientProduct.listProducts({
      is_featured: true,
    });

    return response;
  } catch (error) {
    throw new Error("Failed to fetch subcategory data");
  }
};

export const fetchData = async (
  sizeFilter = undefined,
  price__gte = undefined,
  price__lte = undefined,
  page = 1,
  dataInfo = [],
  prevPage = 1
) => {
  try {
    const response = await clientProduct.listProducts(
      {
        size: sizeFilter,
        price__gte: price__gte,
        price__lte: price__lte,
      },
      page,
      dataInfo,
      prevPage
    );
    return response;
  } catch (error) {
    throw new Error("Failed to fetch subcategory data");
  }
};

export const fetchFeaturedDataPage = async (
  is_featured = true,
  sizeFilter = undefined,
  price__gte = undefined,
  price__lte = undefined,
  page = 1,
  dataInfo = [],
  prevPage = 1
) => {
  try {
    const response = await clientProduct.listProducts(
      {
        is_featured: is_featured,
        size: sizeFilter,
        price__gte: price__gte,
        price__lte: price__lte,
      },
      page,
      dataInfo,
      prevPage
    );
    return response;
  } catch (error) {
    throw new Error("Failed to fetch subcategory data");
  }
};