import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";

import App from "./App";
import User from "./components/User";
import Blog from "./components/Blog";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
);
