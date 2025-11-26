// script.js

function getCorreoFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('correo') || '';
}

fetch('File_0.json')
  .then(res => res.json())
  .then(data => {
    const correo = getCorreoFromURL().toLowerCase();
    const usuario = data.find(d => (d.CORREO || '').toLowerCase() === correo);

    const container = document.getElementById('botones-informes');
    container.innerHTML = '';

    if (!usuario || !usuario.PDF_SplitResultList || usuario.PDF_SplitResultList.length === 0) {
      container.innerHTML = "<div style='color:#d74b4b; font-size:1.1em;'>No tienes informes para descargar</div>";
      return;
    }

    usuario.PDF_SplitResultList.forEach((url, idx) => {
      const a = document.createElement('a');
      a.className = "boton-informe";
      a.href = url;
      a.target = "_blank";
      a.textContent = `Descargar informe #${idx + 1}`;
      container.appendChild(a);
      container.appendChild(document.createElement('br'));
    });
  })
  .catch(() => {
    document.getElementById('botones-informes').innerHTML = "<div style='color:#d74b4b;'>Error cargando datos</div>";
  });
