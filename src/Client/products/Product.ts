import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import { baseUrl } from "../BaseUrl";

interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image_url: string;
  size?: string;
  is_featured?: boolean;
  is_active?: boolean;
}

interface ProductFilters {
  title?: string;
  subcategory?: string;
  price__gte?: number;
  price__lte?: number;
  is_featured?: boolean;
  is_active?: boolean;
  size?: string;
}

export class ProductClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });
  }

  public async listProducts(
    filters?: ProductFilters,
    pageNum: number = 1,
    dataInfo?: {
      previous: string | null;
      results: ProductData[];
      next: string | null;
      count: number;
    },
    prevPage: number = 1
  ): Promise<{ results: ProductData[]; next: string | null }> {
    if (dataInfo && pageNum != 1) {
      try {
        let result: { results: ProductData[]; next: string | null } = {
          results: [],
          next: null,
        };
        if (pageNum > prevPage) {
          let updatedNextUrl: string | null = dataInfo.next;
          for (let i = prevPage; i < pageNum; i++) {
            const response: AxiosResponse<{
              results: ProductData[];
              next: string | null;
            }> = await this.axiosInstance.get(updatedNextUrl!); // Add the non-null assertion operator here
            result = response.data;
            updatedNextUrl = response.data.next;
            if (!updatedNextUrl) {
              break; // Exit the loop if there are no more pages
            }
          }
        } else {
          let updatedPrevUrl: string | null = dataInfo.previous;
          for (let i = pageNum; i < prevPage; i++) {
            const response: AxiosResponse<{
              results: ProductData[];
              next: string | null;
              previous: string | null;
              count: number;
            }> = await this.axiosInstance.get(updatedPrevUrl!); // Add the non-null assertion operator here
            result = response.data;
            updatedPrevUrl = response.data.previous;
            if (!updatedPrevUrl) {
              break; // Exit the loop if there are no more pages
            }
          }
        }

        return result; // Return the entire data object from the response
      } catch (error: any) {
        this.handleRequestError(error);
        return { results: [], next: dataInfo.next }; // Return an empty object in case of error
      }
    } else {
      let url: string = "/api/product/products/";

      try {
        // Append filters as query parameters if they exist
        if (filters) {
          const queryParams = new URLSearchParams();

          // Iterate through each filter and append them to the query parameters
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              queryParams.append(key, String(value)); // Convert value to string
            }
          });

          // Append the constructed query parameters to the URL

          url += `?${queryParams.toString()}`;
        }

        const response: AxiosResponse<{
          results: ProductData[];
          next: string | null;
        }> = await this.axiosInstance.get(url);

        return response.data; // Return the entire data object from the response
      } catch (error: any) {
        this.handleRequestError(error);
        return { results: [], next: null }; // Return an empty object in case of error
      }
    }
  }

  public async getProduct(productId: number): Promise<ProductData | null> {
    const url = `/api/product/products/${productId}/`;

    try {
      const response: AxiosResponse<ProductData> = await this.axiosInstance.get(
        url
      );

      return response.data;
    } catch (error: any) {
      this.handleRequestError(error);
      return null;
    }
  }

  private handleRequestError(error: AxiosError): void {
    if (axios.isAxiosError(error)) {
      // AxiosError has a response property for errors returned by the server
      if (error.response) {
        console.error("Request failed with status:", error.response.status);
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        // AxiosError also has a request property for errors related to making the request
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw new Error("Failed to fetch products");
  }
}

// Instantiate ProductClient

export const clientProduct = new ProductClient(baseUrl);
