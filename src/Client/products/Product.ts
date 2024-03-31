import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

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
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
}

export class ProductClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });
  }

  public async listProducts(
    filters?: ProductFilters
  ): Promise<{ results: ProductData[]; next: string | null }> {
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
const baseUrl = "http://164.92.170.208";
export const clientProduct = new ProductClient(baseUrl);
