import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../Api/api";
import "./Services.css";
import LoadingSpinner from "../../Loaders/LoadingSpinner";
import { servicesData } from "../../Components/Constants";
import { ServiceCard, ServiceModal } from "../../Components/ServicesComponents";

const Services = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(null);
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [quoteForm, setQuoteForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        preferredContact: "email",
        companyName: "",
        businessType: "",
        serviceName: "",
        serviceNeedDate: "",
        message: "",
        agreesToTerms: false,
    });
    const [selectedService, setSelectedService] = useState(null);

    const handleServiceClick = (service) => {
        setSelectedService(service);
    };

    const handleCloseModal = () => {
        setSelectedService(null);
    };

    const scrollToQuoteForm = () => {
        // Then scroll to the quote form with delay
        setTimeout(() => {
            document
                .getElementById("quote-form")
                .scrollIntoView({ behavior: "smooth" });
        }, 300);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setQuoteForm({
            ...quoteForm,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!quoteForm.agreesToTerms) {
            setFormError(
                "You must agree to the terms and conditions to proceed."
            );
            return;
        }

        try {
            setFormError(null);
            setFormSubmitting(true);
            await api.post("quote-requests/", quoteForm);

            // Add a small delay before showing success state
            setTimeout(() => {
                setFormSubmitted(true);
                setFormSubmitting(false);

                // Reset form
                setQuoteForm({
                    fullName: "",
                    email: "",
                    phone: "",
                    preferredContact: "email",
                    companyName: "",
                    businessType: "",
                    serviceName: "",
                    serviceNeedDate: "",
                    message: "",
                    budget: "",
                    agreesToTerms: false,
                });
            }, 800);
        } catch (err) {
            setTimeout(() => {
                setFormError(
                    "Failed to submit your request. Please try again or contact us directly."
                );
                console.error("Error submitting quote request:", err);
                setFormSubmitting(false);
            }, 600);
        }
    };

    return (
        <div className="services-page">
            <div className="services-hero">
                <div className="services-hero-content">
                    <h1>Our Professional Services</h1>
                    <p>
                        Comprehensive accounting and financial solutions
                        tailored for your business needs
                    </p>
                </div>
            </div>

            <div className="services-container">
                <h2 className="services-section-title">Services We Offer</h2>
                <p className="services-section-subtitle">
                    Our firm provides expert financial guidance to businesses of
                    all sizes. Select a service to learn more.
                </p>
                <div className="services-grid">
                    {servicesData.map((service) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onLearnMore={handleServiceClick}
                        />
                    ))}
                </div>
                {selectedService && (
                    <ServiceModal
                        service={selectedService}
                        onClose={handleCloseModal}
                    />
                )}
            </div>

            <div id="quote-form" className="quote-request-section">
                <div className="quote-request-container">
                    <h2>Request a Quote</h2>
                    <p>
                        Fill out the form below to receive a customized quote
                        for your business needs.
                    </p>

                    {formSubmitted ? (
                        <motion.div
                            className="form-success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <i className="fas fa-check-circle"></i>
                            <h3>Thank You!</h3>
                            <p>
                                Your quote request has been successfully
                                submitted. We'll get back to you within 24-48
                                hours.
                            </p>
                            <button
                                onClick={() => setFormSubmitted(false)}
                                className="new-quote-button"
                            >
                                Request Another Quote
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="quote-form">
                            {formError && (
                                <motion.div
                                    className="form-error-message"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    {formError}
                                </motion.div>
                            )}

                            <div className="form-section">
                                <h3>Personal Information</h3>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="fullName">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={quoteForm.fullName}
                                            onChange={handleInputChange}
                                            required
                                            disabled={formSubmitting}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={quoteForm.email}
                                            onChange={handleInputChange}
                                            required
                                            disabled={formSubmitting}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={quoteForm.phone}
                                            onChange={handleInputChange}
                                            disabled={formSubmitting}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="preferredContact">
                                            Preferred Contact Method
                                        </label>
                                        <select
                                            id="preferredContact"
                                            name="preferredContact"
                                            value={quoteForm.preferredContact}
                                            onChange={handleInputChange}
                                            disabled={formSubmitting}
                                        >
                                            <option value="email">Email</option>
                                            <option value="phone">Phone</option>
                                            <option value="either">
                                                Either
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Business Information</h3>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="companyName">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            id="companyName"
                                            name="companyName"
                                            value={quoteForm.companyName}
                                            onChange={handleInputChange}
                                            disabled={formSubmitting}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="businessType">
                                            Business Type
                                        </label>
                                        <select
                                            id="businessType"
                                            name="businessType"
                                            value={quoteForm.businessType}
                                            onChange={handleInputChange}
                                            disabled={formSubmitting}
                                        >
                                            <option value="">
                                                Select Business Type
                                            </option>
                                            <option value="sole-proprietorship">
                                                Sole Proprietorship
                                            </option>
                                            <option value="partnership">
                                                Partnership
                                            </option>
                                            <option value="llc">LLC</option>
                                            <option value="corporation">
                                                Corporation
                                            </option>
                                            <option value="non-profit">
                                                Non-Profit
                                            </option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Service Details</h3>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="serviceName">
                                            Selected Service
                                        </label>
                                        <input
                                            type="text"
                                            id="serviceName"
                                            name="serviceName"
                                            value={quoteForm.serviceName}
                                            onChange={handleInputChange}
                                            placeholder="Select a service from above or type here"
                                            disabled={formSubmitting}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="serviceNeedDate">
                                            When do you need this service?
                                        </label>
                                        <input
                                            type="text"
                                            id="serviceNeedDate"
                                            name="serviceNeedDate"
                                            value={quoteForm.serviceNeedDate}
                                            onChange={handleInputChange}
                                            placeholder="e.g., ASAP, Next Month, Q4 2025"
                                            disabled={formSubmitting}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group full-width">
                                        <label htmlFor="message">
                                            Message / Project Details *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={quoteForm.message}
                                            onChange={handleInputChange}
                                            required
                                            rows="5"
                                            placeholder="Please describe your specific requirements and any relevant details about your project."
                                            disabled={formSubmitting}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group checkbox-group">
                                    <input
                                        type="checkbox"
                                        id="agreesToTerms"
                                        name="agreesToTerms"
                                        checked={quoteForm.agreesToTerms}
                                        onChange={handleInputChange}
                                        disabled={formSubmitting}
                                    />
                                    <label htmlFor="agreesToTerms">
                                        I agree to the{" "}
                                        <a href="/terms" target="_blank">
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>

                            <div className="form-actions">
                                <button
                                    type="submit"
                                    className="submit-button"
                                    disabled={formSubmitting}
                                >
                                    {formSubmitting ? (
                                        <span className="button-loading">
                                            <LoadingSpinner />
                                            Submitting...
                                        </span>
                                    ) : (
                                        "Submit Quote Request"
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Services;
