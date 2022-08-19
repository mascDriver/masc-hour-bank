import {FormatRow} from "../utils/format";
import {access_token, URL_API} from "../utils/config";

const deleteAttendenceHour = (attendance_hour, data, setRow) => {
    fetch(`${URL_API}/attendance/day/${attendance_hour.id.split('_')[1]}/`,
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