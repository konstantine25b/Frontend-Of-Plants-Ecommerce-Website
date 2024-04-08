import axios, { AxiosInstance, AxiosResponse } from "axios";

interface SubcategoryData {
  id: number;
  title: string;
  category: number; // Assuming category is identified by its ID
}

export class SubcategoryClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });
  }

  public async listSubcategories(
    categoryId?: number
  ): Promise<SubcategoryData[]> {
    try {
      const url = categoryId
        ? `/api/product/subcategories/?category=${categoryId}`
        : "/api/product/subcategories/";
      const response: AxiosResponse<SubcategoryData[]> =
        await this.axiosInstance.get(url);
      return response.data;
    } catch (error: any) {
      this.handleRequestError(error);
      return [];
    }
  }
  public async getSubcategory(
    subcategoryId: number
  ): Promise<SubcategoryData[]> {
    try {
      const url = `/api/product/subcategories/${subcategoryId}/`;
      const response: AxiosResponse<SubcategoryData[]> =
        await this.axiosInstance.get(url);
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
    throw new Error("Failed to fetch subcategories");
  }
}

// Example usage:
const baseUrl = "http://164.92.170.208";
export const subcategoryClient = new SubcategoryClient(baseUrl);
