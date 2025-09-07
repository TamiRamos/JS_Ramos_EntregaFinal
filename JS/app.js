// JS/app.js
document.addEventListener('DOMContentLoaded', () => {
  // Inicializamos intentos
  let intentos = 3;

  // Referencias DOM
  const loginForm = document.getElementById('loginForm');
  const usuarioInput = document.getElementById('usuario');
  const passwordInput = document.getElementById('password');
  const errorUsuario = document.getElementById('errorUsuario');
  const errorPassword = document.getElementById('errorPassword');

  // Inicializar usuarios en localStorage si no existen
  async function initUsers() {
    try {
      const has = localStorage.getItem('bm_users');
      if (!has) {
        const res = await fetch('data/users.json');
        if (!res.ok) throw new Error('No se pudo cargar usuarios iniciales');
        const arr = await res.json();
        // Agregar campos utilitarios (saldo y movimientos) si no están
        const enhanced = arr.map(u => ({
          ...u,
          saldo: u.saldo ?? 20000,
          movimientos: u.movimientos ?? []
        }));
        localStorage.setItem('bm_users', JSON.stringify(enhanced));
      }
    } catch (err) {
      // Mostrar alerta y evitar continuar sin datos
      if (typeof Swal !== 'undefined') {
        Swal.fire('Error', 'No se pudieron cargar los datos de usuarios. Revisa la ruta data/usuarios.json y abre con Live Server.', 'error');
      } else {
        alert('No se pudieron cargar los datos de usuarios. Revisa la ruta data/usuarios.json y abre con Live Server.');
      }
      throw err;
    }
  }

  // Ejecutar inicialización (no bloqueante para UI)
  initUsers().catch(() => { /* ya mostrado alerta arriba */ });

  // Helper: obtener usuarios desde localStorage (siempre preferir localStorage)
  function getStoredUsers() {
    const raw = localStorage.getItem('bm_users');
    return raw ? JSON.parse(raw) : [];
  }

  function saveStoredUsers(users) {
    localStorage.setItem('bm_users', JSON.stringify(users));
  }

  // Manejo del submit del login
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const usuario = usuarioInput.value.trim();
      const password = passwordInput.value.trim();

      // Ocultamos errores previos
      errorUsuario.style.display = 'none';
      errorPassword.style.display = 'none';
      errorUsuario.textContent = '';
      errorPassword.textContent = '';

      try {
        // Aseguramos usuarios iniciales cargados en localStorage
        await initUsers();

        // Cargamos desde localStorage (persistencia)
        const usuarios = getStoredUsers();

        const existeUsuario = usuarios.find(u => u.usuario === usuario && u.password === password);

        if (existeUsuario) {
          // Guardar "sesión" (usuario actual) en localStorage
          localStorage.setItem('bm_currentUser', JSON.stringify(existeUsuario));

          // SweetAlert de éxito y redirección
          if (typeof Swal !== 'undefined') {
            Swal.fire({
              title: '¡Éxito!',
              text: 'Has ingresado correctamente. Redirigiendo...',
              icon: 'success',
              showConfirmButton: false,
              timer: 1200
            });
          }
          // Redirigir después de un pequeño delay
          setTimeout(() => {
            window.location.href = 'principal.html';
          }, 1200);
        } else {
          // Credenciales inválidas
          intentos--;
          errorUsuario.style.display = 'block';
          errorUsuario.textContent = 'Usuario y/o contraseña incorrectos';
          errorPassword.style.display = 'block';
          errorPassword.textContent = 'Usuario y/o contraseña incorrectos';

          if (intentos > 0) {
            if (typeof Swal !== 'undefined') {
              Swal.fire('Error', `Usuario o contraseña incorrectos. Te quedan ${intentos} intentos.`, 'error');
            }
          } else {
            if (typeof Swal !== 'undefined') {
              Swal.fire('Bloqueado', 'No tienes más intentos. Intenta nuevamente en 1 hora.', 'warning');
            }
            usuarioInput.disabled = true;
            passwordInput.disabled = true;
            const btn = document.getElementById('loginBtn');
            if (btn) btn.disabled = true;
          }
        }
      } catch (err) {
        // Error de fetch o inicialización
        if (typeof Swal !== 'undefined') {
          Swal.fire('Error', 'Ocurrió un error inesperado al procesar el login.', 'error');
        }
      }
    });
  }
});
