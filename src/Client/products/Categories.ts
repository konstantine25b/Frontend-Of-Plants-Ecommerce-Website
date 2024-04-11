import axios, { AxiosInstance, AxiosResponse } from "axios";
import { baseUrl } from "../BaseUrl";

interface CategoryData {
  title: string;
  description: string;
}

export class CategoryClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });
  }

  public async listCategories(): Promise<CategoryData[]> {
    try {
      const response: AxiosResponse<CategoryData[]> =
        await this.axiosInstance.get("/api/product/categories/");
      return response.data;
    } catch (error: any) {
      this.handleRequestError(error);
      return [];
    }
  }

  private handleRequestError(error: any): void {
    if (error.response) {
      console.error("Request failed with status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
    throw new Error("Failed to fetch categories");
  }
}

// Instantiate CustomerClient

export const clientCategory = new CategoryClient(baseUrl);
