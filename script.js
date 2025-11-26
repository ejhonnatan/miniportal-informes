function getCorreoFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('correo') ? params.get('correo').trim().toLowerCase() : null;
}

fetch('File_0.json')
  .then(resp => resp.json())
  .then(data => mostrarInformes(data))
  .catch(() => {
    document.getElementById('resultados').innerHTML = "<p>Error cargando datos.</p>";
  });

function mostrarInformes(permisos) {
  const correo = getCorreoFromURL();
  let html = "";

  if (!correo) {
    html = "<p>Error: Debes acceder desde el enlace del correo.</p>";
    document.getElementById('resultados').innerHTML = html;
    return;
  }

  let found = false;
  for (const key in permisos) {
    if (permisos[key].Correo.toLowerCase() === correo) {
      const pdfs = permisos[key].Permisos;
      html += "<h3>Informes disponibles:</h3><ul>";
      pdfs.forEach(link => {
        html += `<li><a href="${link}" target="_blank">Descargar informe PDF</a></li>`;
      });
      html += "</ul>";
      found = true;
      break;
    }
  }
  if (!found) html = "<p>No hay informes asociados a ese correo.</p>";
  document.getElementById('resultados').innerHTML = html;
}
