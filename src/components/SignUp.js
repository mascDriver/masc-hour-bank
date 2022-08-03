import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";

const theme = createTheme();
const URL = 'https://masc-hour-bankapi.up.railway.app/'

export default function SignUp() {
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        fetch(`${URL}/api/register/`,
            {
                method: "post",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                        password: data.get('password'),
                        password2: data.get('password2'),
                        email: data.get('email'),
                        username: data.get('email'),
                        first_name: data.get('firstName'),
                        last_name: data.get('lastName'),
                    }
                )
            })
            .then(resposta => {
                if (resposta.ok) {
                    return resposta.json()
                } else {
                    return resposta.json().then(err => {
                        throw err;
                    });
                }
            })
            .then(() => {
                navigate('/signin');
                enqueueSnackbar('Sucesso, efetue o login', {variant: 'success'})
            })
            .catch((dados) => {
                // variant could be success, error, warning, info, or default
                if (dados.email.length)
                    enqueueSnackbar(`Email -> ${dados.email.map(error => error)}`, {variant: 'error'})
                if (dados.password.length)
                    enqueueSnackbar(`Senha -> ${dados.password.map(error => error)}`, {variant: 'error'})
                if (dados.password2.length)
                    enqueueSnackbar(`Confirmação de senha -> ${dados.password2.map(error => error)}`, {variant: 'error'})
            });

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
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
                        Cadastrar
                    </Typography>
                    <Box component="form"  onSubmit={handleSubmit} sx={{mt: 3}}  autoComplete='off'>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Nome"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Sobrenome"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Insira uma senha"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password2"
                                    label="Insira novamente sua senha"
                                    type="password"
                                    id="password2"
                                    autoComplete="new-password2"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Cadastrar
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/signin" variant="body2" component={RouterLink}>
                                    Já possui uma conta? Entre aqui
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}