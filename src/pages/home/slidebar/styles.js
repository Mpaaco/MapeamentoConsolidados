import styled from 'styled-components';

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 298px;
  height: 100vh;
  background: linear-gradient(to right, #DA2501, #EE4D2D);

  .titulo {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 6px;
    padding: 11px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 90%;
  }

  .titulo h2 {
    color: white;
    margin-right: 37px;
  }

  .titulo img {
    background: white;
    margin-right: 13px;
    padding: 10px;
    border-radius: 100%;
  }

  .lista ul {
    list-style: none;
    padding: 0;
    width: 100%;
  }

  .lista li {
    display: flex;
    align-items: center;
    gap: 30px;
    padding: 20px;
  }

  .lista img {
    margin: 10px;
  }

  .lista a {
    color: white;
    text-decoration: none;
    font-size: 24px;
    font-weight: 500;
  }

  hr {
    width: 225px;
    height: 4px;
    background: white;
    border: none;
  }

  .owner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: relative;
    width: 90%;
  }

  .text {
    color: white;
  }

  .option {
    display: flex;
    flex-direction: column;
    gap: 3px;
    cursor: pointer;
    padding: 5px;
  }

  .option span {
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
  }

  /* MENU DROPDOWN */
  .menu {
    position: absolute;
    left: 100%; /* aparece à direita da sidebar */
    top: 0;
    background: #ffffff;
    padding: 8px 12px;
    border-radius: 6px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.25);
    animation: fadeIn 0.15s ease-out;
    z-index: 10;
  }

  .menu button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: #333;
  }

  /* POPUP DE COPIADO */
  .copy-popup {
    position: absolute;
    left: 100%;
    top: 50px;
    background: #ffffffdd;
    backdrop-filter: blur(6px);
    padding: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    animation: fadeIn 0.2s ease-out;
    font-size: 14px;
    color: #333;
    z-index: 20;
  }

  .copy-popup .check {
    color: #22c55e; /* verde */
    font-size: 18px;
    font-weight: bold;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
