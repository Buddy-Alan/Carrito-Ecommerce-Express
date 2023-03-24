export const validateEmail = (valor) => {
    const datosAValidar = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (datosAValidar.test(valor)) { return true }
    return false
}
