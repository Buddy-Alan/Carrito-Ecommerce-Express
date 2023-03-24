# Proyecto Con Express

## _Carrito de Compras con Express_
El Carrito hecho con express, es una aplicación para interactuar con postamn y se utiliza para simular agregar productos, crear usuarios, y agregar productos por usuarios Para realizar esta aplicación se utilizo:

- JavaScript
- MongoDB
- MySql
- Express
- DotEnv

La aplicación cuenta con rutas para acceder a :

- Usuarios
- Productos
- Carritos Por usuario.

## Usuarios.

Cuenta con 5 Rutas.

# Peticion de todos los usuarios

Para la petición de usuarios, se requiere un rol de administrado, actualmente el rol se cambia a partir de la variable de entorno. La variable de entorno a tener en cuenta es la siguiente: rol = "ADMIN"

_Ruta Get_ ("/api/user/allUser") =>Devuelve todos los usuarios de la base de datos, solo si tiene el rol de
Administrador.

# Peticion de usuario por ID

_Ruta Get_ ("/api/user/:id") => Devuelve usuario por Id, solo si se tiene rol
administrador.

# Creacion de usuario

_Ruta Post_ ("/api/user/create") => Se utiliza para crear los usuarios. Los
datos a mandar por postamn son: { "name": String, "lastname": String,
"edad":String, "email": String, "password": String }

# Login de usuario para obtener un token

_Ruta Post_ ("/api/user/login") => Se utiliza para simular un logueo y que envie un token para posteriormente poder trbajar con el resto de las rutas. 
Datos a enviar: { "email": String, "password": String }

# Actualizacion de datos de usuario

_Ruta Put_("/api/user/update") => Se envian los datos que el usuario requiere actualizar, es importante tener el token para poder trabajar. Se pueden actualizar los siguientes datos: { "name": String, "lastname": String, "edad": String, "password": String }

## Porductos.

Cuenta con 4 Rutas

# Creacion de productos 
_Ruta Post_("/api/products") => Se envian los siguientes datos para crear un producto: { "title": String, "price": Int, "thumbnail": String, "descripcion": String, "stock": Int, "codigo": String }

# Peticion de productos.

_Ruta Get_("/api/products") => Te devuelve todos los productos del ecommerce
guardados en la BD.

# Actualizacion de datos de productos.

_Ruta Put_("api/products/:id") => Actualiza productos por ID. Los datos a
actualizar pueden ser: { "title": String, "price": Int, "thumbnail": String,
"descripcion": String, "stock": Int, "codigo": String }

# Peticion de productos por ID

_Ruta Get_ ("api/products/:id") => Devuelve un producto por ID.

## Carritos por usuario.

Cuenta con 4 Rutas MUY IMPORTANTE, tener el token de usuario para poder
trabajar.

# Guardado de productos en el carrito

_Ruta Post_ ("/api/cart/products") => Guarda un producto en el carrito del
usuario (El usuario es tomado por el token). Se envia el id del producto a
guardar, ejemplo: { "id": String }

# Peticion de carrito por usuario

_Ruta Get_ ("/api/cart") => Nos devuelve el carrito del usuario (El usuario es
tomado por el token).

# Peticion de todos los carritos

_Ruta Get_ ("/api/allCarts") => nos devuelve todo los carritos, MUY IMPORTANTE,
debe figurar el rol = "ADMIN" en las el dotEnv

# Borrar un producto del carrito

_Ruta Delete_("/api/cart/products/:id") => Borra el producto del carrito del
usuario POR ID (El usuario es tomado por el token).
