import TesisListContainer from "@/components/TesisListContainer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans selection:bg-blue-200 selection:text-blue-900">
      <header className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white py-16 px-4 mb-12 shadow-lg relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <img 
            src="/unefa-logo.png" 
            alt="Logo UNEFA" 
            className="h-28 md:h-36 w-auto mb-6 drop-shadow-[0_6px_15px_rgba(255,255,255,0.15)] hover:scale-105 transition-transform duration-300 ease-out"
          />
          <span className="text-xs md:text-sm font-bold tracking-widest text-blue-300 uppercase mb-2">
            Universidad Nacional Experimental Politécnica de la Fuerza Armada
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-200">
            Repositorio Digital de Tesis
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-amber-400 my-4 rounded-full"></div>
          <p className="text-base md:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Explora las investigaciones y proyectos de grado de nuestra institución. Si accediste a través del código QR, busca la tesis de tu interés y solicítala directamente al equipo de biblioteca.
          </p>
        </div>
      </header>

      <section className="container mx-auto">
        <div className="mb-10 text-center px-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Tesis Destacadas
          </h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-500 mt-4 text-lg">
            Selecciona una tesis para iniciar el proceso de solicitud.
          </p>
        </div>
        
        <TesisListContainer />
      </section>
    </main>
  );
}
