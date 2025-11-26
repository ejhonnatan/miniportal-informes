// Obtén el parámetro de correo de la URL
const params = new URLSearchParams(window.location.search);
const correo = params.get('correo');

// Carga el JSON
fetch('File_0.json')
  .then(response => response.json())
  .then(data => {
    // Busca el usuario por correo
    const usuario = data.find(u => u.CORREO === correo);

    if (usuario) {
      // Genera los enlaces de descarga
      let html = "<h2>Descargar informes</h2>";
      usuario.PDF_SplitResultList.forEach((url, idx) => {
        html += `<p><a href="${url}" target="_blank">Descargar informe #${idx + 1}</a></p>`;
      });
      document.body.innerHTML = html;
    } else {
      document.body.innerHTML = "<h2>No se encontró ningún informe para este correo.</h2>";
    }
  })
  .catch(err => {
    document.body.innerHTML = "<h2>Error cargando datos.</h2>";
  });
