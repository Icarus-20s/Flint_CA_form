import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
} from "react";
import { Link as ScrollLink } from "react-scroll";
import {
    Card,
    CardContent,
    Button,
    Typography,
    Grid2,
    Box,
    Container,
    IconButton,
    Paper,
    Chip,
    ButtonBase
} from "@mui/material";

// Icons
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SavingsIcon from "@mui/icons-material/Savings";
import SecurityIcon from "@mui/icons-material/Security";
import CloseIcon from "@mui/icons-material/Close";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArticleIcon from "@mui/icons-material/Article";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import StoreIcon from "@mui/icons-material/Store";
import ApartmentIcon from "@mui/icons-material/Apartment";

import {ServiceCard, ServiceModal} from "../../Components/ServicesComponents";
import { servicesData, testimonialsData } from "../../Components/Constants";
import "./Home.css";

/**
 * Hero Slider Component
 * Displays a responsive image slider with controls
 */
const HeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const autoplayRef = useRef(null);

    const images = [
        "images/homepage/slide1.jpg",
        "images/homepage/slide2.jpg",
        "images/homepage/slide3.jpg",
    ];

    const resetAutoplay = useCallback(() => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
        autoplayRef.current = setInterval(() => changeSlide("next"), 6000);
    }, []);

    const changeSlide = useCallback(
        (direction) => {
            if (isTransitioning) return;

            setIsTransitioning(true);
            const newIndex =
                direction === "next"
                    ? (currentIndex + 1) % images.length
                    : (currentIndex - 1 + images.length) % images.length;

            setCurrentIndex(newIndex);
            resetAutoplay();
            setTimeout(() => setIsTransitioning(false), 600);
        },
        [currentIndex, isTransitioning, images.length, resetAutoplay]
    );

    useEffect(() => {
        resetAutoplay();
        return () => autoplayRef.current && clearInterval(autoplayRef.current);
    }, [resetAutoplay]);

    return (
        <div
            className="modern-hero__slider"
            onMouseEnter={() => clearInterval(autoplayRef.current)}
            onMouseLeave={resetAutoplay}
        >
            <div
                className={`modern-hero__slide-container ${
                    isTransitioning ? "modern-hero__transitioning" : ""
                }`}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`modern-hero__slide ${
                            index === currentIndex ? "modern-hero__active" : ""
                        }`}
                        style={{
                            backgroundImage: `url(${image})`,
                            opacity: index === currentIndex ? 1 : 0,
                            zIndex: index === currentIndex ? 1 : 0,
                        }}
                    />
                ))}
            </div>
            <div className="modern-hero__controls">
                <IconButton
                    className="modern-hero__arrow modern-hero__prev"
                    onClick={() => changeSlide("prev")}
                    aria-label="Previous slide"
                >
                    <ArrowBackIcon />
                </IconButton>
                <div className="modern-hero__indicators">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`modern-hero__indicator ${
                                index === currentIndex
                                    ? "modern-hero__indicator--active"
                                    : ""
                            }`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
                <IconButton
                    className="modern-hero__arrow modern-hero__next"
                    onClick={() => changeSlide("next")}
                    aria-label="Next slide"
                >
                    <ArrowForwardIcon />
                </IconButton>
            </div>
        </div>
    );
};


const Testimonials = ({ testimonials }) => {
    const [current, setCurrent] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);
    const autoplayRef = useRef(null);

    const getTestimonialsPerView = useCallback(() => {
        return width < 768 ? 1 : width < 1200 ? 2 : 3;
    }, [width]);

    const getMaxIndex = useCallback(() => {
        return Math.max(
            0,
            Math.ceil(testimonialsData.length / getTestimonialsPerView()) - 1
        );
    }, [testimonialsData.length, getTestimonialsPerView]);

    const next = useCallback(() => {
        setCurrent((current) => Math.min(current + 1, getMaxIndex()));
    }, [getMaxIndex]);

    const prev = useCallback(() => {
        setCurrent((current) => Math.max(current - 1, 0));
    }, []);

    const startAutoplay = useCallback(() => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);

        if (testimonialsData.length > getTestimonialsPerView()) {
            autoplayRef.current = setInterval(() => {
                setCurrent((current) => {
                    const newCurrent = current + 1;
                    return newCurrent > getMaxIndex() ? 0 : newCurrent;
                });
            }, 5000);
        }
    }, [testimonialsData.length, getTestimonialsPerView, getMaxIndex]);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        startAutoplay();

        return () => {
            window.removeEventListener("resize", handleResize);
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
    }, [startAutoplay]);

    return (
        <div
            className="modern-testimonials__container"
            onMouseEnter={() =>
                autoplayRef.current && clearInterval(autoplayRef.current)
            }
            onMouseLeave={startAutoplay}
        >
            <div
                className="modern-testimonials__list"
                style={{
                    transform: `translateX(-${
                        current * (100 / getTestimonialsPerView())
                    }%)`,
                    transition: "transform 0.5s ease",
                }}
            >
                {testimonialsData.map((testimonial) => (
                    <Box
                        key={testimonial.id}
                        className="modern-testimonials__card"
                        component={Paper}
                        elevation={3}
                    >
                        <div className="modern-testimonials__quote-icon">
                            <FormatQuoteIcon />
                        </div>
                        <Typography
                            variant="body1"
                            className="modern-testimonials__text"
                        >
                            "{testimonial.testimonial}"
                        </Typography>
                        <div className="modern-testimonials__profile">
                            <div className="modern-testimonials__image-container">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="modern-testimonials__image"
                                />
                            </div>
                            <div className="modern-testimonials__info">
                                <Typography
                                    variant="h6"
                                    className="modern-testimonials__name"
                                >
                                    {testimonial.name}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    className="modern-testimonials__title"
                                >
                                    {testimonial.title}
                                </Typography>
                            </div>
                        </div>
                    </Box>
                ))}
            </div>
            {getMaxIndex() > 0 && (
                <div className="modern-testimonials__controls">
                    <IconButton
                        onClick={prev}
                        disabled={current === 0}
                        className={`modern-testimonials__arrow ${
                            current === 0
                                ? "modern-testimonials__arrow--disabled"
                                : ""
                        }`}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <div className="modern-testimonials__dots">
                        {Array(getMaxIndex() + 1)
                            .fill()
                            .map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`modern-testimonials__dot ${
                                        idx === current
                                            ? "modern-testimonials__dot--active"
                                            : ""
                                    }`}
                                    onClick={() => setCurrent(idx)}
                                />
                            ))}
                    </div>
                    <IconButton
                        onClick={next}
                        disabled={current === getMaxIndex()}
                        className={`modern-testimonials__arrow ${
                            current === getMaxIndex()
                                ? "modern-testimonials__arrow--disabled"
                                : ""
                        }`}
                    >
                        <ArrowForwardIcon />
                    </IconButton>
                </div>
            )}
        </div>
    );
};

/**
 * Statistics Component
 * Displays animated statistics counters
 */
const Statistics = () => {
    const [stats, setStats] = useState({
        clients: 0,
        projects: 0,
        experience: 0,
        satisfaction: 0,
    });

    // Use useMemo to prevent targetStats from changing on every render
    const targetStats = useMemo(
        () => ({
            clients: 250,
            projects: 500,
            experience: 15,
            satisfaction: 98,
        }),
        []
    );

    const sectionRef = useRef(null);
    const animationRef = useRef(null);
    const startTimeRef = useRef(null);
    const hasAnimatedRef = useRef(false); // Prevent multiple animations
    const animationDuration = 2000; // 2 seconds

    const animateStats = useCallback(
        (timestamp) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const elapsed = timestamp - startTimeRef.current;
            const progress = Math.min(elapsed / animationDuration, 1);

            setStats({
                clients: Math.floor(progress * targetStats.clients),
                projects: Math.floor(progress * targetStats.projects),
                experience: Math.floor(progress * targetStats.experience),
                satisfaction: Math.floor(progress * targetStats.satisfaction),
            });

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animateStats);
            } else {
                // Ensure final values are exact
                setStats(targetStats);
                animationRef.current = null;
                hasAnimatedRef.current = true;
            }
        },
        [targetStats]
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                console.log(
                    "Statistics section in view:",
                    entry.isIntersecting
                );

                if (
                    entry.isIntersecting &&
                    !hasAnimatedRef.current &&
                    !animationRef.current
                ) {
                    startTimeRef.current = null;
                    animationRef.current = requestAnimationFrame(animateStats);
                }
            },
            {
                threshold: 0.1, // Trigger when 10% visible
                rootMargin: "0px 0px -50px 0px",
            }
        );

        const currentSection = sectionRef.current;
        if (currentSection) {
            observer.observe(currentSection);
        }

        return () => {
            if (currentSection) {
                observer.unobserve(currentSection);
            }
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [animateStats]);

    // Fallback: Start animation after component mounts if intersection observer fails
    useEffect(() => {
        const fallbackTimer = setTimeout(() => {
            if (!hasAnimatedRef.current && !animationRef.current) {
                console.log("Starting fallback animation");
                startTimeRef.current = null;
                animationRef.current = requestAnimationFrame(animateStats);
            }
        }, 1000);

        return () => clearTimeout(fallbackTimer);
    }, [animateStats]);

    return (
        <Box className="modern-statistics__container" ref={sectionRef}>
            <Grid2 container spacing={3}>
                <Grid2 size={{ xs: 6, md: 3 }}>
                    <div className="modern-statistics__card">
                        <Typography
                            variant="h3"
                            className="modern-statistics__number"
                        >
                            {stats.clients}+
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            className="modern-statistics__label"
                        >
                            Happy Clients
                        </Typography>
                    </div>
                </Grid2>
                <Grid2 size={{ xs: 6, md: 3 }}>
                    <div className="modern-statistics__card">
                        <Typography
                            variant="h3"
                            className="modern-statistics__number"
                        >
                            {stats.projects}+
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            className="modern-statistics__label"
                        >
                            Projects Completed
                        </Typography>
                    </div>
                </Grid2>
                <Grid2 size={{ xs: 6, md: 3 }}>
                    <div className="modern-statistics__card">
                        <Typography
                            variant="h3"
                            className="modern-statistics__number"
                        >
                            {stats.experience}+
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            className="modern-statistics__label"
                        >
                            Years Experience
                        </Typography>
                    </div>
                </Grid2>
                <Grid2 size={{ xs: 6, md: 3 }}>
                    <div className="modern-statistics__card">
                        <Typography
                            variant="h3"
                            className="modern-statistics__number"
                        >
                            {stats.satisfaction}%
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            className="modern-statistics__label"
                        >
                            Client Satisfaction
                        </Typography>
                    </div>
                </Grid2>
            </Grid2>
        </Box>
    );
};
/**
 * Industry Expertise Component
 * Displays industry specializations in a grid
 */
const IndustryExpertise = () => {
    const industries = [
        {
            icon: <StoreIcon fontSize="large" />,
            name: "Retail",
            description:
                "Specialized services for retail businesses facing unique tax and financial challenges.",
        },
        {
            icon: <ApartmentIcon fontSize="large" />,
            name: "Real Estate",
            description:
                "Expert guidance for property investments, development, and management companies.",
        },
        {
            icon: <BusinessCenterIcon fontSize="large" />,
            name: "Professional Services",
            description:
                "Tailored solutions for law firms, medical practices, and consulting companies.",
        },
        {
            icon: <AssessmentIcon fontSize="large" />,
            name: "Manufacturing",
            description:
                "Comprehensive financial services for manufacturing and production businesses.",
        },
    ];

    return (
        <Box className="modern-industry__container">
            <Typography variant="h2" className="modern-section__title">
                Industry Expertise
            </Typography>
            {/* <Typography variant="subtitle1" className="modern-section__subtitle">
        Specialized knowledge across diverse business sectors
      </Typography> */}

            <Grid2 container spacing={4} sx={{ mt: 4 }}>
                {industries.map((industry, index) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <Paper elevation={3} className="modern-industry__card">
                            <div className="modern-industry__icon-wrapper">
                                {industry.icon}
                            </div>
                            <Typography
                                variant="h6"
                                className="modern-industry__name"
                            >
                                {industry.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                className="modern-industry__description"
                            >
                                {industry.description}
                            </Typography>
                        </Paper>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
};
/**
 * Trust Indicators Component
 * Displays elements that build trust with potential clients
 */
const TrustIndicators = () => {
    const features = [
        {
            icon: <VerifiedUserIcon fontSize="large" />,
            title: "Certified Professionals",
            description:
                "Our team consists of certified accountants and financial experts with years of industry experience.",
        },
        {
            icon: <SecurityIcon fontSize="large" />,
            title: "Data Security",
            description:
                "Your financial information is protected with bank-level security and encryption protocols.",
        },
        {
            icon: <ArticleIcon fontSize="large" />,
            title: "Transparent Reporting",
            description:
                "Clear, comprehensive reports with insights you can actually understand and act upon.",
        },
    ];

    return (
        <Box className="modern-trust__container">
            <Typography variant="h2" className="modern-section__title">
                Why Choose Us
            </Typography>
            {/* <Typography variant="subtitle1" className="modern-section__subtitle">
        Our commitment to excellence sets us apart
      </Typography> */}

            <Grid2 container spacing={4} sx={{ mt: 4 }}>
                {features.map((feature, index) => (
                    <Grid2 size={{ xs: 12, md: 4 }} key={index}>
                        <Paper elevation={3} className="modern-trust__card">
                            <div className="modern-trust__icon-wrapper">
                                {feature.icon}
                            </div>
                            <Typography
                                variant="h6"
                                className="modern-trust__title"
                            >
                                {feature.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                className="modern-trust__description"
                            >
                                {feature.description}
                            </Typography>
                        </Paper>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
};

/**
 * Main Home Component
 * Assembles all sections for the homepage
 */
const Home = () => {
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Add smooth scrolling behavior
        document.documentElement.style.scrollBehavior = "smooth";

        return () => {
            document.documentElement.style.scrollBehavior = "auto";
        };
    }, []);

    const handleServiceClick = (service) => {
        setSelectedService(service);
    };

    const handleCloseModal = () => {
        setSelectedService(null);
    };

    return (
        <Box className="modern-home__container">
            {/* Hero Section */}
            <Box className="modern-hero__section">
                <Container
                    maxWidth="lg"
                    className="modern-hero__content-container"
                >
                    <Grid2 container spacing={2} alignItems="center">
                        <Grid2
                            size={{ xs: 12, sm: 6 }}
                            className="modern-hero__text-container"
                        >
                            <Typography
                                variant="h1"
                                className="modern-hero__title"
                                sx={{
                                    fontSize: {
                                        xs: "2rem", // mobile
                                        sm: "2.5rem",
                                        md: "3.5rem",
                                        lg: "4rem", // desktop
                                    },
                                    fontWeight: "bold",
                                    lineHeight: 1.2,
                                }}
                            >
                                Financial Expertise for Today's Business
                                Challenges
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                className="modern-hero__subtitle"
                            >
                                Strategic accounting, tax, and advisory services
                                tailored for your success
                            </Typography>
                            <Box className="modern-hero__buttons">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className="modern-hero__button"
                                    component={ScrollLink}
                                    to="services-section"
                                    smooth={true}
                                    duration={800}
                                >
                                    Explore Services
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="large"
                                    className="modern-hero__button modern-hero__button--outline"
                                    href="/contact"
                                >
                                    Contact Us
                                </Button>
                            </Box>
                            <Box className="modern-hero__chips">
                                <Chip
                                    icon={<CheckCircleOutlineIcon />}
                                    label="15+ Years Experience"
                                    className="modern-hero__chip"
                                />
                                <Chip
                                    icon={<CheckCircleOutlineIcon />}
                                    label="Certified Experts"
                                    className="modern-hero__chip"
                                />
                                <Chip
                                    icon={<CheckCircleOutlineIcon />}
                                    label="Client-Focused Approach"
                                    className="modern-hero__chip"
                                />
                            </Box>
                        </Grid2>
                        <Grid2
                            size={{ xs: 12, sm: 6 }}
                            className="modern-hero__slider-container"
                        >
                            <HeroSlider />
                        </Grid2>
                    </Grid2>
                </Container>
            </Box>

            {/* Trust Indicators */}
            <Box component="section" className="modern-section">
                <Container maxWidth="lg">
                    <TrustIndicators />
                </Container>
            </Box>

            {/* Services Section */}
            <Box
                component="section"
                id="services-section"
                className="modern-section modern-section--gray"
            >
                <Container maxWidth="lg">
                    <Typography variant="h2" className="modern-section__title">
                        Our Services
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 2,
                            mt: 4,
                        }}
                    >
                        {servicesData.slice(0, 4).map((service) => (
                            <Box key={service.id} sx={{ flex: "1 1 0" }}>
                                <ServiceCard
                                    service={service}
                                    onLearnMore={handleServiceClick}
                                />
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* Statistics Section */}
            <Box component="section" className="modern-section">
                <Container maxWidth="lg">
                    <Statistics />
                </Container>
            </Box>

            {/* Industry Expertise */}
            <Box
                component="section"
                className="modern-section modern-section--gray"
            >
                <Container maxWidth="lg">
                    <IndustryExpertise />
                </Container>
            </Box>

            {/* Testimonials Section */}
            <Box component="section" className="modern-section">
                <Container maxWidth="lg">
                    <Typography variant="h2" className="modern-section__title">
                        Client Testimonials
                    </Typography>
                    {/* <Typography variant="subtitle1" className="modern-section__subtitle">
            What our clients say about our services
          </Typography> */}

                    <Box sx={{ mt: 6 }}>
                        <Testimonials testimonials={testimonialsData} />
                    </Box>
                </Container>
            </Box>
            {/* Service Modal */}
            {selectedService && (
                <ServiceModal
                    service={selectedService}
                    onClose={handleCloseModal}
                />
            )}
        </Box>
    );
};

export default Home;
