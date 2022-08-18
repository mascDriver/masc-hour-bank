import {FormatRow} from "../utils/format";

const URL = 'https://maschourbank.vercel.app'
const access_token = localStorage.getItem('authTokenAcess')

const getLogout = () => {
    fetch(`${URL}/attendance/user/logout`)
        .then(response => response)
        .then(data => {
            if (data.ok)
                window.location = '/'
        })
}
const getInitialDate = (setRow, setLoading, enqueueSnackbar, navigate) => {
    const value = new Date()
    const day = value.getUTCDate()
    const month = value.getMonth() + 1
    const year = value.getFullYear()

    fetch(`${URL}/attendance/day/${day}/month/${month}/year/${year}`,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': "Bearer " + access_token,
            }
        })
        .then((resposta) => {
            if (resposta.ok)
                return resposta.json()
            else if (resposta.status === 401) {
                navigate('/signin');
                enqueueSnackbar('Sessão expirada, efetue o login', {variant: 'warning'})
            }
        })
        .then(dados => {
            if (dados) {
                setRow(FormatRow(dados[0]))
            }
            setLoading(false)
        })
}
const getAttendanceDate = (value, setRow, navigate, enqueueSnackbar) => {
    const day = value.getUTCDate()
    const month = value.getMonth() + 1
    const year = value.getFullYear()

    fetch(`${URL}/attendance/day/${day}/month/${month}/year/${year}`,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': "Bearer " + access_token,
            }
        })
        .then((resposta) => {
            if (resposta.ok)
                return resposta.json()
            else if (resposta.status === 401) {
                navigate('/signin');
                enqueueSnackbar('Sessão expirada, efetue o login', {variant: 'warning'})
            }
        }).then(dados => {
        if (dados) {
            setRow(FormatRow(dados[0]))
        } else {
            setRow([])
        }
    })
}

const getInitialMonth = (month, year, setMes, navigate, enqueueSnackbar) => {
    fetch(`${URL}/attendance/month/${month}/year/${year}`,
        {
            method: "GET",
            credentials: "same-origin",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': "Bearer " + access_token,
            }
        })
        .then((resposta) => {
            if (resposta.ok)
                return resposta.json()
            else if (resposta.status === 401) {
                navigate('/signin');
                enqueueSnackbar('Sessão expirada, efetue o login', {variant: 'warning'})
            }
        }).then(dados => {
        setMes(dados)
    })
}

export {getLogout, getInitialDate, getAttendanceDate, getInitialMonth}