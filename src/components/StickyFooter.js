import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import {Icon} from "@iconify/react/dist/iconify";
import githubIcon from '@iconify-icons/mdi/github';
import {deepOrange, orange} from '@mui/material/colors';
import {useSnackbar} from "notistack";
import {onMessage} from "firebase/messaging";
import {messaging} from "../push-notification";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © mascDriver '}
            <Link href='https://github.com/mascDriver' color="inherit" target="_blank">
                <Icon icon={githubIcon}/>
                Github
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function StickyFooter() {
    const {enqueueSnackbar} = useSnackbar();
    onMessage(messaging, (payload) => {
        enqueueSnackbar(payload.notification.body, {variant: 'info', preventDuplicate: true})
    })
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '65.3vh'
            }}
        >
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? deepOrange[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body1">
                        Powered by mascDriver.
                    </Typography>
                    <Copyright/>
                </Container>
            </Box>
        </Box>
    );
}