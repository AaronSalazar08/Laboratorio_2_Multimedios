const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .btn-back {
      align-self: flex-start;
      padding: 10px 18px;
      background-color: #00abe1;
      color: #ffffff;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      font-size: 0.85rem;
      transition: transform 0.2s ease, background-color 0.2s ease;
    }

    .btn-back:hover {
      transform: scale(1.05);
      background-color: #6a2a8b;
    }

    .poster {
      width: 450px;
      height: 900px;
      background-color: #eeb84a;
      display: grid;
      grid-template-rows: auto auto 1fr auto;
      padding: 40px 0 20px 0;
      overflow: hidden;
    }

    @scope (.poster) {
      .poster-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        margin-bottom: 30px;
        padding: 0 20px;
      }

      .badge {
        display: inline-block;
        padding: 5px 20px;
        font-weight: 900;
        font-size: 1.8rem;
        color: #ffffff;
        transform: rotate(-3deg);
      }

      .badge-blue   { background-color: #00abe1; transform: rotate(-3deg) translateX(-40px); }
      .badge-white  { background-color: #ffffff; color: #eeb84a; font-size: 1.2rem; transform: rotate(-3deg) translateX(-60px); }
      .badge-purple { background-color: #6a2a8b; transform: rotate(-3deg) translateX(20px); }

      .poster-content {
        text-align: center;
        color: #6a2a8b;
        padding: 0 20px;
      }

      .main-title {
        font-size: 1.5rem;
        font-weight: 400;
        margin-bottom: 5px;
      }

      .sub-title {
        font-size: 2rem;
        font-weight: 900;
        text-transform: uppercase;
      }

      .qr-section {
        margin-top: 10px;
        font-size: 0.8rem;
      }

      .qr-img {
        display: block;
        width: 80px;
        margin: 8px auto 0;
      }

      .poster-visual {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        overflow: hidden;
      }

      .student-photo {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center bottom;
        mask-image: linear-gradient(to top, black 80%, transparent 100%);
      }

      .poster-footer {
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        padding: 15px 20px 0 20px;
      }

      .logo-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
      }

      .logo-main { height: 30px; }

      .divider {
        width: 1px;
        height: 30px;
        background-color: #6a2a8b;
      }

      .logo-text {
        font-size: 0.6rem;
        font-weight: bold;
        width: 80px;
      }

      .logo-sub { font-size: 0.6rem; }
    }
  </style>

  <a class="btn-back" href="/index.html">← Menú</a>

  <div class="poster">
    <header class="poster-header">
      <div class="badge badge-blue">LA SEDE</div>
      <div class="badge badge-white">TE</div>
      <div class="badge badge-purple">ACOMPAÑA</div>
    </header>

    <section class="poster-content">
      <h1 class="main-title">El respeto no se negocia</h1>
      <h2 class="sub-title">¡Pará ya de acosar!</h2>
      <div class="qr-section">
        <p>Si necesitás ayuda, escaneá este QR:</p>
        <img class="qr-img" src="/assets/qr.png" alt="Código QR de ayuda">
      </div>
    </section>

    <section class="poster-visual">
      <img class="student-photo" src="/assets/altov1.png" alt="Estudiantes de la UCR">
    </section>

    <footer class="poster-footer">
      <div class="logo-group">
        <img src="/assets/logoucr.png" alt="UCR Logo" class="logo-main">
        <div class="divider"></div>
        <div class="logo-text">UCR LIBRE DE ACOSO SEXUAL</div>
        <div class="divider"></div>
        <div class="logo-sub"><strong>SG</strong> Sede de Guanacaste</div>
      </div>
    </footer>
  </div>
`;

class UcrCartel extends HTMLElement {
  #shadowIntensity = 0.3;

  static get observedAttributes() {
    return ['back-href'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
    this.#posterEl   = this.shadowRoot.querySelector('.poster');
    this.#backLinkEl = this.shadowRoot.querySelector('.btn-back');
  }

  #posterEl;
  #backLinkEl;

  get backHref() {
    return this.getAttribute('back-href') ?? '/index.html';
  }

  set backHref(value) {
    this.setAttribute('back-href', String(value));
  }

  get shadowIntensity() {
    return this.#shadowIntensity;
  }

  set shadowIntensity(value) {
    this.#shadowIntensity = Math.min(1, Math.max(0, Number(value)));
    this.#applyStyles();
  }

  connectedCallback() {
    this.#applyStyles();
  }

  attributeChangedCallback() {
    this.#applyStyles();
  }

  #applyStyles() {
    this.#posterEl.style.boxShadow = `0 20px 50px rgba(0, 0, 0, ${this.#shadowIntensity})`;
    this.#backLinkEl.href = this.backHref;
  }
}

customElements.define('ucr-cartel', UcrCartel);
