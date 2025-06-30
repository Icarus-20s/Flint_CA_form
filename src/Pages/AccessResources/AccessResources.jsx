import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid2,
    Chip,
    Box,
    Button,
    CircularProgress,
    Divider,
    CardHeader,
    CardActions,
    IconButton,
    Tooltip,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import GetAppIcon from "@mui/icons-material/GetApp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import api from "../../Api/api.jsx";

const AccessResources = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        api.get("notices/")
            .then((response) => {
                setNotices(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching notices:", error);
                setError("Failed to load notices. Please try again later.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3, textAlign: "center" }}>
                <Typography color="error" variant="h6">
                    {error}
                </Typography>
                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => window.location.reload()}
                >
                    Retry
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3, maxWidth: "1200px", mx: "auto" }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontWeight: 700,
                    mb: 4,
                    borderBottom: "2px solid #1976d2",
                    pb: 1,
                }}
            >
                <DescriptionIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Official Notices
            </Typography>

            {notices.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: "center", py: 5 }}>
                    No notices available at this time.
                </Typography>
            ) : (
                <Grid2 container spacing={3}>
                    {notices.map((notice) => (
                        <Grid2 size={{ xs: 12, md: 6, lg: 4 }} key={notice.id}>
                            <Card
                                elevation={2}
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    transition:
                                        "transform 0.2s, box-shadow 0.2s",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                                    },
                                }}
                            >
                                <CardHeader
                                    title={notice.title}
                                    titleTypographyProps={{
                                        variant: "h6",
                                        fontWeight: 600,
                                    }}
                                    subheader={
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                mt: 1,
                                            }}
                                        >
                                            <CalendarTodayIcon
                                                fontSize="small"
                                                sx={{
                                                    mr: 1,
                                                    color: "text.secondary",
                                                }}
                                            />
                                            <Typography
                                                variant="subtitle2"
                                                color="text.secondary"
                                            >
                                                {new Date(
                                                    notice.date
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </Typography>
                                        </Box>
                                    }
                                />

                                {notice.pdf && (
                                    <Box
                                        sx={{
                                            mx: 2,
                                            mb: 2,
                                            p: 1.5,
                                            bgcolor: "#f5f9ff",
                                            border: "1px solid #e1efff",
                                            borderRadius: 1,
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <DescriptionIcon color="primary" />
                                            <Typography
                                                variant="body2"
                                                sx={{ ml: 1, fontWeight: 500 }}
                                            >
                                                Document Available
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Tooltip title="View Document">
                                                <IconButton
                                                    href={notice.pdf}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    size="small"
                                                    color="primary"
                                                >
                                                    <VisibilityIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Download Document">
                                                <IconButton
                                                    href={notice.pdf}
                                                    download
                                                    size="small"
                                                    color="primary"
                                                >
                                                    <GetAppIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                )}

                                <Divider sx={{ mx: 2 }} />

                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="body2" sx={{ mb: 2 }}>
                                        {notice.description}
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 1,
                                            flexWrap: "wrap",
                                            mt: 2,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <LocalOfferIcon
                                                fontSize="small"
                                                sx={{
                                                    mr: 0.5,
                                                    color: "primary.main",
                                                }}
                                            />
                                        </Box>
                                        <Chip
                                            label={notice.tag}
                                            color="primary"
                                            size="small"
                                            sx={{ fontWeight: 500 }}
                                        />
                                        {notice.tag_type && (
                                            <Chip
                                                label={notice.tag_type}
                                                color="secondary"
                                                size="small"
                                                sx={{ fontWeight: 500 }}
                                            />
                                        )}
                                    </Box>
                                </CardContent>

                                {notice.pdf && (
                                    <CardActions
                                        sx={{
                                            justifyContent: "flex-end",
                                            p: 2,
                                            pt: 0,
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            href={notice.pdf}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            size="small"
                                            startIcon={<VisibilityIcon />}
                                            sx={{ textTransform: "none" }}
                                        >
                                            View Full Document
                                        </Button>
                                    </CardActions>
                                )}
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
            )}
        </Box>
    );
};

export default AccessResources;
