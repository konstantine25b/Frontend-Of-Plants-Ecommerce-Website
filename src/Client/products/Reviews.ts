import axios, { AxiosInstance, AxiosResponse } from "axios";

interface ReviewData {
  id: number;
  product: number;
  user: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

export class ReviewClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });
  }

  public async listReviews(
    filters?: { [key: string]: string | number | boolean },
    pageNum: number = 1
  ): Promise<ReviewData[] | null> {
    if (pageNum == 1) {
      let url = "/api/review/reviews/";

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

        const response: AxiosResponse<ReviewData[]> =
          await this.axiosInstance.get(url);
        return response.data;
      } catch (error: any) {
        this.handleRequestError(error);
        return [];
      }
    } else {
      return null;
    }
  }

  public async getReview(reviewId: number): Promise<ReviewData | null> {
    const url = `api/review/reviews/${reviewId}/`;
    try {
      const response: AxiosResponse<ReviewData> = await this.axiosInstance.get(
        url
      );
      return response.data;
    } catch (error: any) {
      this.handleRequestError(error);
      return null;
    }
  }

  // Other methods for create, update, delete reviews can be added here

  private handleRequestError(error: any): void {
    if (error.response) {
      console.error("Request failed with status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
    throw new Error("Failed to fetch reviews");
  }
}

// Example usage:
const baseUrl = "http://164.92.170.208";
export const clientReview = new ReviewClient(baseUrl);
