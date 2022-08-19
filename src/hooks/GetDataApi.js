import {FormatRow} from "../utils/format";
import {access_token, URL_API} from "../utils/config";

const getLogout = () => {
    fetch(`${URL_API}/attendance/user/logout`)
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

    fetch(`${URL_API}/attendance/day/${day}/month/${month}/year/${year}`,
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
                if (new Array(dados).length)
                    setRow(FormatRow(dados[0]))
                else
                    setRow([])
            }
            setLoading(false)
        })
}
const getAttendanceDate = (value, setRow, navigate, enqueueSnackbar) => {
    const day = value.getUTCDate()
    const month = value.getMonth() + 1
    const year = value.getFullYear()

    fetch(`${URL_API}/attendance/day/${day}/month/${month}/year/${year}`,
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
            if (new Array(dados).length)
                setRow(FormatRow(dados[0]))
            else
                setRow([])
        } else {
            setRow([])
        }
    })
}

const getInitialMonth = (month, year, setMes, navigate, enqueueSnackbar) => {
    fetch(`${URL_API}/attendance/month/${month}/year/${year}`,
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