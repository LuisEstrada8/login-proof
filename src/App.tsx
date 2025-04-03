import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import LoginPage from "./pages/Login";
import { PrivateRoute } from "./components/private-route";

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
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
