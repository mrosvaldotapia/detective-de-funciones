
import React, { useState } from 'react';
import { CASES } from './constants';
import { Case } from './types';
import { EvidenceCard } from './components/EvidenceCard';
import { Assistant } from './components/Assistant';

const App: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const renderDashboard = () => (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <h1 className="text-6xl font-detective font-bold text-yellow-500 mb-4 tracking-tighter">
          DETECTIVE DE <span className="text-slate-100">FUNCIONES</span>
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto font-light">
          Resuelve los misterios del plano cartesiano analizando patrones, tablas y gráficas. 
          Un proyecto didáctico para Matemática 2° Medio.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        {CASES.map((c) => (
          <div 
            key={c.id}
            onClick={() => setSelectedCase(c)}
            className="group cursor-pointer bg-slate-800/40 border border-slate-700 hover:border-yellow-600 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-900/20"
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                c.difficulty === 'Fácil' ? 'bg-green-900/40 text-green-400' :
                c.difficulty === 'Media' ? 'bg-yellow-900/40 text-yellow-400' :
                'bg-red-900/40 text-red-400'
              }`}>
                {c.difficulty}
              </span>
              <span className="text-2xl group-hover:scale-125 transition-transform">📁</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-yellow-500 transition-colors">{c.title}</h3>
            <p className="text-slate-400 text-sm line-clamp-3 mb-6 leading-relaxed">
              {c.description}
            </p>
            <button className="w-full py-3 bg-slate-700 group-hover:bg-yellow-600 group-hover:text-slate-900 rounded-xl font-bold transition-all">
              Abrir Expediente
            </button>
          </div>
        ))}
      </div>

      <footer className="mt-24 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm italic">
        "En matemáticas, como en el crimen, no hay coincidencias."
      </footer>
    </div>
  );

  const renderCaseView = (c: Case) => (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-slate-900/80 sticky top-0 z-50 border-b border-slate-800 px-6 py-4 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSelectedCase(null)}
            className="text-slate-400 hover:text-white flex items-center text-sm font-semibold transition-colors"
          >
            ← Volver al Cuartel
          </button>
          <div className="h-4 w-px bg-slate-700"></div>
          <h2 className="text-yellow-500 font-bold font-detective tracking-widest uppercase text-xs">Expediente: {c.id}</h2>
        </div>
        <h1 className="text-xl font-bold text-white hidden md:block">{c.title}</h1>
        <div className="flex items-center space-x-2">
           <span className="text-xs text-slate-500 mr-2 uppercase tracking-tighter">Matemática 2° Medio</span>
           <div className="w-8 h-8 rounded bg-yellow-600 flex items-center justify-center font-bold text-slate-900">M</div>
        </div>
      </nav>

      <div className="flex-1 max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 p-6 lg:p-10">
        {/* Left column: Evidence Analysis */}
        <div className="lg:col-span-7 space-y-8">
          <section className="bg-slate-800/30 p-8 rounded-3xl border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-4">Misión del Detective</h2>
            <p className="text-slate-300 leading-relaxed text-lg mb-6">
              {c.objective}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                <span className="block text-slate-500 text-xs font-bold uppercase mb-1">Dificultad</span>
                <span className="text-slate-200">{c.difficulty}</span>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                <span className="block text-slate-500 text-xs font-bold uppercase mb-1">Eje Temático</span>
                <span className="text-slate-200">Funciones y Modelación</span>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-detective font-bold text-yellow-500 flex items-center">
              <span className="mr-3">📂</span> Evidencias Colectadas
            </h2>
            <div className="grid gap-6">
              {c.evidences.map((ev) => (
                <EvidenceCard key={ev.id} evidence={ev} />
              ))}
            </div>
          </section>
        </div>

        {/* Right column: Assistant & Reasoning */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-6">
             <Assistant currentCase={c} />
             
             <div className="bg-slate-900/80 p-6 rounded-2xl border border-yellow-900/30 shadow-xl">
               <h4 className="text-yellow-500 font-bold mb-2 flex items-center">
                 <span className="mr-2">📝</span> Cuaderno de Notas
               </h4>
               <textarea 
                  className="w-full bg-slate-800 border-none rounded-xl p-4 text-slate-300 text-sm h-32 focus:ring-1 focus:ring-yellow-600 placeholder-slate-500"
                  placeholder="Anota aquí tus observaciones sobre las pendientes, los vértices o las variaciones constantes..."
               ></textarea>
               <div className="mt-4 flex items-center justify-between">
                 <span className="text-[10px] text-slate-500 italic">Estas notas son privadas para tu investigación.</span>
                 <button className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded transition-colors">Limpiar Notas</button>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {!selectedCase ? renderDashboard() : renderCaseView(selectedCase)}
    </div>
  );
};

export default App;
