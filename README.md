# Proyecto Final - JS_Ramos_EntregaFinal

## 🚀 Funcionalidades principales

- **Login de usuario seguro**  
  - Validación de credenciales contra un archivo `usuarios.json`.  
  - Manejo de intentos fallidos con mensajes dinámicos.  
  - Bloqueo del login cuando se superan los intentos.  

- **Transferencias simuladas**  
  - Permite ingresar un monto y un destinatario.  
  - Verifica que el usuario tenga saldo suficiente antes de confirmar.  
  - Descuenta el saldo en tiempo real y muestra un mensaje de confirmación.  

- **Interfaz dinámica**  
  - HTML y CSS responsive.  
  - Generación y actualización de elementos desde JavaScript.  
  - Uso de **SweetAlert2** para notificaciones modernas y atractivas.  

- **Manejo de errores y excepciones**  
  - Bloques `try/catch` para capturar errores en la carga de datos remotos.  
  - Alertas al usuario si ocurre un problema inesperado.  

---

## 📂 Estructura del proyecto

JS.EntegaFinal_Ramos/
│── index.html # Página principal con el login
│── principal.html # Página principal del usuario logueado
│── css/
│ └── styles.css # Estilos del proyecto
│── js/
│ └── app.js # Lógica principal (login, transferencias, validaciones)
│── data/
│ └── usuarios.json # Datos simulados de usuarios (usuario, password, saldo)
│── README.md # Documentación del proyecto

## 👩‍💻 Autora

**Ámbar Tamara Ramos**  
Proyecto final de JavaScript – Coderhouse
