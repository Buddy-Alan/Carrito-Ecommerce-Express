class ProductsDto {
    constructor({ id, title, price, stock }) {
        this.title = title
        this.price = price
        this.stock = stock
    }
}

export const convertProductToDto = (product) => {
    if (Array.isArray(product)) {
        const newDato = product.map(product => new ProductsDto(product))
        return newDato
    } else {
        const newDato = new ProductsDto(product)
        return newDato
    }
}