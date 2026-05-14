import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Login } from "./pages/Login";
import { Clients } from "./pages/Clients";
import { Contacts } from "./pages/Contacts";
import { Reports } from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/clients"
          element={<Clients />}
        />

        <Route
          path="/contacts"
          element={<Contacts />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;