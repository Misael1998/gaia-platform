import SessionStorageService from '../services/Storage'
import Swal from 'sweetalert2'
export const logout = () => {
  SessionStorageService.removeToken();
  SessionStorageService.removeItem('role');
  window.location.reload();
}

export const cancelOrder = (dispatch, action, history) => {
  Swal.fire({
    title: 'Cancelar pedido',
    text: "¿Esta seguro de cancelar su orden? \n Se perderan todos los datos del carrito",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonColor: '#27ae60',
    confirmButtonColor: '#d33',
    cancelButtonText: 'Continuar con pedido',
    confirmButtonText: 'Cancelar orden'
  }).then(async (result) => {

    if (result.value) {
      dispatch(action());
      await Swal.fire(
        'Cancelar pedido',
        'Se ha cancelado tu pedido.',
        'success'
      )
      
      window.location.reload();
       history.push('/app/products')
    }
  })

}
