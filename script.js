// Asume que File_0.json está en la misma carpeta
fetch('File_0.json')
  .then(response => response.json())
  .then(data => {
    // Obtén el correo desde el parámetro de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const correo = (urlParams.get('correo') || '').trim().toLowerCase();
    const container = document.getElementById('botones-informes');

    // Busca el objeto que coincida con el correo
    const usuario = data.find(u => (u.CORREO || '').trim().toLowerCase() === correo);

    // Limpia el contenedor
    container.innerHTML = '';

    // Muestra mensaje si no hay correo o no está autorizado
    if (!correo) {
      container.innerHTML = '<div style="color:#d7263d;font-size:1.1em;">No se ha detectado ningún correo.<br>Accede desde el enlace que recibiste.</div>';
      return;
    }

    if (!usuario) {
      container.innerHTML = '<div style="color:#d7263d;font-size:1.1em;">No tienes informes asignados o el correo es incorrecto.</div>';
      return;
    }

    // Si hay PDF(s) genera los botones
    if (Array.isArray(usuario.PDF_SplitResultList) && usuario.PDF_SplitResultList.length > 0) {
      usuario.PDF_SplitResultList.forEach((url, idx) => {
        const btn = document.createElement('a');
        btn.href = url;
        btn.target = '_blank';
        btn.className = 'glass-btn';
        btn.textContent = `Descargar informe #${idx + 1}`;
        container.appendChild(btn);
      });
    } else {
      container.innerHTML = '<div style="color:#777;font-size:1.1em;">No tienes informes para descargar.</div>';
    }
  })
  .catch(() => {
    document.getElementById('botones-informes').innerHTML = '<div style="color:#d7263d;font-size:1.1em;">Error cargando los informes.</div>';
  });
