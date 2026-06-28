import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Billing from "./pages/Billing";
import History from "./pages/History";
import InvoicePage from "./pages/InvoicePage";

import ProtectedRoute from "./components/ProtectedRoute";
import Reports from "./pages/Reports";

function RoutesFile() {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <Navigate to="/login" />
        }
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/billing"
        element={
          <ProtectedRoute>
            <Billing />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />

      {/* Invoice Route */}
      <Route
        path="/invoice/:id"
        element={<InvoicePage />}
      />

    </Routes>
    
  );
}

export default RoutesFile;