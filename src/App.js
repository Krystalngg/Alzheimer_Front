import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UploadForm from "./components/UploadForm";

function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Alzheimer MRI Classification</h1>
      <UploadForm />
    </div>
  );
}

export default App;
