# Backend Setup Instructions

## Prerequisites
1. Install Node.js and npm.
2. Create a `.env` file in the `backendtemplate` directory with the following variables:
   ```env
   # Replace the value of MONGO_URI with your Atlas connection string (user:pass@cluster)
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
   JWT_SECRET=SUPER_SECRET_JWT_987
   PORT=5000
   ```

## Steps to Run the Backend
1. Navigate to the `backendtemplate` directory.
2. Run `npm install` to install dependencies.
3. Run `node config/adminSetup.js` to create the admin user.
4. Start the server with `npm start`.
   - For development with auto-reload use `npm run server` (requires `nodemon`).

## API Endpoints

### User Routes
- **POST** `/api/users/register`: Register a new user.
- **POST** `/api/users/login`: Authenticate a user.

### Review Routes
- **POST** `/api/reviews`: Create a new review (requires authentication).
- **PUT** `/api/reviews/:id/admin-comment`: Add an admin comment to a review (admin only).
- **DELETE** `/api/reviews/:id`: Delete a review (admin only).

## Estructura / Qué incluye el proyecto
- Rutas: [routes/usersRoutes.js](routes/usersRoutes.js) y [routes/reviewsRoutes.js](routes/reviewsRoutes.js)
- Controladores: [controllers/usersController.js](controllers/usersController.js) y [controllers/reviewsController.js](controllers/reviewsController.js)
- Modelos: [models/usersModel.js](models/usersModel.js) y [models/reviewsModel.js](models/reviewsModel.js)
- Middlewares: autenticación y autorización en [middleware/authMiddleware.js](middleware/authMiddleware.js)
- Archivos de configuración: [config/db.js](config/db.js) y [config/adminSetup.js](config/adminSetup.js)

## Variables de entorno necesarias
- `MONGO_URI` : Cadena de conexión a MongoDB Atlas.
- `JWT_SECRET` : Secreto para firmar tokens JWT.
- `PORT` : Puerto donde correrá el servidor.

## Instrucciones exactas para Postman (copia/pega)
Sugerencia: crea un Environment en Postman con la variable `baseUrl` = `http://localhost:5000`.

1) Registrar usuario (registro)
- Method: POST
- URL: `{{baseUrl}}/api/users/register`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```
{
   "name": "Test User",
   "email": "test@example.com",
   "password": "test123"
}
```

2) Login (obtener token)
- Method: POST
- URL: `{{baseUrl}}/api/users/login`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```
{
   "email": "test@example.com",
   "password": "test123"
}
```
- Response esperado: JSON con campo `token`. Copia el token para los requests protegidos.

3) Crear una review (usuario autenticado)
- Method: POST
- URL: `{{baseUrl}}/api/reviews`
- Headers:
   - `Content-Type: application/json`
   - `Authorization: Bearer {{token}}` (reemplaza `{{token}}` por el token recibido en el login)
- Body (raw JSON):
```
{
   "recipe": "Tacos al pastor",
   "rating": 5,
   "comment": "Excelente receta"
}
```

4) Agregar comentario de admin a una review (admin only)
- Method: PUT
- URL: `{{baseUrl}}/api/reviews/:id/admin-comment`  (reemplaza `:id` por el `_id` de la review)
- Headers:
   - `Content-Type: application/json`
   - `Authorization: Bearer {{admin_token}}`
- Body (raw JSON):
```
{
   "adminComment": "Gracias por compartir"
}
```

5) Borrar una review (admin only)
- Method: DELETE
- URL: `{{baseUrl}}/api/reviews/:id`
- Headers:
   - `Authorization: Bearer {{admin_token}}`

## Cómo obtener el token de admin
1. Ejecuta `node config/adminSetup.js` (crea un usuario admin si no existe).
2. Las credenciales que crea el script por defecto son:
    - Email: `MAGICS`
    - Password: `M_86pn`
3. Haz login con esas credenciales en Postman en `{{baseUrl}}/api/users/login` y copia el `token` como `{{admin_token}}`.

## Ejecución (comandos)
1. Instalar dependencias:
```
npm install
```
2. Crear `.env` con las variables (ver sección "Prerequisites").
3. Crear admin (opcional si quieres probar admin flows):
```
node config/adminSetup.js
```
4. Correr en desarrollo (recomendado):
```
npm run server
```
5. Correr en producción / sin nodemon:
```
npm start
```

## Qué incluir en el PDF de entrega
- Captura de Postman: respuesta del endpoint `POST /api/users/register`.
- Captura de Postman: respuesta del endpoint `POST /api/users/login` mostrando el `token`.
- Captura de Postman: creación de review `POST /api/reviews` con token de usuario.
- Captura de Postman: `PUT /api/reviews/:id/admin-comment` (respuesta) con token admin.
- Captura de Postman: `DELETE /api/reviews/:id` (respuesta) con token admin.
- URL del repo público de GitHub (escribe la URL exacta).
- URL de deployment (Render/Cyclic) donde se desplegó el backend.

## Troubleshooting rápido
- Si `POST /api/users/login` devuelve error porque no existe `matchPassword`, añade el siguiente método en `models/usersModel.js` justo después de la definición del pre-save (antes de `const User = mongoose.model...`):
```
// Añadir método para comparar contraseñas
userSchema.methods.matchPassword = async function(enteredPassword) {
   const bcrypt = require('bcryptjs');
   return await bcrypt.compare(enteredPassword, this.password);
};
```
- Si hay errores de conexión a MongoDB, revisa que `MONGO_URI` en tu `.env` sea la cadena completa de Atlas (incluye usuario, contraseña y base de datos).

## Notas finales
- Yo no subiré el repo ni haré deploy; tú te encargas de crear el repo público en GitHub y desplegar en Render o Cyclic.
- Una vez subido y desplegado, actualiza las URLs en el PDF de entrega.

## Notes
- Use Postman to test the endpoints.
- Ensure MongoDB is running and the connection string is correct.
- Provide the `MONGO_URI` and `JWT_SECRET` values to complete the setup.