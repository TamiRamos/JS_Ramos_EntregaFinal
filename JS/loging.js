let intentos = 3;

document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const usuario = document.getElementById('usuario').value;
  const password = document.getElementById('password').value;

  try {
    // Cargamos usuarios desde JSON
    const response = await fetch('data/usuarios.json');
    const usuarios = await response.json();

    const existeUsuario = usuarios.find(u => u.usuario === usuario && u.password === password);

    if (existeUsuario) {
      Swal.fire('¡Éxito!', 'Has ingresado correctamente', 'success');
      document.getElementById('errorUsuario').style.display = 'none';
      document.getElementById('errorPassword').style.display = 'none';
    } else {
      intentos--;
      document.getElementById('errorUsuario').style.display = 'block';
      document.getElementById('errorPassword').style.display = 'block';

      if (intentos > 0) {
        Swal.fire('Error', `Usuario o contraseña incorrectos. Te quedan ${intentos} intentos.`, 'error');
      } else {
        Swal.fire('Bloqueado', 'No tienes más intentos. Intenta nuevamente en 1 hora.', 'warning');
        document.getElementById('usuario').disabled = true;
        document.getElementById('password').disabled = true;
        document.getElementById('loginBtn').disabled = true;
      }
    }
  } catch (err) {
    console.error('Error en el login:', err);
    Swal.fire('Error', 'Ocurrió un error inesperado.', 'error');
  } finally {
    console.log('Intentos restantes:', intentos);
  }
});
