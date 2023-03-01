import "./App.css";

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage/";
import NotFoundPage from "./pages/NotFoundPage/";
import ProfilePage from "./pages/ProfilePage";
import EntryPage from "./pages/EntryPage";

function App() {
  return (
    <>
      <main className="mainApp">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/entries/:id" element={<EntryPage />} />
          <Route path="/users/:id" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <ToastContainer position="bottom-center" pauseOnHover theme="dark" />
    </>
  );
}

export default App;
