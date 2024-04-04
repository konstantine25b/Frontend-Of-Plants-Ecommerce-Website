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

    public async listReviews(): Promise<ReviewData[]> {
        try {
            const response: AxiosResponse<ReviewData[]> = await this.axiosInstance.get("/api/reviews/");
            return response.data;
        } catch (error: any) {
            this.handleRequestError(error);
            return [];
        }
    }

    public async getReview(reviewId: number): Promise<ReviewData | null> {
        try {
            const response: AxiosResponse<ReviewData> = await this.axiosInstance.get(`/api/reviews/${reviewId}/`);
            return response.data;
        } catch (error: any) {
            this.handleRequestError(error);
            return null;
        }
    }

    // Other methods for create, update, delete reviews can be added here

    private handleRequestError(error: any): void {
        if (error.response) {
            console.error('Request failed with status:', error.response.status);
            console.error('Response data:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up the request:', error.message);
        }
        throw new Error('Failed to fetch reviews');
    }
}

// Example usage:
const baseUrl = "http://164.92.170.208";
export const reviewClient = new ReviewClient(baseUrl);
