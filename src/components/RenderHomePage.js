import React from 'react';
import {Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

function RenderHomePage() {
    return (
        <Box>
            <CssBaseline/>
            <Container component="main" sx={{mt: 8, mb: 2}} maxWidth="sm">
                <Typography variant="h2" component="h1" gutterBottom>
                    Masc Hour Bank
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    {'Save your hour attendances and don\'t worry if you need to remember\n'}
                </Typography>
                <Typography variant="body1">Start right now</Typography>
            </Container>
        </Box>
    );
}

export default RenderHomePage;
