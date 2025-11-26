let permisos = {};

fetch('File_0.json')
  .then(resp => resp.json())
  .then(data => { permisos = data; });

function buscarInformes() {
  const correo = document.getElementById('correoInput').value.trim().toLowerCase();
  let found = false;
  let html = "";

  for (const key in permisos) {
    if (permisos[key].Correo.toLowerCase() === correo) {
      const pdfs = permisos[key].PDF;
      html += "<h3>Informes disponibles:</h3><ul>";
      pdfs.forEach(link => {
        html += `<li><a href="${link}" target="_blank">${link}</a></li>`;
      });
      html += "</ul>";
      found = true;
      break;
    }
  }
  if (!found) html = "<p>No hay informes asociados a ese correo.</p>";

  document.getElementById('resultados').innerHTML = html;
}
