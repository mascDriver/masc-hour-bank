function FormatRow(dados) {
    return (
        dados.attendance_hour.map(dia => ({
            id: `${dia.id}_${dados.id}`,
            day: dados.day,
            name: dados.employee_shift,
            attendance_hour: dia.hour,
        }))
    )
}
export {FormatRow}