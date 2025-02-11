import React, { useState } from "react";
import "../App.css"
import api from "../axiosConfig"; // Change this line


const UploadForm = () => {
  const [file, setFile] = useState(null); // For file input
  const [imagePreview, setImagePreview] = useState(null); // For previewing the image
  const [result, setResult] = useState(null); // For API result
  const [loading, setLoading] = useState(false); // For loading state

  // Handle file change and create a preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile)); // Create URL for image preview
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setResult(null);
      const response = await api.post("/diagnosis/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error uploading the file", error);
      alert("Failed to classify the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">

        {/* Left Side: Upload Form */}
        <div className="col-md-6 flex items-center justify-center h-full">
          <div className="card1 p-4 w-full max-w-md">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fileUpload">Upload MRI Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="fileUpload"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-3"
                disabled={loading}
              >
                {loading ? "Processing..." : "Upload and Classify"}
              </button>
            </form>

            {/* Display result */}
            {result && (
              <div className="mt-4">
                <h3>Classification Result</h3>
                <p>
                  <strong>Image Path:</strong> {result.imagePath}
                </p>
                <p>
                  <strong>Predicted Label:</strong> {result.predictedLabel}
                </p>
                <p>
                  <strong>Confidence:</strong>{" "}
                  {(result.confidence * 100).toFixed(2)}%
                </p>
              </div>
            )}
          </div>
        </div>



        {/* Right Side: Image Preview */}
        <div className="col-md-4 d-flex align-items-center justify-content-center" style={{ marginTop: "200px"}}>
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Uploaded Preview"
              className="img-thumbnail"
              style={{ maxWidth: "100%", maxHeight: "300px", border: "1px solid #ccc", padding: "20px"}}
            />
          ) : (
            <p className="text-muted">No image uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
