import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Box, Container, Stack } from "@mui/material";

const NotFoundPage = ({ token }) => {
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        textAlign="center"
      >
        <Typography variant="h1" component="div" fontWeight="bold" gutterBottom>
          404
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="textSecondary"
          gutterBottom
        >
          Page Not Found
        </Typography>
        <Typography variant="body1" component="p" color="textSecondary" mb={4}>
          The page you're looking for doesn't exist.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            component={Link}
            onClick={() => {
              localStorage.clear();
            }}
            to="/"
            variant="contained"
            color="primary"
            size="large"
          >
            Go back to Home
          </Button>
          {token && (
            <Button
              component={Link}
              to="/calendar"
              variant="outlined"
              color="secondary"
              size="large"
            >
              Go back to Calendar
            </Button>
          )}
        </Stack>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
