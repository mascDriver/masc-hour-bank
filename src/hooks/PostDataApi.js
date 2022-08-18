import {FormatRow} from "../utils/format";

const URL = 'https://maschourbank.vercel.app'

const saveTokenFCM = (tokenPushNotification) => {
    fetch(`${URL}/firebase/devices/`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + access_token
        },
        body: JSON.stringify({
            'registration_id': tokenPushNotification,
            'type': /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
                navigator.userAgent
            ) ? 'android' : 'web',
        }),
    }).then(function (response) {
        console.log(response)
        localStorage.removeItem('tokenPushNotificationSave')
    })
}
const postNewAttendance = (hour, date, setRow) => {
    const access_token = localStorage.getItem('authTokenAcess')
    const attendance_date = new Date(date.toDateString() + ' ' + hour.toTimeString())
    const data = {
        "attendance_hour": attendance_date.toISOString(),
        "employee_shift": 1
    };

    const day = hour.getUTCDate()
    const month = hour.getMonth() + 1
    const year = hour.getFullYear()

    fetch(`${URL}/attendance/day/${day}/month/${month}/year/${year}`,
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': "Bearer " + access_token,
            },
            body: JSON.stringify(data)
        })
        .then(resposta => resposta.json())
        .then(dados => {
            setRow(FormatRow(dados))
        })
};

const postSignIn = (data, enqueueSnackbar) => {
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
}
const postSignUp = (data, enqueueSnackbar, navigate) => {
    fetch(`${URL}/api/register/`,
        {
            method: "POST",
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
            if (dados.email)
                enqueueSnackbar(`Email -> ${dados.email.map(error => error)}`, {variant: 'error'})
            if (dados.password)
                enqueueSnackbar(`Senha -> ${dados.password.map(error => error)}`, {variant: 'error'})
            if (dados.password2)
                enqueueSnackbar(`Confirmação de senha -> ${dados.password2.map(error => error)}`, {variant: 'error'})
        });
}
export {saveTokenFCM, postNewAttendance, postSignIn, postSignUp}