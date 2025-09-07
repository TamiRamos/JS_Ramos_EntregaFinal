document.addEventListener('DOMContentLoaded', () => {
  let intentos = 3;

  const loginForm = document.getElementById('loginForm');
  const usuarioInput = document.getElementById('usuario');
  const passwordInput = document.getElementById('password');
  const errorUsuario = document.getElementById('errorUsuario');
  const errorPassword = document.getElementById('errorPassword');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = usuarioInput.value.trim();
    const password = passwordInput.value.trim();

    errorUsuario.style.display = 'none';
    errorPassword.style.display = 'none';

    try {
      const response = await fetch('data/users.json')
      const usuarios = await response.json();

      const existeUsuario = usuarios.find(u => u.usuario === usuario && u.password === password);

      if (existeUsuario) {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Has ingresado correctamente. Redirigiendo...',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });

        setTimeout(() => {
          window.location.href = 'principal.html';
        }, 1500);
      } else {
        intentos--;
        errorUsuario.style.display = 'block';
        errorUsuario.textContent = 'Usuario y/o contraseña incorrectos';
        errorPassword.style.display = 'block';
        errorPassword.textContent = 'Usuario y/o contraseña incorrectos';

        if (intentos > 0) {
          Swal.fire('Error', `Usuario o contraseña incorrectos. Te quedan ${intentos} intentos.`, 'error');
        } else {
          Swal.fire('Bloqueado', 'No tienes más intentos. Intenta nuevamente en 1 hora.', 'warning');
          usuarioInput.disabled = true;
          passwordInput.disabled = true;
          document.getElementById('loginBtn').disabled = true;
        }
      }
    } catch (err) {
      console.error('Error en el login:', err);
      Swal.fire('Error', 'Ocurrió un error inesperado.', 'error');
    }
  });
});
