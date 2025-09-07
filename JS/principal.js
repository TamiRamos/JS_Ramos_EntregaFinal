// JS/principal.js
document.addEventListener('DOMContentLoaded', () => {

  // Helpers para localStorage
  function getUsers() {
    const raw = localStorage.getItem('bm_users');
    return raw ? JSON.parse(raw) : [];
  }
  function saveUsers(users) {
    localStorage.setItem('bm_users', JSON.stringify(users));
  }
  function getCurrentUser() {
    const raw = localStorage.getItem('bm_currentUser');
    return raw ? JSON.parse(raw) : null;
  }
  function saveCurrentUser(user) {
    localStorage.setItem('bm_currentUser', JSON.stringify(user));
  }

  // Elementos DOM
  const infoCardsContainer = document.getElementById('infoCardsContainer');
  const headerWelcome = document.getElementById('header-welcome');
  const headerUser = document.getElementById('header-user');
  const transferForm = document.getElementById('transferForm');
  const toUsuarioInput = document.getElementById('toUsuario');
  const amountInput = document.getElementById('amount');
  const detailInput = document.getElementById('detail');
  const transferError = document.getElementById('transferError');
  const movementsList = document.getElementById('movementsList');
  const refreshBtn = document.getElementById('refreshBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  // Si no hay sesión activa, volvemos al login
  const current = getCurrentUser();
  if (!current) {
    window.location.href = 'index.html';
    return;
  }

  // Función para renderizar datos principales (saldo, resumen)
  function renderPrincipal() {
    const user = getCurrentUser();
    const users = getUsers();
    // actualizar current desde users (por si hubo cambios)
    const freshUser = users.find(u => u.usuario === user.usuario) || user;
    saveCurrentUser(freshUser);

    headerWelcome.textContent = `Bienvenido, ${freshUser.usuario}`;
    headerUser.textContent = `Usuario: ${freshUser.usuario}`;

    // Render cards: saldo, últimos movimientos, info de transferencia
    infoCardsContainer.innerHTML = '';

    // Saldo card
    const saldoCard = document.createElement('div');
    saldoCard.className = 'card';
    saldoCard.innerHTML = `<h2>Saldo actual</h2><p style="font-size:1.6rem; font-weight:700;">$${Number(freshUser.saldo).toLocaleString()}</p>`;
    infoCardsContainer.appendChild(saldoCard);

    // Movimientos summary
    const movimientos = freshUser.movimientos || [];
    const movCard = document.createElement('div');
    movCard.className = 'card';
    movCard.innerHTML = `<h2>Últimos movimientos</h2>
      <ul style="list-style:none; padding-left:0; margin:0;">
        ${movimientos.slice(0,5).map(m => `<li style="padding:8px 0; border-bottom:1px solid #eee;">
          <strong>${m.fecha.split('T')[0]}</strong> - ${m.detalle || m.tipo} - <span style="font-weight:700;">$${m.monto}</span>
        </li>`).join('') || '<li>No hay movimientos</li>'}
      </ul>`;
    infoCardsContainer.appendChild(movCard);

    // Info de ayuda
    const helpCard = document.createElement('div');
    helpCard.className = 'card';
    helpCard.innerHTML = `<h2>Transferencias</h2><p>Usá el formulario para enviar dinero a otro usuario registrado. Se validará saldo disponible.</p>`;
    infoCardsContainer.appendChild(helpCard);

    // Render historial completo
    renderMovementsList(freshUser.movimientos || []);
  }

  // Render lista de movimientos completa
  function renderMovementsList(movimientos) {
    movementsList.innerHTML = '';
    if (!movimientos || movimientos.length === 0) {
      movementsList.innerHTML = '<li>No hay movimientos registrados.</li>';
      return;
    }
    movimientos.forEach(m => {
      const li = document.createElement('li');
      li.style.padding = '10px 0';
      li.style.borderBottom = '1px solid #eee';
      li.innerHTML = `<div style="display:flex; justify-content:space-between; gap:10px;">
        <div>
          <div style="font-weight:600;">${m.detalle || m.tipo}</div>
          <div style="font-size:0.9rem; color:#666;">${m.fecha.split('T')[0]}</div>
        </div>
        <div style="font-weight:700;">$${m.monto}</div>
      </div>`;
      movementsList.appendChild(li);
    });
  }

  // Función para procesar transferencia
  function processTransfer(toUsuario, amount, detalle) {
    const users = getUsers();
    const senderIndex = users.findIndex(u => u.usuario === current.usuario);
    const receiverIndex = users.findIndex(u => u.usuario === toUsuario);

    if (receiverIndex === -1) {
      throw new Error('Usuario destino no encontrado');
    }
    if (amount <= 0) {
      throw new Error('Ingrese un monto válido mayor a 0');
    }
    if (users[senderIndex].saldo < amount) {
      throw new Error('Saldo insuficiente');
    }

    const now = new Date().toISOString();

    // Actualizar saldos
    users[senderIndex].saldo = Number(users[senderIndex].saldo) - Number(amount);
    users[receiverIndex].saldo = (Number(users[receiverIndex].saldo) || 0) + Number(amount);

    // Crear movimientos
    users[senderIndex].movimientos = users[senderIndex].movimientos || [];
    users[receiverIndex].movimientos = users[receiverIndex].movimientos || [];

    users[senderIndex].movimientos.unshift({
      tipo: 'Debito',
      monto: amount,
      fecha: now,
      detalle: `Transferencia a ${toUsuario} - ${detalle || 'sin detalle'}`
    });

    users[receiverIndex].movimientos.unshift({
      tipo: 'Credito',
      monto: amount,
      fecha: now,
      detalle: `Transferencia de ${current.usuario} - ${detalle || 'sin detalle'}`
    });

    // Guardar cambios y actualizar currentUser
    saveUsers(users);
    const updatedSender = users.find(u => u.usuario === current.usuario);
    saveCurrentUser(updatedSender);

    return updatedSender;
  }

  // Events
  if (transferForm) {
    transferForm.addEventListener('submit', (e) => {
      e.preventDefault();
      transferError.style.display = 'none';
      transferError.textContent = '';

      const toUsuario = toUsuarioInput.value.trim();
      const amount = Number(amountInput.value);
      const detalle = detailInput.value.trim();

      try {
        if (!toUsuario) throw new Error('Ingresá el usuario destino');
        if (!amount || amount <= 0) throw new Error('Ingresá un monto válido');

        const updated = processTransfer(toUsuario, amount, detalle);

        // Éxito
        if (typeof Swal !== 'undefined') {
          Swal.fire('Enviado', `Se transfirió $${amount} a ${toUsuario}`, 'success');
        }
        // Limpiar campos
        toUsuarioInput.value = '';
        amountInput.value = '';
        detailInput.value = '';

        // Re-render
        renderPrincipal();
      } catch (err) {
        transferError.style.display = 'block';
        transferError.textContent = err.message;
        if (typeof Swal !== 'undefined') {
          Swal.fire('Error', err.message, 'error');
        }
      }
    });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      renderPrincipal();
      if (typeof Swal !== 'undefined') {
        Swal.fire('Actualizado', 'Datos actualizados', 'info');
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      // Limpiar sesión local (no borrar bm_users)
      localStorage.removeItem('bm_currentUser');
      // redirigir al login
      window.location.href = 'index.html';
    });
  }

  // Render inicial
  renderPrincipal();
});
