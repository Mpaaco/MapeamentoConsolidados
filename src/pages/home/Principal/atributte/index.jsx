import { useEffect, useState, useMemo } from "react";
import { Search } from "react-feather";

return (
    <div className="attributeFilter">
        <div className="attributeHeader">
            <div className="title">
                <h1>Mapeamento de Atributos</h1>
            </div>
            <div className="search">
                <input type="text" placeholder="Pesquise por Categoria, Atributo ou o ID de cada um..." />
            </div>
        </div>
        <div className="filter">
            <select name = "idioma"id="">
                <option value=""> Selecione o Idioma</option>               
            </select>
            <select name="Categoria" id="">
                <option value="">Selecione a Categoria</option>
            </select>
            <select name="Atributo" id="">
                <option value="">Selecione o Atributo</option>
            </select>
        </div>
        <hr />
        <div className="statusAtributo">
            <h2>Status</h2>
            <p>Mandatório</p>
        </div>

    </div>
)

export default attribut;