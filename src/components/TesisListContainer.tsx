"use client";

import { useState } from "react";
import { listaTesis, Tesis, SECCIONES } from "../data/tesis";
import TesisCard from "./TesisCard";

export default function TesisListContainer() {
  const [seccionSeleccionada, setSeccionSeleccionada] = useState<string>("TODAS");

  const handleSolicitarPorGmail = (tesis: Tesis) => {
    const destinatario = "uesmagalyruiz03@gmail.com";
    const asunto = `Solicitud de Tesis: ${tesis.titulo}`;
    const cuerpo = `Estimado equipo de la biblioteca,

Me gustaría solicitar acceso al documento completo de la siguiente tesis:

- Título: ${tesis.titulo}
- Autor: ${tesis.autor}
- Sección: ${tesis.seccion}
- Año: ${tesis.anio}
- ID de Tesis: ${tesis.id}

Quedo atento a las instrucciones para acceder al material.

Atentamente,
[Tu Nombre]`;

    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      destinatario
    )}&su=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

    window.open(url, "_blank");
  };

  const tesisFiltradas = seccionSeleccionada === "TODAS"
    ? listaTesis
    : listaTesis.filter(t => t.seccion === seccionSeleccionada);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

      {/* Filtro por Sección optimizado para móviles */}
      <div className="mb-10 max-w-md mx-auto sm:max-w-xl">
        <label htmlFor="seccion-select" className="block text-sm font-bold text-gray-700 mb-3 text-center uppercase tracking-wide">
          Filtrar por Programa o Sección
        </label>
        <div className="relative">
          <select
            id="seccion-select"
            value={seccionSeleccionada}
            onChange={(e) => setSeccionSeleccionada(e.target.value)}
            className="block w-full appearance-none bg-white border border-gray-300 hover:border-blue-400 px-4 py-3.5 pr-10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 font-semibold transition-colors cursor-pointer truncate"
          >
            <option value="TODAS">📚 TODAS LAS SECCIONES</option>
            {SECCIONES.map((seccion) => (
              <option key={seccion} value={seccion}>
                {seccion}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-blue-600">
            <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="mb-6 flex justify-center sm:justify-start items-center px-2">
        <span className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full">
          Mostrando {tesisFiltradas.length} {tesisFiltradas.length === 1 ? 'resultado' : 'resultados'}
        </span>
      </div>

      {/* Lista de Tarjetas */}
      {tesisFiltradas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tesisFiltradas.map((tesis, index) => (
            <TesisCard
              key={`${tesis.seccion}-${tesis.id}-${index}`}
              tesis={tesis}
              onSolicitar={handleSolicitarPorGmail}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 text-gray-600 text-lg font-medium">No hay tesis publicadas aún en esta sección.</p>
          <button
            onClick={() => setSeccionSeleccionada("TODAS")}
            className="mt-4 text-blue-600 hover:text-blue-800 font-semibold"
          >
            Ver todas las secciones
          </button>
        </div>
      )}
    </div>
  );
}