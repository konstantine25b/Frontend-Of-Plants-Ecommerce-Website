import axios, { AxiosInstance, AxiosResponse } from "axios";

interface OrderData {
  id: number;
  customer: number;
  created_at: string;
  updated_at: string;
}

interface CreateOrderData {
  customer: number;
}

export class OrderClient {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });
  }

  public async listOrders(
    authToken: string // Pass the authentication token as a parameter
  ): Promise<OrderData[] | null> {
    const url = "/api/order/orders/";
    try {
      const response: AxiosResponse<OrderData[]> = await this.axiosInstance.get(
        url,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the authentication token in the request headers
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch orders:", error);
      return null;
    }
  }

  public async createOrder(
    orderData: CreateOrderData,
    authToken: string // Pass the authentication token as a parameter
  ): Promise<OrderData | null> {
    const url = "/api/order/orders/";
    try {
      const response: AxiosResponse<OrderData> = await this.axiosInstance.post(
        url,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the authentication token in the request headers
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Failed to create order:", error);
      return null;
    }
  }

  public async deleteOrder(
    orderId: number,
    authToken: string // Pass the authentication token as a parameter
  ): Promise<void> {
    const url = `/api/order/orders/${orderId}/`;
    try {
      await this.axiosInstance.delete(url, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include the authentication token in the request headers
        },
      });
    } catch (error: any) {
      console.error("Failed to delete order:", error);
      throw new Error("Failed to delete order");
    }
  }

  public async getOrder(
    orderId: number,
    authToken: string // Pass the authentication token as a parameter
  ): Promise<OrderData | null> {
    const url = `/api/order/orders/${orderId}/`;
    try {
      const response: AxiosResponse<OrderData> = await this.axiosInstance.get(
        url,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the authentication token in the request headers
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(`Failed to fetch order with ID ${orderId}:`, error);
      return null;
    }
  }
}

// Example usage:
const baseUrl = "http://164.92.170.208";
export const clientOrder = new OrderClient(baseUrl);
