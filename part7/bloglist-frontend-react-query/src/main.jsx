import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import store from "./store";
import { NotificationContextProvider } from "./NotificationContext";
import { UserContextProvider } from "./UserContext";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <NotificationContextProvider>
        <Provider store={store}>
          <App />    
        </Provider>    
      </NotificationContextProvider>    
    </UserContextProvider>    
  </QueryClientProvider>
);
