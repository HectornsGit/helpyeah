import "./App.css";

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTokenContext } from "./contexts/TokenContext";

import Header from "./components/Header/";
import Footer from "./components/Footer/";

import HomePage from "./pages/HomePage/";
import RegisterPage from "./pages/RegisterPage/";
import LoginPage from "./pages/LoginPage/";
import NotFoundPage from "./pages/NotFoundPage/";

import ProfilePage from "./pages/ProfilePage";

import EntryPage from "./pages/EntryPage";

import useGetEntries from "./hooks/useGetEntries";

function App() {
  const { entries, setEntries } = useGetEntries();
  const { token } = useTokenContext();
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage entries={entries} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/entries/:id" element={<EntryPage />} />
          <Route path="/users/:id" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <ToastContainer position="bottom-center" pauseOnHover theme="dark" />
      {token && <Footer entries={entries} setEntries={setEntries} />}
    </>
  );
}

export default App;
