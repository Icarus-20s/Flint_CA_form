import {
    Card,
    CardContent,
    Button,
    Typography,
    Grid2,
    IconButton,
    ButtonBase
} from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SavingsIcon from "@mui/icons-material/Savings";
import CloseIcon from "@mui/icons-material/Close";
import {
    useState,
    useEffect,
} from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const ServiceCard = ({ service, onLearnMore }) => {
    const icons = {
        "Audit & Assurance Service": <BusinessCenterIcon fontSize="large" />,
        "Tax Advisory Services": <AccountBalanceIcon fontSize="large" />,
        "Corporate Advisory Services": <AssessmentIcon fontSize="large" />,
        "Consultancy Services": <SavingsIcon fontSize="large" />,
    };

     return (
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: "flex" }}>
            <ButtonBase
                onClick={() => onLearnMore(service)}
                sx={{ 
                    width: "100%", 
                    height: "100%",
                    textAlign: "left", 
                    borderRadius: 2 
                }}
            >
                <Card 
                    className="modern-service__card" 
                    elevation={3}
                    sx={{ 
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative"
                    }}
                >
                    <div className="modern-service__icon-wrapper">
                        <div className="modern-service__icon">
                            {icons[service.title]}
                        </div>
                    </div>
                    <CardContent 
                        className="modern-service__content"
                        sx={{ 
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="h3"
                            className="modern-service__title"
                        >
                            {service.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            className="modern-service__description"
                            sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                minHeight: "3.6em", // Ensures consistent height for 3 lines
                                lineHeight: 1.2,
                                textAlign: "left"
                            }}
                        >
                            {service.description}
                        </Typography>
                    </CardContent>
                    <div className="modern-service__hover-overlay">
                        <Button
                            className="modern-service__overlay-button"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent double execution
                                onLearnMore(service);
                            }}
                        >
                            View Details
                        </Button>
                    </div>
                </Card>
            </ButtonBase>
        </Grid2>
    );
};

const ServiceModal = ({ service, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true);
        document.body.classList.add("modal-open");

        return () => document.body.classList.remove("modal-open");
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onClose, 300);
    };

    return (
        <div
            className={`modern-modal__overlay ${
                isOpen ? "modern-modal__overlay--open" : ""
            }`}
            onClick={handleClose}
        >
            <div
                className={`modern-modal__content ${
                    isOpen ? "modern-modal__content--open" : ""
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modern-modal__header">
                    <Typography variant="h5">{service?.title}</Typography>
                    <IconButton
                        onClick={handleClose}
                        aria-label="close"
                        className="modern-modal__close"
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className="modern-modal__body">
                    <div className="modern-modal__image-container">
                        <img
                            src={service?.image}
                            alt={service?.title}
                            className="modern-modal__image"
                        />
                    </div>
                    <Typography
                        variant="body1"
                        className="modern-modal__description"
                    >
                        {service?.description}
                    </Typography>

                    <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                        Key Benefits
                    </Typography>
                    <ul className="modern-modal__benefits-list">
                        {service?.benefits?.map((benefit, index) => (
                            <li
                                key={index}
                                className="modern-modal__benefit-item"
                            >
                                <CheckCircleOutlineIcon className="modern-modal__benefit-icon" />{" "}
                                {benefit}
                            </li>
                        )) || (
                            <>
                                <li className="modern-modal__benefit-item">
                                    <CheckCircleOutlineIcon className="modern-modal__benefit-icon" />{" "}
                                    Personalized approach tailored to your
                                    specific needs
                                </li>
                                <li className="modern-modal__benefit-item">
                                    <CheckCircleOutlineIcon className="modern-modal__benefit-icon" />{" "}
                                    Expert team with specialized industry
                                    knowledge
                                </li>
                                <li className="modern-modal__benefit-item">
                                    <CheckCircleOutlineIcon className="modern-modal__benefit-icon" />{" "}
                                    Regular updates and transparent
                                    communication
                                </li>
                                <li className="modern-modal__benefit-item">
                                    <CheckCircleOutlineIcon className="modern-modal__benefit-icon" />{" "}
                                    Compliance with all regulatory requirements
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                <div className="modern-modal__footer"></div>
            </div>
        </div>
    );
};

export {ServiceCard, ServiceModal};