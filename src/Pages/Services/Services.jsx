import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContextProvider";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Grid,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import Loader from "../../Loaders/Loader";
import "./Services.css";

const Services = () => {
    const { isAuthenticated } = useAuth();
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: null,
    });
    const [editingService, setEditingService] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch services on component mount
    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://127.0.0.1:8000/services/");
                setServices(response.data);
            } catch (err) {
                setError("Error fetching services. Please try again later.");
                console.error("Error fetching services:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle image file changes
    const handleImageChange = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    // Handle form submission to add a new service
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) return alert("You must be logged in to add a service.");

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));

        try {
            const response = await axios.post("http://127.0.0.1:8000/services/", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setServices((prev) => [...prev, response.data]);
            setFormData({ title: "", description: "", image: null });
        } catch (err) {
            setError("Error adding service. Please try again later.");
            console.error("Error adding service:", err);
        }
    };

    // Set the service to be edited
    const handleEditService = (service) => setEditingService(service);

    // Handle updating a service
    const handleUpdateService = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) return alert("You must be logged in to update a service.");

        const data = new FormData();
        Object.entries(editingService).forEach(([key, value]) => data.append(key, value));

        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/services/${editingService.id}/`,
                data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            setServices((prev) =>
                prev.map((service) => (service.id === editingService.id ? response.data : service))
            );
            setEditingService(null);
        } catch (err) {
            setError("Error updating service. Please try again later.");
            console.error("Error updating service:", err);
        }
    };

    // Handle deleting a service
    const handleDeleteService = async (id) => {
        if (!isAuthenticated) return alert("You must be logged in to delete a service.");

        try {
            await axios.delete(`http://127.0.0.1:8000/services/${id}/`);
            setServices((prev) => prev.filter((service) => service.id !== id));
        } catch (err) {
            setError("Error deleting service. Please try again later.");
            console.error("Error deleting service:", err);
        }
    };

    // Handle 'Learn More' button click
    const handleLearnMoreClick = (service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    // Handle modal close
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
    };

    // Render form for adding or editing service
    const renderForm = (isEdit = false) => (
        <form onSubmit={isEdit ? handleUpdateService : handleSubmit} className="service-form">
            <input
                type="text"
                name="title"
                value={isEdit ? editingService.title : formData.title}
                onChange={(e) => {
                    isEdit
                        ? setEditingService((prev) => ({ ...prev, title: e.target.value }))
                        : handleInputChange(e);
                }}
                placeholder={isEdit ? "Edit Service Title" : "Service Title"}
                required
            />
            <textarea
                name="description"
                value={isEdit ? editingService.description : formData.description}
                onChange={(e) => {
                    isEdit
                        ? setEditingService((prev) => ({ ...prev, description: e.target.value }))
                        : handleInputChange(e);
                }}
                placeholder={isEdit ? "Edit Service Description" : "Service Description"}
                required
            />
            <input
                type="file"
                name="image"
                onChange={(e) => {
                    isEdit
                        ? setEditingService((prev) => ({ ...prev, image: e.target.files[0] }))
                        : handleImageChange(e);
                }}
            />
            <Button type="submit" variant="contained" color="primary">
                {isEdit ? "Update Service" : "Add Service"}
            </Button>
            {isEdit && (
                <Button
                    type="button"
                    onClick={() => setEditingService(null)}
                    style={{ marginLeft: "8px" }}
                >
                    Cancel
                </Button>
            )}
        </form>
    );

    return (
        <div className="services">
            <h1>Our Services</h1>

            {isAuthenticated && !editingService && renderForm()}
            {editingService && renderForm(true)}

            {error && <p className="error">{error}</p>}

            {loading ? (
                <Loader />
            ) : (
                <Grid container spacing={3} className="grid-container">
                    {services.length > 0 ? (
                        services.map((service) => (
                            <Grid item xs={12} sm={6} md={4} key={service.id} className="grid-item">
                                <Card className="card">
                                    {service.image && (
                                        <CardMedia
                                            component="img"
                                            alt={service.title}
                                            height="140"
                                            image={
                                                service.image.startsWith("http")
                                                    ? service.image
                                                    : `http://127.0.0.1:8000${service.image}`
                                            }
                                            title={service.title}
                                        />
                                    )}
                                    <CardContent>
                                        <Typography variant="h6">{service.title}</Typography>
                                        <Typography variant="body2">{service.description}</Typography>
                                    </CardContent>
                                    <Box display="flex" justifyContent="center" p={2}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleLearnMoreClick(service)}
                                            style={{ marginRight: "8px" }}
                                        >
                                            Learn More
                                        </Button>
                                        {isAuthenticated && (
                                            <>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleEditService(service)}
                                                    style={{ marginRight: "8px" }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => handleDeleteService(service.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </>
                                        )}
                                    </Box>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography>No services available</Typography>
                    )}
                </Grid>
            )}

            <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <DialogTitle>{selectedService?.title}</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">{selectedService?.description}</Typography>
                    {selectedService?.image && (
                        <img
                            src={
                                selectedService.image.startsWith("http")
                                    ? selectedService.image
                                    : `http://127.0.0.1:8000${selectedService.image}`
                            }
                            alt={selectedService.title}
                            style={{ width: "100%", marginTop: "10px" }}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Services;
