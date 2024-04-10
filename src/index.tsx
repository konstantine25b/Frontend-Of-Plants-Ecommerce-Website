import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { Store } from "./Redux/Store";
import { Provider } from "react-redux";

// Create a new instance of QueryClient
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={Store}>
      
        <App />
      
    </Provider>
  </QueryClientProvider>
);
