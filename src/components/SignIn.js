import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link as RouterLink} from "react-router-dom";
import Link from "@mui/material/Link";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {useSnackbar} from "notistack";

const URL = 'https://masc-hour-bankapi.up.railway.app'

export default function SignIn() {
    const [open, setOpen] = React.useState(false);

    const {enqueueSnackbar} = useSnackbar();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setOpen(true)
        fetch(`${URL}/api/token/`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                        username: data.get('email'),
                        password: data.get('password')
                    }
                )
            }).catch(() => {
            enqueueSnackbar('Sistema fora do ar', {variant: 'error'})
        }).then(resposta => {
            if (resposta.status === 200) {
                return resposta.json()
            } else {
                return resposta.json().then(err => {
                    throw err;
                });
            }
        }).catch((dados) => {
            // variant could be success, error, warning, info, or default
            if (dados.detail.length)
                enqueueSnackbar(`${dados.detail}`, {variant: 'error'})
        }).then(dados => {
            localStorage.setItem("authTokenAcess", dados.access);
            localStorage.setItem("authTokenRefresh", dados.refresh);
            localStorage.setItem("authFirstName", dados.first_name);
            window.location = '/'
        });
        setOpen(false)
    }

    return (
        <Container component="main" maxWidth="xs">
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={open}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Entrar
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        type="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Lembre-me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Entrar
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/signup" variant="body2" component={RouterLink}>
                                {"Ainda não possui conta? Se inscreva aqui"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}