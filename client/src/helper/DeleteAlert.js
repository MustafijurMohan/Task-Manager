import Swal  from 'sweetalert2'
import { DeleteRequest } from '../APIRequest/ApiRequest';

export const DeleteTodo = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            return DeleteRequest(id)
                .then((res) => {
                    return res
                }),
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                });
        }
      });
}


