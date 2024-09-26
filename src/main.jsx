import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from "./components/redux/store/store.js";
import { Provider } from "react-redux";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


import App from "./App.jsx";
import "./index.css";


const client = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store} >
      <QueryClientProvider client={client}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
