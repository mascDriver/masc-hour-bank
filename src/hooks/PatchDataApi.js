import {FormatRow} from "../utils/format";
import {access_token, URL_API} from "../utils/config";

const patchAttendancceHour = (attendance_hour, setRow) => {
    const data = {
        id: attendance_hour.id.split('_')[0],
        attendance_hour: attendance_hour.value,
    };

    fetch(`${URL_API}/attendance/day/${attendance_hour.id.split('_')[1]}/`,
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