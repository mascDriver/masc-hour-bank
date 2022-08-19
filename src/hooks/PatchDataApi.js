import {FormatRow} from "../utils/format";

const URL = 'https://masc-hour-bankapi.up.railway.app'
const access_token = localStorage.getItem('authTokenAcess')
const patchAttendancceHour = (attendance_hour, setRow) => {
    var data = {
        id: attendance_hour.id.split('_')[0],
        attendance_hour: attendance_hour.value,
    };

    fetch(`${URL}/attendance/day/${attendance_hour.id.split('_')[1]}/`,
        {
            method: "PATCH",
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

export {patchAttendancceHour}