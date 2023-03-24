class CartDto {
    constructor({ id, email, products }) {
        this.id = id
        this.email = email
        this.products = products
    }
}

export const convertCartToDto = (cart) => {
    if (Array.isArray(cart)) {
        const newDato = cart.map(cart => new CartDto(cart))
        return newDato
    } else {
        const newDato = new CartDto(cart)
        return newDato
    }
}