class UserDto {
    constructor({ name, lastname, email, edad }) {
        this.fullname = `${lastname} ${name}`
        this.edad = edad
        this.user = email

    }
}

export const convertToDto = (user) => {
    if (Array.isArray(user)) {
        const newDato = user.map(user => new UserDto(user))
        return newDato
    } else {
        const newDato = new UserDto(user)
        return newDato
    }
}