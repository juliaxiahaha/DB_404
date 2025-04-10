import "./styles.css";

import { HomePage } from "./HomePage/HomePage";
import { LoginPage } from "./LoginPage/LoginPage";
import Navbar from "./Navbar/Navbar";
import {BrowserRouter, Routes, Route} from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>

        </BrowserRouter>
    );
}

