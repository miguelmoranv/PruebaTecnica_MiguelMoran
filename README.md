# Sistema de Punto de Venta

## 🛠 Herramientas utilizadas

- **React (Ionic React)**: Para construir la interfaz de usuario de manera eficiente, con componentes móviles listos para usarse gracias a Ionic.
- **Node.js + Express**: Backend en JavaScript moderno, ideal para manejar rutas API de forma sencilla y rápida.
- **MongoDB + Mongoose**: Base de datos NoSQL flexible, ideal para manejar colecciones de productos, usuarios, compras y carritos sin un esquema rígido.
- **Axios**: Para realizar solicitudes HTTP desde el frontend al backend.
- **React Context API**: Para manejar el estado global del usuario logueado.

## 📁 Estructura de carpetas

/src
/api → Lógica para llamadas HTTP (Axios)
/components → Componentes reutilizables como Tab,
/context → Contextos globales (UserContext, CartContext)
/views → Páginas como Login, Catalogo, Perfil,
/styles → Estilos CSS/SCSS personalizados
App.jsx → Definición de rutas y navegación


En el backend:

/src
/models → Esquemas Mongoose (productos, usuarios, compras)
/controllers → Lógica de negocio para las rutas
/routes → Definición de endpoints de la API
index.js → Inicialización del servidor Express


## 📦 Simulación del almacenamiento de stock

- **Persistente (real)**: El stock se almacena en MongoDB. Cada vez que se realiza una compra, se consulta y descuenta el stock real en la base de datos.
- **Frontend (consulta)**: El cliente obtiene los productos con stock disponible desde la API.
- **Sin conexión (simulación)**: En caso de simulación sin backend, se puede usar `localStorage` para guardar productos y cantidades, aunque **no es el método usado en producción**.

## 🚀 Notas

- Este sistema es extensible a móviles con Capacitor.
- El enfoque modular facilita el mantenimiento y escalabilidad.
