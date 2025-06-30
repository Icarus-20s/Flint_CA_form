import React from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Grid2,
    Typography,
    Box,
    Button,
    TextField,
    Divider,
    IconButton,
    useMediaQuery,
    useTheme,
} from "@mui/material";

// Icons
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import "./Footer.css";
import axios from "axios";

const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [email, setEmail] = React.useState("");
    const [subscribeStatus, setSubscribeStatus] = React.useState("");

    const handleSubscribe = async (e) => {
        e.preventDefault();

        if (!email) {
            setSubscribeStatus("Please enter your email");
            return;
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/emailstorage/",
                { email }
            );

            if (response.status === 201) {
                setSubscribeStatus("Thank you for subscribing!");
            } else if (response.status === 200) {
                setSubscribeStatus("You are already subscribed.");
            }

            setEmail("");
        } catch (error) {
            setSubscribeStatus("Subscription failed. Please try again.");
        }

        // Clear message after 3 seconds
        setTimeout(() => {
            setSubscribeStatus("");
        }, 3000);
    };

    return (
        <footer className="footer">
            {/* Pre-Footer CTA */}
            <div className="pre-footer">
                <Container maxWidth="lg">
                    <Grid2
                        container
                        spacing={3}
                        alignItems="center"
                        className="cta-container"
                    >
                        <Grid2 size={{ xs: 12, md: 7 }}>
                            <Typography variant="h4" className="cta-title">
                                Ready to Optimize Your Financial Strategy?
                            </Typography>
                            <Typography
                                variant="body1"
                                className="cta-subtitle"
                            >
                                Schedule a consultation with our expert
                                financial advisors today
                            </Typography>
                        </Grid2>
                        <Grid2
                            size={{ xs: 12, md: 5 }}
                            className="cta-button-container"
                        >
                            <Button
                                component={Link}
                                to="/contact"
                                variant="contained"
                                className="cta-button"
                                endIcon={<ArrowForwardIcon />}
                            >
                                Request Consultation
                            </Button>
                        </Grid2>
                    </Grid2>
                </Container>
            </div>

            {/* Main Footer Content */}
            <div className="footer-main">
                <Container maxWidth="lg">
                    <Grid2 container spacing={4}>
                        {/* About Company */}
                        <Grid2 size={{ xs: 12, md: 4 }}>
                            <div className="footer-company">
                                <Typography
                                    variant="h6"
                                    className="footer-heading"
                                >
                                    <span className="highlight">K.B.P.S</span> &{" "}
                                    <span className="highlight">
                                        Associates
                                    </span>
                                </Typography>
                                <Typography
                                    variant="body2"
                                    className="company-description"
                                >
                                    We are a trusted financial partner dedicated
                                    to strengthening compliance and reporting
                                    for transparency and accountability. With
                                    years of expertise, we provide comprehensive
                                    financial solutions tailored to your
                                    business needs.
                                </Typography>

                                <Box className="contact-info">
                                    <Box className="contact-item">
                                        <LocationOnIcon className="contact-icon" />
                                        <Typography variant="body2">
                                            Bagmati Provience, Nepal
                                            <br />
                                            Lainchaur, Kathmandu
                                        </Typography>
                                    </Box>

                                    <Box className="contact-item">
                                        <PhoneIcon className="contact-icon" />
                                        <Typography variant="body2">
                                            +977 1 1234567
                                        </Typography>
                                    </Box>

                                    <Box className="contact-item">
                                        <EmailIcon className="contact-icon" />
                                        <Typography variant="body2">
                                            info@kbpsassociates.com
                                        </Typography>
                                    </Box>

                                    <Box className="contact-item">
                                        <AccessTimeIcon className="contact-icon" />
                                        <Typography variant="body2">
                                            Sunday - Friday: 9:00 AM - 6:00 PM
                                            <br />
                                            Saturday: 10:00 AM - 2:00 PM
                                        </Typography>
                                    </Box>
                                </Box>
                            </div>
                        </Grid2>

                        {/* Quick Links */}
                        <Grid2 size={{ xs: 12, sm: 6, md: 2 }}>
                            <Typography variant="h6" className="footer-heading">
                                Quick Links
                            </Typography>
                            <ul className="footer-links">
                                <li>
                                    <KeyboardDoubleArrowRightIcon className="link-arrow" />
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <KeyboardDoubleArrowRightIcon className="link-arrow" />
                                    <Link to="/about">About Us</Link>
                                </li>
                                <li>
                                    <KeyboardDoubleArrowRightIcon className="link-arrow" />
                                    <Link to="/services">Services</Link>
                                </li>
                                <li>
                                    <KeyboardDoubleArrowRightIcon className="link-arrow" />
                                    <Link to="/careers">Careers</Link>
                                </li>
                                <li>
                                    <KeyboardDoubleArrowRightIcon className="link-arrow" />
                                    <Link to="/contact">Contact</Link>
                                </li>
                            </ul>
                        </Grid2>

                        {/* Newsletter */}
                        <Grid2 size={{ xs: 12, md: 4 }}>
                            <Typography variant="h6" className="footer-heading">
                                Subscribe to Newsletter
                            </Typography>
                            <Typography
                                variant="body2"
                                className="newsletter-description"
                            >
                                Stay informed about the latest financial
                                regulations, tax updates, and industry best
                                practices by subscribing to our newsletter.
                            </Typography>

                            <form
                                onSubmit={handleSubscribe}
                                className="subscribe-form"
                            >
                                <TextField
                                    variant="outlined"
                                    placeholder="Your Email Address"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="subscribe-input"
                                    size="small"
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="subscribe-button"
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={handleSubscribe}
                                >
                                    Subscribe
                                </Button>
                            </form>

                            {subscribeStatus && (
                                <Typography
                                    variant="body2"
                                    className="subscribe-status"
                                >
                                    {subscribeStatus}
                                </Typography>
                            )}

                            <Typography variant="h6" className="social-heading">
                                Connect With Us
                            </Typography>
                            <Box className="social-icons">
                                <IconButton
                                    className="social-icon facebook"
                                    href="https://www.facebook.com/kbpsassociates"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                >
                                    <FacebookRoundedIcon />
                                </IconButton>
                                <IconButton
                                    className="social-icon instagram"
                                    href="https://www.instagram.com/kbpsassociates"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                >
                                    <InstagramIcon />
                                </IconButton>
                                <IconButton
                                    className="social-icon twitter"
                                    href="https://twitter.com/kbpsassociates"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Twitter"
                                >
                                    <XIcon />
                                </IconButton>
                                <IconButton
                                    className="social-icon youtube"
                                    href="https://www.youtube.com/kbpsassociates"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="YouTube"
                                >
                                    <YouTubeIcon />
                                </IconButton>
                                <IconButton
                                    className="social-icon linkedin"
                                    href="https://www.linkedin.com/company/kbpsassociates"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                >
                                    <LinkedInIcon />
                                </IconButton>
                            </Box>
                        </Grid2>
                    </Grid2>
                </Container>
            </div>

            {/* Divider */}
            <Divider className="footer-divider" />

            {/* Footer Bottom Section */}
            <div className="footer-bottom">
                <Container maxWidth="lg">
                    <Grid2
                        container
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Typography variant="body2" className="copyright">
                                &copy; {new Date().getFullYear()} K.B.P.S &
                                Associates. All Rights Reserved.
                            </Typography>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <ul className="legal-links">
                                <li>
                                    <Link to="/privacy-policy">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/terms-conditions">
                                        Terms & Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/disclaimer">Disclaimer</Link>
                                </li>
                                <li>
                                    <Link to="/sitemap">Sitemap</Link>
                                </li>
                            </ul>
                        </Grid2>
                    </Grid2>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;
