import { clientOrderItems } from "../order/OrderItems";

export const createOrderItems = async (data, userId) => {
  try {
    const authToken = localStorage.getItem("accessToken");
    if (!authToken) {
      throw new Error("User not authenticated. Access token missing.");
    }
    const orderItemData = {
      order: data.orderId, // Replace orderId with the actual order ID
      product: data.productId, // Replace productId with the actual product ID
      quantity: data.quantity,
      customer: userId,
    };
    console.log(orderItemData, authToken);

    const createdOrderItem = await clientOrderItems.create(
      orderItemData, // Corrected key name to match the backend
      authToken
    );

    console.log("Order Item created successfully:", createdOrderItem);
  } catch (error) {
    console.error("Error creating order:", error.message);
  }
};

export const fetchOrderItemsByOrderId = async (orderId) => {
  try {
    const authToken = localStorage.getItem("accessToken");
    if (!authToken) {
      throw new Error("User not authenticated. Access token missing.");
    }
   
    const fetchedOrderItems = await clientOrderItems.retrieveByOrderId(orderId,authToken);
   
    return fetchedOrderItems;
  } catch (error) {
    console.error("Error creating order:", error.message);
  }
};
