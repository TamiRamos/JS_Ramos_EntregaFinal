# Banco Matrix 🏦

## Descripción

**Banco Matrix** es un proyecto educativo que simula un sistema de acceso bancario online con:

- Login con validación de usuario y contraseña.
- Mensajes de error y confirmación con SweetAlert2.
- Bloqueo temporal después de 3 intentos fallidos.
- Recuperación de contraseña vía email simulado.
- Página principal responsive con tarjetas de información y cierre de sesión.

---

## 📁 Estructura del proyecto

JS.EntegaFinal_Ramos/
│
├── CSS/
│ └── style.css # Estilos generales y responsive
├── JS/
│ ├── app.js # Login y validación
│ └── recuperar.js # Recuperación de contraseña
├── data/
│ └── usuarios.json # Usuarios simulados
├── img/
│ └── LOGO_BM.png # Logo del banco
├── index.html # Login
├── principal.html # Página principal
├── recuperar.html # Recuperación de contraseña
└── README.md # Este archivo


Explicación del proyecto Banco Matrix

El proyecto Banco Matrix es una simulación educativa de un sistema bancario online que permite a los usuarios iniciar sesión, recuperar contraseña y acceder a una página principal básica. Está construido con HTML, CSS, JavaScript y JSON para manejar los datos de usuarios. A continuación se explica la funcionalidad de cada parte:

1️⃣ index.html (Login)

Contiene el formulario de acceso con los campos usuario y contraseña.

Incluye un enlace hacia la página de recuperación de contraseña (recuperar.html).

Cada input tiene un small para mostrar mensajes de error debajo de los campos.

Está diseñado con clases y estilos del archivo style.css para mantener coherencia visual.

Flujo:

El usuario ingresa sus credenciales.

Al hacer click en "Ingresar", el formulario dispara el evento submit que es manejado por app.js.

Si los datos son correctos, se muestra una alerta de éxito y se redirige a principal.html.

Si los datos son incorrectos, se muestran errores bajo los inputs y un SweetAlert indica cuántos intentos quedan. Tras 3 intentos fallidos, se bloquea el login.

2️⃣ principal.html (Página principal)

Es la pantalla de bienvenida tras un login exitoso.

Contiene:

Logo del banco.

Mensaje de bienvenida.

Un botón para cerrar sesión que redirige al login.

El diseño es responsive, usando CSS propio (style.css) y nuevas clases específicas para esta página, manteniendo los estilos generales de todo el proyecto.

Aquí se pueden agregar más funcionalidades como saldo, movimientos y transferencias.

3️⃣ recuperar.html (Recuperación de contraseña)

Contiene un formulario con un campo de email para simular la recuperación de contraseña.

Tiene un botón para volver al login.

Su funcionalidad está gestionada por recuperar.js:

Valida que el email sea correcto y esté registrado en usuarios.json.

Muestra mensajes de error si el email no es válido.

Simula el envío de un enlace de recuperación mediante SweetAlert.

Redirige al login después de mostrar la alerta de éxito.

4️⃣ app.js (Lógica del login)

Controla la validación de inicio de sesión.

Carga los usuarios desde usuarios.json usando fetch.

Compara el usuario y la contraseña ingresados con los datos del JSON.

Maneja los errores mostrando:

Mensajes debajo de los inputs (Usuario y/o contraseña incorrectos).

Alerta SweetAlert con número de intentos restantes.

Bloquea el formulario después de 3 intentos fallidos.

Redirige a principal.html si los datos son correctos.

5️⃣ recuperar.js (Lógica de recuperación)

Valida que el email ingresado tenga formato correcto.

Busca el email en usuarios.json.

Muestra alertas de error si el email no existe o es inválido.

Simula el envío de un enlace de recuperación y redirige al login.

Maneja eventos de botón “Volver al login”.

6️⃣ usuarios.json (Datos de usuarios)

Contiene un array de objetos con:

id: identificador único.

usuario: nombre de usuario.

email: correo del usuario.

password: contraseña.

Simula una base de datos para la validación de login y recuperación de contraseña.

7️⃣ style.css (Estilos)

Contiene estilos generales para todo el proyecto.

Define:

Diseño de login, recuperación y principal.

Inputs, botones, mensajes de error.

Estilos responsive para pantallas pequeñas y medianas.

Clases específicas para la página principal (.container_header, .btn-back, .principal-content).

Mantiene la coherencia visual con colores, tipografía y diseño moderno.

🔑 Resumen del flujo del proyecto

El usuario abre index.html.

Ingresa su usuario y contraseña:

Correcto → SweetAlert de éxito → principal.html.

Incorrecto → Mensajes en rojo + SweetAlert → bloquea tras 3 intentos.

Si olvida la contraseña, puede ir a recuperar.html:

Validación de email → alerta de envío → redirige a login.

Desde principal.html, el usuario puede cerrar sesión y volver al login.

💡 Consideraciones

El proyecto es educativo, no almacena datos reales ni sensibles.

El manejo de usuarios y contraseñas está simulado con JSON, no con base de datos.

SweetAlert2 mejora la experiencia de usuario con alertas modernas y amigables.

El CSS está diseñado para mantener un estilo consistente y responsive en todas las páginas.
