import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Services.css";
import Loader from "../../Loaders/Loader";
import { useAuth } from "../../Context/AuthContextProvider";

const Services = () => {
    const { isAuthenticated } = useAuth();
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({
        title: "",
        description: "",
        image: null,
    });
    const [editingService, setEditingService] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/services/"
                );
                setServices(response.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError("Error fetching services. Please try again later.");
                console.error("Error fetching services:", err);
            }
        };
        fetchServices();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewService((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setNewService((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            alert("You must be logged in to add a service.");
            return;
        }

        const formData = new FormData();
        formData.append("title", newService.title);
        formData.append("description", newService.description);
        if (newService.image) {
            formData.append("image", newService.image);
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/services/",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            setServices((prev) => [...prev, response.data]);
            setNewService({ title: "", description: "", image: null });
        } catch (err) {
            setError("Error adding service. Please try again later.");
            console.error("Error adding service:", err);
        }
    };

    const handleEditService = (service) => {
        setEditingService(service);
    };

    const handleUpdateService = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            alert("You must be logged in to update a service.");
            return;
        }

        const formData = new FormData();
        formData.append("title", editingService.title);
        formData.append("description", editingService.description);
        if (editingService.image) {
            formData.append("image", editingService.image);
        }

        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/services/${editingService.id}/`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            setServices((prev) =>
                prev.map((service) =>
                    service.id === editingService.id ? response.data : service
                )
            );
            setEditingService(null);
        } catch (err) {
            setError("Error updating service. Please try again later.");
            console.error("Error updating service:", err);
        }
    };

    const handleDeleteService = async (id) => {
        if (!isAuthenticated) {
            alert("You must be logged in to delete a service.");
            return;
        }

        try {
            await axios.delete(`http://127.0.0.1:8000/services/${id}/`);
            setServices((prev) => prev.filter((service) => service.id !== id));
        } catch (err) {
            setError("Error deleting service. Please try again later.");
            console.error("Error deleting service:", err);
        }
    };

    return (
        <div className="services">
            <h1>Our Services</h1>

            {isAuthenticated && !editingService && (
                <form onSubmit={handleSubmit} className="service-form">
                    <input
                        type="text"
                        name="title"
                        value={newService.title}
                        onChange={handleInputChange}
                        placeholder="Service Title"
                        required
                    />
                    <textarea
                        name="description"
                        value={newService.description}
                        onChange={handleInputChange}
                        placeholder="Service Description"
                        required
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                    />
                    <button type="submit">Add Service</button>
                </form>
            )}

            {editingService && (
                <form onSubmit={handleUpdateService} className="service-form">
                    <input
                        type="text"
                        name="title"
                        value={editingService.title}
                        onChange={(e) =>
                            setEditingService((prev) => ({
                                ...prev,
                                title: e.target.value,
                            }))
                        }
                        placeholder="Edit Service Title"
                        required
                    />
                    <textarea
                        name="description"
                        value={editingService.description}
                        onChange={(e) =>
                            setEditingService((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                        placeholder="Edit Service Description"
                        required
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={(e) =>
                            setEditingService((prev) => ({
                                ...prev,
                                image: e.target.files[0],
                            }))
                        }
                    />
                    <button type="submit">Update Service</button>
                    <button
                        type="button"
                        onClick={() => setEditingService(null)}
                    >
                        Cancel
                    </button>
                </form>
            )}

            {error && <p className="error">{error}</p>}

            {loading ? (
                <Loader />
            ) : (
                <div className="service-list">
                    {services.length > 0 ? (
                        services.map((service) => (
                            <div className="flip-card" key={service.id}>
                                <div className="flip-card-inner">
                                    {/* Front Side */}
                                    <div className="flip-card-front">
                                        {service.image && (
                                            <img
                                                src={
                                                    service.image.startsWith("http")
                                                        ? service.image
                                                        : `http://127.0.0.1:8000${service.image}`
                                                }
                                                alt={service.title}
                                                className="service-image"
                                            />
                                        )}
                                        <h3>{service.title}</h3>
                                    </div>

                                    {/* Back Side */}
                                    <div className="flip-card-back">
                                        <p>{service.description}</p>
                                        {isAuthenticated && (
                                            <div className="service-actions">
                                                <button
                                                    onClick={() =>
                                                        handleEditService(service)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteService(service.id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No services available</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Services;
