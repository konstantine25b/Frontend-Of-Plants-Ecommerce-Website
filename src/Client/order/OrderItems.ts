import axios, { AxiosResponse } from "axios";

export class OrderItemsClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async list(authToken: string) {
    const url = `${this.baseUrl}/api/order/items/`;
    try {
      const response: AxiosResponse = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch order items:', error);
      throw new Error('Failed to fetch order items');
    }
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
      console.error('Failed to create order item:', error);
      throw new Error('Failed to create order item');
    }
  }

  public async retrieve(orderId: number, authToken: string) {
    const url = `${this.baseUrl}/api/order/items/${orderId}/`;
    try {
      const response: AxiosResponse = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to retrieve order item:', error);
      throw new Error('Failed to retrieve order item');
    }
  }

  public async update(orderId: number, orderData: any, authToken: string) {
    const url = `${this.baseUrl}/api/order/items/${orderId}/`;
    try {
      const response: AxiosResponse = await axios.put(url, orderData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to update order item:', error);
      throw new Error('Failed to update order item');
    }
  }

  public async delete(orderId: number, authToken: string) {
    const url = `${this.baseUrl}/api/order/items/${orderId}/`;
    try {
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } catch (error) {
      console.error('Failed to delete order item:', error);
      throw new Error('Failed to delete order item');
    }
  }
}

const baseUrl = "http://164.92.170.208";
export const clientOrderItems = new OrderItemsClient(baseUrl);
