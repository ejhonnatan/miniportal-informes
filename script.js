// Obtiene el correo de la URL (?correo=ejhonnatan@hotmail.com)
function getCorreoFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('correo') ? params.get('correo').trim().toLowerCase() : null;
}

fetch('File_0.json')
  .then(resp => resp.json())
  .then(data => mostrarInformes(data));

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
    // Cambia a .Correo o .CORREO según el nombre en tu JSON
    if (permisos[key].Correo.toLowerCase() === correo) {
      const pdfs = permisos[key].PDF;  // Cambia a .PDF o .Permisos según el nombre en tu JSON
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


