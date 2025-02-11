import React, { useEffect, useState } from "react";
import api from "../axiosConfig";

const GalleryPage = () => {
    const [images, setImages] = useState([]);
    const role = localStorage.getItem("role"); // Lấy role của user từ localStorage

    // Fetch images
    const fetchImages = () => {
        api.get("/diagnosis/all")
            .then(response => {
                setImages(response.data);
            })
            .catch(error => {
                console.error("Error fetching images:", error);
            });
    };

    // Load images on component mount
    useEffect(() => {
        fetchImages();
    }, []);

    // Xử lý xóa ảnh
    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa ảnh này?")) {
            api.delete(`/diagnosis/${id}`)
                .then(() => fetchImages()) // Reload danh sách ảnh
                .catch(error => {
                    if (error.response?.status === 403) {
                        alert("Bạn không có quyền xóa ảnh này.");
                    } else {
                        alert("Không thể xóa ảnh. Vui lòng thử lại.");
                    }
                });
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Saved MRI Images</h2>
            <div className="row">
                {images.map((item) => (
                    <div key={item.id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <img
                                src={`http://localhost:8080/api/diagnosis/images/${item.imagePath}`}
                                alt={`Diagnosis ${item.id}`}
                                className="card-img-top"
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{item.predictedLabel}</h5>
                                <p className="card-text">
                                    <strong>Confidence:</strong> {(item.confidence * 100).toFixed(2)}%
                                </p>
                                <p className="card-text">
                                    <small className="text-muted">
                                        Created: {new Date(item.createdAt).toLocaleString()}
                                    </small>
                                </p>
                            </div>
                            <div className="card-footer">
                                {role === "ADMIN" && ( // Chỉ Admin mới thấy nút Xóa
                                    <button className="btn btn-danger w-100" onClick={() => handleDelete(item.id)}>
                                        Remove
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryPage;
