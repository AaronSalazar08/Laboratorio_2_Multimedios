
const ITEMS = [
  'Aulas 5, 6, 7',
  'Apoyo Informático',
  'Servidores',
  'Laboratorio 1 y 2',
  'Coordinación Informática Empresarial',
];

const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
  <style>
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    /* ── Tarjeta ──────────────────────────────────────────────── */

    .card {
      background: linear-gradient(180deg, #003865 0%, #005696 100%);
      width: 90%;
      max-width: 500px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
      animation: slideUp 0.6s ease-out;
    }

    @keyframes slideUp {
      from { transform: translateY(100px); opacity: 0; }
      to   { transform: translateY(0);     opacity: 1; }
    }

    /* ── Navegación ───────────────────────────────────────────── */

    .btn-back {
      display: inline-block;
      padding: 10px 14px;
      color: #87ceeb;
      text-decoration: none;
      font-size: 0.8rem;
      transition: color 0.2s;
    }

    .btn-back:hover { color: #ffffff; }

    /* ── Lista ────────────────────────────────────────────────── */

    .list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .list-item {
      padding: 25px 30px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.2rem;
      font-weight: bold;
      color: #ffffff;
      cursor: pointer;
      transition: background 0.3s;
    }

    .list-item:hover { background: rgba(255, 255, 255, 0.1); }

    .list-item:hover .arrow {
      transform: translateX(10px);
      color: #f1b434;
    }

    .arrow { transition: transform 0.3s, color 0.3s; }

    /* ── Footer ───────────────────────────────────────────────── */

    .footer {
      background: #cccccc;
      padding: 20px;
      text-align: center;
    }

    .logo {
      height: 35px;
      filter: brightness(0.2);
    }
  </style>

  <div class="card">
    <a class="btn-back" href="/index.html">← Menú</a>
    <ul class="list"></ul>
    <div class="footer">
      <img class="logo" src="/assets/logoucr.png" alt="UCR Logo">
    </div>
  </div>
`;

class UcrAulas extends HTMLElement {
  static get observedAttributes() {
    return ['back-href'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
    this.#backLinkEl = this.shadowRoot.querySelector('.btn-back');
    this.#listEl     = this.shadowRoot.querySelector('.list');
    this.#renderItems();
  }

  /** @type {HTMLAnchorElement} */
  #backLinkEl;
  /** @type {HTMLUListElement} */
  #listEl;

  // ── Atributo HTML: back-href (String) ────────────────────────────────────

  /** @returns {string} */
  get backHref() {
    return this.getAttribute('back-href') ?? '/index.html';
  }

  /** @param {string} value */
  set backHref(value) {
    this.setAttribute('back-href', String(value));
  }

  // ── Propiedad JS: itemCount (Number, solo lectura) ───────────────────────

  /**
   * Cantidad de ítems en el directorio.
   * Solo lectura — se deriva del array ITEMS, no se puede asignar.
   * @returns {number}
   */
  get itemCount() {
    return ITEMS.length; // Number, no String
  }

  // ── Lifecycle ────────────────────────────────────────────────────────────

  connectedCallback() {
    this.#backLinkEl.href = this.backHref;
  }

  attributeChangedCallback(name, _old, next) {
    if (name === 'back-href') this.#backLinkEl.href = next ?? '/index.html';
  }

  // ── Privado ──────────────────────────────────────────────────────────────

  #renderItems() {
    this.#listEl.innerHTML = ITEMS.map(label => `
      <li class="list-item">
        <span>${label}</span>
        <span class="arrow">➜</span>
      </li>
    `).join('');
  }
}

customElements.define('ucr-aulas', UcrAulas);
