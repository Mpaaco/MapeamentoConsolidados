import styled from 'styled-components';

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 250px;
  height: 100vh;
  background: #EE4D2D;

  .logo-container {
    padding: 20px;
    margin-bottom: 40px;
  }

  .titulo {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 90%;
    margin-bottom: 10px;
  }

  .titulo.active {
    background: rgba(255, 255, 255, 0.3);
  }

  .titulo h2 {
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-left: 10px;
  }

  .titulo img {
    width: 24px;
    height: 24px;
  }

  .titulo {
    color: white;
    margin-right: 37px;
  }

  .titulo img {
    background: transparent;
    margin-right: 0;
    padding: 0;
    border-radius: 0;
  }

  .lista ul {
    list-style: none;
    padding: 0;
    width: 100%;
  }

  .lista li {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 15px;
    cursor: pointer;
    transition: background-color 0.2s;
    font-size: 14px;
  }

  .lista li:hover {
    background-color: #DA2501;
  }

  .lista li.active {
    background-color: #DA2501;
    border-left: 4px solid white;
    padding-left: 11px;
  }

  .lista img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  .lista a {
    color: white;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
  }

  hr {
    width: 80%;
    height: 1px;
    background: rgba(255, 255, 255, 0.3);
    border: none;
    margin: 20px auto;
  }

  .owner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    position: relative;
    width: 90%;
    padding: 10px 0;
    margin-top: auto; /* Empurra para o final */
    margin-bottom: 20px;
  }

  .owner img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .owner .info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .text {
    color: white;
    flex-grow: 1;
  }

  .text h2 {
    font-size: 14px;
    margin: 0;
  }

  .text p {
    font-size: 12px;
    margin: 0;
    opacity: 0.8;
  }

  .option {
    display: flex;
    flex-direction: column;
    gap: 3px;
    cursor: pointer;
    padding: 5px;
    margin-left: auto;
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
    right: 0;
    bottom: 100%; /* aparece acima do owner */
    transform: translateY(-10px);
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


  .copy-popup {
    position: absolute;
    right: 0;
    top: 10px;
    transform: translateY(-10px);
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
