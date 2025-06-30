// QuoteRequestForm.jsx
import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid2,
    Typography,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    Divider,
    Box,
    CircularProgress,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import "./QuoteRequestForm.css"; // Import the CSS file

const QuoteRequestForm = ({ open, onClose, service }) => {
    const initialFormState = {
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        businessType: "",
        serviceNeedDate: "",
        message: "",
        budget: "",
        agreesToTerms: false,
        preferredContact: "email",
    };

    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Form validation
    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.message.trim())
            newErrors.message = "Please describe your requirements";
        if (!formData.agreesToTerms)
            newErrors.agreesToTerms = "You must agree to the terms";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));

        // Clear error when field is edited
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            // Create request data with service information
            const requestData = {
                ...formData,
                serviceId: service?.id,
                serviceName: service?.title,
                serviceCategory: service?.category,
                requestDate: new Date().toISOString(),
            };

            // Send request to your Django API
            await api.post("/quote-requests/", requestData);

            setSubmitSuccess(true);
            setTimeout(() => {
                resetForm();
                onClose();
            }, 2000);
        } catch (err) {
            console.error("Error submitting quote request:", err);
            setErrors({
                submit: "Failed to submit request. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    // Reset form to initial state
    const resetForm = () => {
        setFormData(initialFormState);
        setErrors({});
        setSubmitSuccess(false);
    };

    return (
        <Dialog
            open={open}
            onClose={submitSuccess ? null : onClose}
            maxWidth="md"
            fullWidth
            className="quote-request-dialog"
        >
            <DialogTitle>
                <Typography variant="h5" component="div">
                    Request a Quote
                    {service && (
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                        >
                            Service: {service.title}
                        </Typography>
                    )}
                </Typography>
            </DialogTitle>

            <Divider />

            <DialogContent>
                {submitSuccess ? (
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        py={4}
                        className="success-message"
                    >
                        <CheckCircleIcon
                            color="success"
                            sx={{ fontSize: 60, mb: 2 }}
                        />
                        <Typography variant="h6" gutterBottom>
                            Request Submitted Successfully!
                        </Typography>
                        <Typography
                            variant="body1"
                            align="center"
                            color="text.secondary"
                        >
                            Thank you for your interest. Our team will review
                            your request and get back to you within 24-48 hours.
                        </Typography>
                    </Box>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="quote-request-form"
                    >
                        <Grid2 container spacing={2} mt={1}>
                            <Grid2 size={{ xs: 12 }}>
                                <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                    className="section-header"
                                >
                                    Personal Information
                                </Typography>
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    error={!!errors.fullName}
                                    helperText={errors.fullName}
                                    required
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    required
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="preferred-contact-label">
                                        Preferred Contact Method
                                    </InputLabel>
                                    <Select
                                        labelId="preferred-contact-label"
                                        name="preferredContact"
                                        value={formData.preferredContact}
                                        onChange={handleChange}
                                        label="Preferred Contact Method"
                                    >
                                        <MenuItem value="email">Email</MenuItem>
                                        <MenuItem value="phone">Phone</MenuItem>
                                        <MenuItem value="either">
                                            Either
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid2>

                            <Grid2 size={{ xs: 12 }}>
                                <Divider sx={{ my: 1 }} />
                                <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                    className="section-header"
                                >
                                    Business Information
                                </Typography>
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Company Name"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="business-type-label">
                                        Business Type
                                    </InputLabel>
                                    <Select
                                        labelId="business-type-label"
                                        name="businessType"
                                        value={formData.businessType}
                                        onChange={handleChange}
                                        label="Business Type"
                                    >
                                        <MenuItem value="sole-proprietorship">
                                            Sole Proprietorship
                                        </MenuItem>
                                        <MenuItem value="partnership">
                                            Partnership
                                        </MenuItem>
                                        <MenuItem value="llc">LLC</MenuItem>
                                        <MenuItem value="corporation">
                                            Corporation
                                        </MenuItem>
                                        <MenuItem value="non-profit">
                                            Non-Profit
                                        </MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid2>

                            <Grid2 size={{ xs: 12 }}>
                                <Divider sx={{ my: 1 }} />
                                <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                    className="section-header"
                                >
                                    Service Requirements
                                </Typography>
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="When do you need this service?"
                                    name="serviceNeedDate"
                                    value={formData.serviceNeedDate}
                                    onChange={handleChange}
                                    placeholder="e.g., Next month, Q3 2023, ASAP"
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="budget-label">
                                        Budget Range
                                    </InputLabel>
                                    <Select
                                        labelId="budget-label"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        label="Budget Range"
                                    >
                                        <MenuItem value="under-5000">
                                            Under ₹5,000
                                        </MenuItem>
                                        <MenuItem value="5000-15000">
                                            ₹5,000 - ₹15,000
                                        </MenuItem>
                                        <MenuItem value="15000-30000">
                                            ₹15,000 - ₹30,000
                                        </MenuItem>
                                        <MenuItem value="30000-50000">
                                            ₹30,000 - ₹50,000
                                        </MenuItem>
                                        <MenuItem value="over-50000">
                                            Over ₹50,000
                                        </MenuItem>
                                        <MenuItem value="not-sure">
                                            Not Sure / To Be Discussed
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid2>

                            <Grid2 size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Project Details & Requirements"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    multiline
                                    rows={4}
                                    placeholder="Please describe your specific requirements, scope of work, and any questions you have."
                                    error={!!errors.message}
                                    helperText={errors.message}
                                    required
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="agreesToTerms"
                                            checked={formData.agreesToTerms}
                                            onChange={handleChange}
                                            color="primary"
                                        />
                                    }
                                    label="I agree to the terms and privacy policy"
                                />
                                {errors.agreesToTerms && (
                                    <Typography variant="caption" color="error">
                                        {errors.agreesToTerms}
                                    </Typography>
                                )}
                            </Grid2>

                            {errors.submit && (
                                <Grid2 size={{ xs: 12 }}>
                                    <Typography variant="body2" color="error">
                                        {errors.submit}
                                    </Typography>
                                </Grid2>
                            )}
                        </Grid2>
                    </form>
                )}
            </DialogContent>

            {!submitSuccess && (
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={20} />}
                    >
                        {loading ? "Submitting..." : "Submit Request"}
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
};

export default QuoteRequestForm;
