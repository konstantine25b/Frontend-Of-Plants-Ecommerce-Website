import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

interface BaseUser {
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
}

interface VendorUser extends BaseUser {
  role: string;
}

export class VendorClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });
  }

  public async createCustomer(
    customerData: VendorUser
  ): Promise<VendorUser | null> {
    try {
      const response: AxiosResponse<VendorUser> = await this.axiosInstance.post(
        "/api/user/customers/",
        customerData
      );
      return response.data;
    } catch (error: any) {
      this.handleRequestError(error);
      return null;
    }
  }

  private handleRequestError(error: AxiosError): void {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.error("Request failed with status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
    }
    throw new Error("Failed to create customer");
  }
}

// Instantiate CustomerClient
const baseUrl = "http://164.92.170.208";
export const clientVendors = new VendorClient(baseUrl);
