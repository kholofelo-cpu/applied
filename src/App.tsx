import { Routes, Route } from "react-router";
import { ApplicationsPage } from "./pages/ApplicationsPage";
import { NewApplicationPage } from "./pages/NewApplicationPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<ApplicationsPage />} />
        <Route path="/new" element={<NewApplicationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
