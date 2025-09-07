document.addEventListener('DOMContentLoaded', () => {
  // --- Función para validar email ---
  function esEmailValido(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // --- Referencias a elementos del DOM ---
  const form = document.getElementById('recuperarForm');
  const emailInput = document.getElementById('email');
  const errorEmail = document.getElementById('errorEmail');
  const backBtn = document.getElementById('backBtn');

  // --- Botón volver al login ---
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.location.href = 'index.html'; // Ajustá si login.html/index.html tienen otro nombre
    });
  }

  // --- Ocultar error al tipear ---
  if (emailInput) {
    emailInput.addEventListener('input', () => {
      errorEmail.style.display = 'none';
    });
  }

  // --- Envío del formulario ---
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const email = emailInput.value.trim();

      try {
        if (!esEmailValido(email)) {
          errorEmail.style.display = 'block';
          return;
        }

        const response = await fetch('data/usuarios.json');
        const usuarios = await response.json();
        const existeUsuario = usuarios.find(u => u.email === email);

        if (!existeUsuario) {
          Swal.fire('Error', 'Este email no está registrado.', 'error');
          return;
        }

        Swal.fire({
          title: 'Enviando...',
          text: 'Estamos preparando el enlace de recuperación.',
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false
        });

        setTimeout(() => {
          Swal.close();
          Swal.fire(
            'Enviado',
            `Se envió un enlace de recuperación a ${email}.`,
            'success'
          ).then(() => {
            window.location.href = 'index.html'; // volver al login después de la confirmación
          });
        }, 1400);

      } catch (err) {
        console.error('Error al solicitar recuperación:', err);
        Swal.fire('Error', 'Ocurrió un problema al procesar la solicitud.', 'error');
      } finally {
        console.log('Intento de recuperación para:', email);
      }
    });
  }
});
