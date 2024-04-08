import { clientOrder } from "../order/Order";

export const createOrder = async (userId, setMessage) => {
  try {
    const authToken = localStorage.getItem("accessToken");
    if (!authToken) {
      throw new Error("User not authenticated. Access token missing.");
    }

    const createdOrder = await clientOrder.createOrder(
      { customer: userId }, // Corrected key name to match the backend
      authToken
    );

    console.log("Order created successfully:", createdOrder);
    if (createdOrder) {
      setMessage({ text: "Order created successfully.", success: true });
      // Optionally, you can redirect the user or display a success message
      // navigate("/MyOrders"); // Redirect to MyOrders page
    } else {
      setMessage({
        text: "Failed to create order. Please try again.",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error creating order:", error.message);
    setMessage({
      text: "Failed to create order. Please try again.",
      success: false,
    });
    // Handle error appropriately, such as displaying an error message to the user
  }
};

export const fetchOrders = async () => {
  try {
    const authToken = localStorage.getItem("accessToken");
    if (!authToken) {
      throw new Error("User not authenticated. Access token missing.");
    }

    const fetchedOrders = await clientOrder.listOrders(authToken);
    return fetchedOrders;
  } catch (error) {
    throw new Error("Failed to fetch product and reviews");
  }
};

export const deleteOrder = async (order, navigate) => {
  try {
    const authToken = localStorage.getItem("accessToken");
    if (!authToken) {
      throw new Error("User not authenticated. Access token missing.");
    }

    await clientOrder.deleteOrder(order.id, authToken);

    navigate("/MyOrders");

    // Optionally, you can update the UI to reflect the deleted order
    window.alert("Order deleted successfully!"); // Display alert after successful deletion
  } catch (error) {
    console.error("Error deleting order:", error.message);
    // Handle error appropriately, such as displaying an error message to the user
  }
};

export  const deleteOrderForOrderPage = async (order, refetch) => {
    try {
      const authToken = localStorage.getItem("accessToken");
      if (!authToken) {
        throw new Error("User not authenticated. Access token missing.");
      }

      await clientOrder.deleteOrder(order.id, authToken);
      refetch();
      // Optionally, you can update the UI to reflect the deleted order
      window.alert("Order deleted successfully!"); // Display alert after successful deletion
    } catch (error) {
      console.error("Error deleting order:", error.message);
      // Handle error appropriately, such as displaying an error message to the user
    }
  };
