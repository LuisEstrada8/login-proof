import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import LoginPage from "./pages/Login";
import { PrivateRoute } from "./components/private-route";
import { Counter } from "./pages/Counter";

export default function App() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/counter"
        element={
          <PrivateRoute>
            <Counter />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
