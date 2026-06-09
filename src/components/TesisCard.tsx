import { Tesis } from "../data/tesis";

interface TesisCardProps {
  tesis: Tesis;
  onSolicitar: (tesis: Tesis) => void;
}

export default function TesisCard({ tesis, onSolicitar }: TesisCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex-1">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-md tracking-wide">
            {tesis.seccion}
          </span>
          <span className="bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1 rounded-md">
            {tesis.anio}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 leading-tight mb-3">
          {tesis.titulo}
        </h3>
        <p className="text-sm font-semibold text-gray-500 mb-4">
          Autor: <span className="text-gray-700">{tesis.autor}</span>
        </p>
        <p className="text-gray-600 text-sm line-clamp-3 mb-6">
          {tesis.descripcion}
        </p>
      </div>
      <button
        onClick={() => onSolicitar(tesis)}
        className="mt-auto w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-xl border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20">
          <path fill="#4285F4" d="M45 16.2V38c0 2.2-1.8 4-4 4H34V18.2L24 26 14 18.2V42H7c-2.2 0-4-1.8-4-4V16.2c0-1.8 1-3.4 2.6-4.1 1.6-.7 3.4-.3 4.6.9L24 23.4l13.8-10.4c1.2-1.2 3-1.6 4.6-.9 1.6.7 2.6 2.3 2.6 4.1z" />
          <path fill="#34A853" d="M14 18.2V42H7c-2.2 0-4-1.8-4-4V16.2c0-1.8 1-3.4 2.6-4.1L14 18.2z" />
          <path fill="#EA4335" d="M34 18.2V42h7c2.2 0 4-1.8 4-4V16.2c0-1.8-1-3.4-2.6-4.1L34 18.2z" />
          <path fill="#FBBC05" d="M24 26l21-16c-1.2-1.2-3-1.6-4.6-.9L24 19.5 7.6 9.1c-1.6-.7-3.4-.3-4.6.9L24 26z" />
        </svg>
        Solicitar por Gmail
      </button>
    </div>
  );
}
