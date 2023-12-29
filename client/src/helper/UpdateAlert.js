import Swal from 'sweetalert2'
import { UpdateStatusRequest } from '../APIRequest/ApiRequest'

export const UpdateTodo = (id, status) => {
    return Swal.fire({
        title: 'Change Status',
        input: 'select',
        inputOptions: {New: 'New', Completed: 'Completed', Canceled: 'Canceled', Progress: 'Progress'},
        inputValue: status
    }).then((result) => {
        UpdateStatusRequest(id, result.value)
        .then((res) => {
            return res
        })
    })
}

