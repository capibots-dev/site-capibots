// Aviso de cookies: o Google Analytics só grava cookies depois do "Aceitar".
(function () {
  var CHAVE = 'capibots-cookies';

  function guardado() {
    try { return localStorage.getItem(CHAVE); } catch (e) { return null; }
  }

  function guardar(valor) {
    try { localStorage.setItem(CHAVE, valor); } catch (e) {}
  }

  function mostrar() {
    if (document.getElementById('aviso-cookies')) return;
    var estilo = document.createElement('style');
    estilo.textContent =
      '#aviso-cookies{position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483647;max-width:640px;margin:0 auto;' +
      'background:#fff;color:#1f2937;border:2px solid hsl(25 95% 53%);border-radius:14px;padding:16px;' +
      'box-shadow:0 8px 30px rgba(0,0,0,.25);font:14px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}' +
      '#aviso-cookies p{margin:0 0 12px}' +
      '#aviso-cookies .acoes{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}' +
      '#aviso-cookies button{cursor:pointer;border-radius:8px;padding:8px 16px;font:inherit;font-weight:600;border:2px solid hsl(25 95% 53%)}' +
      '#aviso-cookies .aceitar{background:hsl(25 95% 53%);color:#fff}' +
      '#aviso-cookies .recusar{background:#fff;color:hsl(25 95% 40%)}';
    if (!document.getElementById('aviso-cookies-estilo')) {
      estilo.id = 'aviso-cookies-estilo';
      document.head.appendChild(estilo);
    }

    var aviso = document.createElement('div');
    aviso.id = 'aviso-cookies';
    aviso.setAttribute('role', 'dialog');
    aviso.setAttribute('aria-label', 'Aviso de cookies');
    aviso.innerHTML =
      '<p>🍪 Usamos cookies de estatísticas (Google Analytics) para entender como o site é usado e melhorá-lo. ' +
      'Eles só são ativados se você aceitar. Você pode recusar sem perder nenhum conteúdo.</p>' +
      '<div class="acoes">' +
      '<button type="button" class="recusar">Recusar</button>' +
      '<button type="button" class="aceitar">Aceitar</button></div>';

    function escolher(valor) {
      guardar(valor);
      if (window.gtag) {
        window.gtag('consent', 'update', { analytics_storage: valor });
      }
      aviso.remove();
    }

    aviso.querySelector('.aceitar').onclick = function () { escolher('granted'); };
    aviso.querySelector('.recusar').onclick = function () { escolher('denied'); };
    document.body.appendChild(aviso);
  }

  // Usado pelo link "Preferências de cookies" do rodapé: reabre o aviso para mudar a escolha.
  window.abrirPreferenciasCookies = function () {
    if (document.body) mostrar();
  };

  if (!guardado()) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mostrar);
    else mostrar();
  }
})();
