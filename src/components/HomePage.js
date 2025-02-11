import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2 text-center">
                    <h1 className="display-4 mb-4">Alzheimer MRI Classification</h1>
                    
                    <div className="card mb-4">
                        <div className="card-body">
                            <h2 className="card-title">Welcome to Alzheimer Detection Assistant</h2>
                            <p className="card-text">
                                Our AI-powered application helps healthcare professionals 
                                classify MRI brain scans to detect potential Alzheimer's disease 
                                with high accuracy.
                            </p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h3 className="card-title">Upload MRI</h3>
                                    <p className="card-text">
                                        Upload a brain MRI scan and get instant classification 
                                        results with confidence score.
                                    </p>
                                    <Link to="/upload" className="btn btn-primary">
                                        Upload Image
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h3 className="card-title">View Gallery</h3>
                                    <p className="card-text">
                                        Browse through previously uploaded and classified 
                                        MRI scans in your personal gallery.
                                    </p>
                                    <Link to="/gallery" className="btn btn-secondary">
                                        View Gallery
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h3 className="card-title">How It Works</h3>
                                    <p className="card-text">
                                        Our machine learning model analyzes brain MRI scans 
                                        to detect potential signs of Alzheimer's disease.
                                    </p>
                                    <Button variant="info" onClick={handleShow}>
                                        Learn More
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* How It Works Modal using React Bootstrap */}
                    <Modal show={showModal} onHide={handleClose} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>How Our Alzheimer Detection Works</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="text-start">
                            <h6>AI-Powered MRI Classification</h6>
                            <ol>
                                <li>Upload a high-quality brain MRI scan</li>
                                <li>Our AI model processes the image</li>
                                <li>Instant classification result with confidence score</li>
                                <li>Save and track your diagnostic history</li>
                            </ol>
                            <p>
                                <strong>Note:</strong> This tool is designed to assist medical professionals 
                                and should not replace professional medical diagnosis.
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default HomePage;