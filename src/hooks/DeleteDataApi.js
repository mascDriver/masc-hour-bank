import {FormatRow} from "../utils/format";

const URL = 'https://masc-hour-bankapi.up.railway.app'
const access_token = localStorage.getItem('authTokenAcess')

const deleteAttendenceHour = (attendance_hour, data, setRow) => {
    fetch(`${URL}/attendance/day/${attendance_hour.id.split('_')[1]}/`,
        {
            method: "DELETE",
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
}
export {deleteAttendenceHour}