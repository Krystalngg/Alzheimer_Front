import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/Navbar";
import UploadForm from "./components/UploadForm";
import GalleryPage from "./components/GalleryPage";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./components/HomePage";
import AdminPage from "./components/AdminPage";
import ActivityLogPage from "./components/ActivityLogPage";
import "./App.css";

function App() {
    return (
        <Router>
            <AppNavbar />
            <div className="main-container">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <HomePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/upload"
                        element={
                            <ProtectedRoute>
                                <UploadForm />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/gallery"
                        element={
                            <ProtectedRoute>
                                <GalleryPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                        path="/admin" 
                        element={
                            <ProtectedRoute requiredRole="ADMIN">
                                <AdminPage />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/activity-logs" 
                        element={
                            <ProtectedRoute requiredRole="ADMIN">
                                <ActivityLogPage />
                            </ProtectedRoute>
                        } 
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;