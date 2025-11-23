import { useState } from "react";
import { Sidebar } from "./styles";

function Sbar() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("diego.rocha@shopee.com");
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000); // some depois de 2s
  };

  return (
    <Sidebar>
      <img src="/src/assets/logo.png" alt="logo" />

      <div className="lista">

        <div className="titulo">
          <img src="/src/assets/Component.png" alt="componente" />
          <h2>Navegação</h2>
        </div>

        <ul>
          <li>
            <img src="/src/assets/Home.png" alt="home" />
            <a href="#">Home</a>
          </li>

          <li>
            <img src="/src/assets/excel.png" alt="excel" />
            <a href="#">Mapeamento</a>
          </li>

          <li>
            <img src="/src/assets/sheets.png" alt="sheets" />
            <a href="#">Base</a>
          </li>

          <li>
            <img src="/src/assets/Share.png" alt="share" />
            <a href="#">Compartilhar</a>
          </li>

          <li>
            <img src="/src/assets/idioma.png" alt="idioma" />
            <a href="#">Idioma</a>
          </li>
        </ul>
      </div>

      <hr />

      <div className="owner">
        <img src="/src/assets/owner.png" alt="owner" />

        <div className="text">
          <h2>Diego Rocha</h2>
          <p>PIC</p>
        </div>

        {/* TRÊS BOLINHAS */}
        <div
          className="option"
          onClick={() => setOpen(!open)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* MENU DROPDOWN */}
        {open && (
          <div className="menu">
            <button onClick={handleCopy}>
              diego.rocha@shopee.com
            </button>
          </div>
        )}

        {/* POPUP DE COPIADO */}
        {copied && (
          <div className="copy-popup">
            <span className="check">✔</span>
            <p>Email copiado!</p>
          </div>
        )}

      </div>
    </Sidebar>
  );
}

export default Sbar;
