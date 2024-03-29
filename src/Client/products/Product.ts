import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image_url: string;
  size?: string;
  characteristics?: string;
  location?: string;
  plant_family?: string;
  water_care?: string;
  is_featured?: boolean;
  is_active?: boolean;
}

export class ProductClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string ) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });
  }

  public async listProducts(): Promise<ProductData[]> {
    let products: ProductData[] = [];
    let nextUrl: string | null = "/api/product/products";

    try {
      
        const response: AxiosResponse<{
          results: ProductData[];
          next: string | null;
        }> = await this.axiosInstance.get(nextUrl);
        products = [...products, ...response.data.results];
        nextUrl = response.data.next;
      
      return products;
    } catch (error: any) {
      this.handleRequestError(error);
      return [];
    }
  }

  private handleRequestError(error: AxiosError): void {
    if (error.response) {
      console.error("Request failed with status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
    throw new Error("Failed to fetch products");
  }
}

// Instantiate CustomerClient
const baseUrl = "http://164.92.170.208";
export const clientProduct = new ProductClient(baseUrl);
