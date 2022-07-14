let spins = haySpins = 0;
const form = document.formulario;
const elZona = el('#zona');
const borrar = el('#borrar');
const enviar = el('#enviar');
borrar.onclick = limpia;
enviar.onclick = e => procesaForm(e);

function el(el) { return document.querySelector(el); }

function limpia() {
  el('#estatus').textContent = '';
  el('#listado').textContent = '';
  el('#estatus').style.display = 'none';
  el('#resulta').style.display = 'none';
}

function procesaForm(e) {
  inactivaBtn(enviar, true);
  limpia();
  if (form.checkValidity()) {
    e.preventDefault();
    if (form.modelo || form.color || form.precio) {
      let params = '';
      if (form.modelo.value.trim()) {
        params += union(params) + 'brand=' + form.modelo.value.trim().toUpperCase();
      }
      if (form.color.value.trim()) {
        params += union(params) + 'color=' + form.color.value.trim().toLowerCase();
      }
      if (form.precio.value) {
        params += union(params) + 'price=' + form.precio.value;
      }
      if (params.length) procesaConsulta(params);
    }
  }
  inactivaBtn(enviar, false);
}

function inactivaBtn(boton, estatus) {
  boton.disabled = estatus;
  boton.setAttribute('aria-disabled', estatus);
}

function union(params) { return (params.length) ? '&' : '?'; }

function procesaConsulta(params) {
  const url = 'http://localhost:3000/search'
  const consulta = (data) => {
    ponEstatus(data.response_code);
    if (!data.response_code) ponRespuesta(data.result);
    inactivaBtn(enviar, false);
  }
  consultaAPI(url + params, consulta);
}

function consultaAPI(ruta, callback) {
  ponSpin(true);
  fetch(ruta)
    .then(respuesta => {
      if (!respuesta.ok) throw Error(respuesta.statusText);
      return respuesta.json();
    })
    .then(data => callback(data))
    .catch(err => {
      console.error(err);
      alert(err);
      inactivaBtn(enviar, false);
    })
    .finally(ponSpin(false));
}

function ponEstatus(codigo) {
  el('#estatus').style.display = 'block';
  el('#estatus').textContent += 'Estatus: ';
  if (codigo) el('#estatus').textContent += 'Sin coincidencias.';
  else el('#estatus').textContent += 'OK.';
}

function ponRespuesta(resultados) {
  el('#resulta').style.display = 'block';
  for (const resultado of resultados) {
    const tr = creaEl(el('#listado'), 'tr');
    for (const valor of Object.values(resultado)) {
      creaEl(tr, 'td', valor);
    }
  }
}

function creaEl(padre, el, contenido = null) {
  let nuevoEl = document.createElement(el);
  if (contenido) nuevoEl.innerHTML = contenido;
  return padre.appendChild(nuevoEl);
}

function ponSpin(estatus) {
  estatus ? spins++ : spins--;
  if (estatus && !haySpins) {
    haySpins = setInterval(compruebaSpin, 300);
    elZona.showModal();
  }
}

function compruebaSpin() {
  if (!spins) {
    clearInterval(haySpins);
    areSpins = 0;
    elZona.close();
  }
}