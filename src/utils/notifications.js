import swal from 'sweetalert2'

export function showGeneralServerError(){
  swal(
    'Uh, oh!',
    'An error occured while processing your request. Please try again',
    'error'
  )
}

export function showCustomizedError(message, title){
  swal(
    title || 'Uh, oh!',
    message || 'An error occured while processing your request. Please try again',
    'error'
  )
}
