import TesisListContainer from "@/components/TesisListContainer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans selection:bg-blue-200 selection:text-blue-900">
      <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 text-white py-20 px-4 mb-12 shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            Repositorio Digital de Tesis
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Explora las investigaciones de nuestros egresados. Si llegaste aquí a través del código QR, busca la tesis de tu interés y solicítala directamente a la biblioteca.
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
