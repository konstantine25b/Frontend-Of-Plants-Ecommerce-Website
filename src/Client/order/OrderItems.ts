import axios, { AxiosResponse } from "axios";
import { baseUrl } from "../BaseUrl";

export class OrderItemsClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async create(orderData: any, authToken: string) {
    const url = `${this.baseUrl}/api/order/order-items/`;
    try {
      const response: AxiosResponse = await axios.post(url, orderData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to create order item:", error);
      throw new Error("Failed to create order item");
    }
  }

  public async retrieve(orderItemId: number, authToken: string) {
    const url = `${this.baseUrl}/api/order/order-items/${orderItemId}/`;
    try {
      const response: AxiosResponse = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to retrieve order item:", error);
      throw new Error("Failed to retrieve order item");
    }
  }
  public async retrieveByOrderId(orderId: number, authToken: string) {
    const url = `${this.baseUrl}/api/order/order-items/?order=${orderId}`;
    try {
      const response: AxiosResponse = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to retrieve order item:", error);
      throw new Error("Failed to retrieve order item");
    }
  }
}


export const clientOrderItems = new OrderItemsClient(baseUrl);
