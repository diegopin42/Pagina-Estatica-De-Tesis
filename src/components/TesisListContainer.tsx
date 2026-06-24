"use client";

import { useState } from "react";
import { listaTesis, Tesis, SECCIONES, TIPOS_TESIS, TipoTesis } from "../data/tesis";
import TesisCard from "./TesisCard";

export default function TesisListContainer() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>("TODOS");
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

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobile) {
      const mailtoUrl = `mailto:${destinatario}?subject=${encodeURIComponent(
        asunto
      )}&body=${encodeURIComponent(cuerpo)}`;
      window.location.href = mailtoUrl;
    } else {
      const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        destinatario
      )}&su=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
      window.open(url, "_blank");
    }
  };

  // Asignar "Especialización" por defecto si el tipo no está definido
  const tesisConTipo = listaTesis.map(t => ({
    ...t,
    tipo: t.tipo || "Especialización"
  }));

  // Manejar el cambio de tipo académico
  const handleTipoChange = (nuevoTipo: string) => {
    setTipoSeleccionado(nuevoTipo);
    setSeccionSeleccionada("TODAS");
  };

  // Filtrar las secciones basadas en el tipo académico seleccionado
  const seccionesDisponibles = SECCIONES.filter(seccion => {
    if (tipoSeleccionado === "TODOS") return true;
    return tesisConTipo.some(t => t.seccion === seccion && t.tipo === tipoSeleccionado);
  });

  // Filtrar las tesis para mostrar según los criterios elegidos
  const tesisFiltradas = tesisConTipo.filter(t => {
    const matchTipo = tipoSeleccionado === "TODOS" || t.tipo === tipoSeleccionado;
    const matchSeccion = seccionSeleccionada === "TODAS" || t.seccion === seccionSeleccionada;
    return matchTipo && matchSeccion;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

      {/* Selector de Nivel Académico (Pills/Tabs) */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-gray-700 mb-3 text-center uppercase tracking-wide">
          Filtrar por Nivel Académico
        </label>
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto px-2">
          <button
            onClick={() => handleTipoChange("TODOS")}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all cursor-pointer shadow-sm ${
              tipoSeleccionado === "TODOS"
                ? "bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-blue-200/50 scale-105"
                : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200"
            }`}
          >
            🎓 TODOS ({tesisConTipo.length})
          </button>
          {TIPOS_TESIS.map((tipo) => {
            const count = tesisConTipo.filter(t => t.tipo === tipo).length;
            
            let emoji = "📚";
            if (tipo === "Especialización") emoji = "🔬";
            if (tipo === "Maestría") emoji = "🎓";
            if (tipo === "Doctorado") emoji = "🏛️";
            if (tipo === "Posdoctorado") emoji = "🌟";
            if (tipo === "Especialización Técnica") emoji = "🛠️";

            return (
              <button
                key={tipo}
                onClick={() => handleTipoChange(tipo)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all cursor-pointer shadow-sm flex items-center gap-1.5 ${
                  tipoSeleccionado === tipo
                    ? "bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-blue-200/50 scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200"
                }`}
              >
                <span>{emoji}</span>
                <span>{tipo}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  tipoSeleccionado === tipo 
                    ? "bg-blue-600/30 text-white" 
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

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
            <option value="TODAS">
              📚 TODAS LAS SECCIONES ({seccionesDisponibles.length})
            </option>
            {seccionesDisponibles.map((seccion) => {
              const countInSeccion = tesisConTipo.filter(
                t => t.seccion === seccion && (tipoSeleccionado === "TODOS" || t.tipo === tipoSeleccionado)
              ).length;

              return (
                <option key={seccion} value={seccion}>
                  {seccion} ({countInSeccion})
                </option>
              );
            })}
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
            onClick={() => handleTipoChange("TODOS")}
            className="mt-4 text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
          >
            Ver todas las secciones
          </button>
        </div>
      )}
    </div>
  );
}