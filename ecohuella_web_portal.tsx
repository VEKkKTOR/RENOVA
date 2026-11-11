import React, { useState, useEffect, useMemo } from 'react';
import { 
  Leaf, Recycle, Users, MapPin, Calendar, Clock, Heart, Bookmark, 
  Search, Filter, ChevronRight, CheckCircle2, ArrowRight, X, Info, 
  Share2, Award, Sparkles, BookOpen, Volume2, Compass, AlertCircle, 
  Layers, Lightbulb, Trash2, Check, UserCheck, Send, Navigation, Star
} from 'lucide-react';

// --- MAIN APP COMPONENT ---
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [savedIdeas, setSavedIdeas] = useState([1, 3]);
  const [likedIdeas, setLikedIdeas] = useState([2]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedConference, setSelectedConference] = useState(null);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [rsvpModalOpen, setRsvpModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Show notification helper
  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="min-h-screen bg-emerald-50/40 text-slate-800 font-sans selection:bg-emerald-200 selection:text-emerald-900 flex flex-col">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce border border-emerald-500/30">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* Header & Navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Render */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeSection 
            setActiveTab={setActiveTab} 
            setSelectedIdea={setSelectedIdea}
            setSelectedEvent={setSelectedEvent}
          />
        )}

        {activeTab === 'ideas' && (
          <DIYIdeasSection 
            savedIdeas={savedIdeas}
            setSavedIdeas={setSavedIdeas}
            likedIdeas={likedIdeas}
            setLikedIdeas={setLikedIdeas}
            setSelectedIdea={setSelectedIdea}
            showToast={showToast}
          />
        )}

        {activeTab === 'mapa' && (
          <LocalActivitiesSection 
            setSelectedEvent={setSelectedEvent}
            setVolunteerModalOpen={setVolunteerModalOpen}
          />
        )}

        {activeTab === 'conferencias' && (
          <ConferencesSection 
            setSelectedConference={setSelectedConference}
            setRsvpModalOpen={setRsvpModalOpen}
          />
        )}

        {activeTab === 'guia' && (
          <RecyclingGuideSection />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Modals */}
      {selectedIdea && (
        <DIYDetailModal 
          idea={selectedIdea} 
          onClose={() => setSelectedIdea(null)}
          isSaved={savedIdeas.includes(selectedIdea.id)}
          toggleSave={() => {
            if (savedIdeas.includes(selectedIdea.id)) {
              setSavedIdeas(savedIdeas.filter(id => id !== selectedIdea.id));
              showToast("Proyecto eliminado de tus guardados");
            } else {
              setSavedIdeas([...savedIdeas, selectedIdea.id]);
              showToast("¡Proyecto guardado en tu colección!");
            }
          }}
        />
      )}

      {volunteerModalOpen && selectedEvent && (
        <VolunteerModal 
          event={selectedEvent} 
          onClose={() => setVolunteerModalOpen(false)}
          showToast={showToast}
        />
      )}

      {rsvpModalOpen && selectedConference && (
        <RSVPModal 
          conference={selectedConference}
          onClose={() => setRsvpModalOpen(false)}
          showToast={showToast}
        />
      )}
    </div>
  );
}

// --- LOGO COMPONENT (NEW RECYCLING LEAF LOOP LOGO + UPDATED SLOGAN) ---
function EcoHuellaLogo({ className = "h-11", textVisible = true }) {
  return (
    <div className="flex items-center gap-3 cursor-pointer select-none group">
      <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
        {/* SVG Vector reproducing the detailed leaf recycling loop logo */}
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
          <defs>
            {/* Soft Green / Teal / Mint Gradients matching logo color scheme */}
            <linearGradient id="mintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a7f3d0" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* Outer Triangular Loop Arrows formed by elegant Leaves */}
          {/* Top Arc / Arrow */}
          <path d="M 60 65 C 80 35 120 35 140 65 L 148 55 C 130 25 70 25 52 55 Z" fill="url(#mintGrad)" />
          <path d="M 125 55 Q 145 65 155 75 Q 140 80 130 70 Z" fill="#34d399" />

          {/* Right Arc / Arrow */}
          <path d="M 148 78 C 170 110 150 145 120 165 L 128 175 C 165 150 185 105 158 68 Z" fill="url(#greenGrad)" />
          <path d="M 132 150 Q 122 170 115 180 Q 110 162 122 152 Z" fill="#059669" />

          {/* Left Arc / Arrow */}
          <path d="M 108 170 C 70 165 45 130 50 90 L 38 88 C 32 138 65 178 112 182 Z" fill="url(#tealGrad)" />
          <path d="M 50 102 Q 40 85 35 75 Q 52 75 58 88 Z" fill="#0891b2" />

          {/* Botanical leaf overlays within loop arrows */}
          <path d="M 85 42 C 95 38 110 46 115 55 C 102 55 92 48 85 42 Z" fill="#86efac" opacity="0.9" />
          <path d="M 152 95 C 162 108 155 125 145 130 C 142 118 148 105 152 95 Z" fill="#4ade80" opacity="0.9" />
          <path d="M 52 135 C 45 122 55 108 65 105 C 65 118 58 130 52 135 Z" fill="#22d3ee" opacity="0.9" />
          <path d="M 72 48 C 65 52 60 62 68 70 C 75 62 78 52 72 48 Z" fill="#4ade80" />

          {/* Center Circle with Leaf */}
          <circle cx="100" cy="108" r="28" fill="none" stroke="#2dd4bf" strokeWidth="4" strokeDasharray="140" opacity="0.8" />
          <path d="M 100 126 C 88 126 84 112 88 100 C 98 94 112 100 112 112 C 112 122 106 126 100 126 Z" fill="url(#greenGrad)" />
          <path d="M 94 122 Q 100 108 106 102" fill="none" stroke="#f0fdf4" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      {textVisible && (
        <div className="flex flex-col leading-none">
          <span className="text-2xl font-extrabold tracking-tight text-teal-800 font-sans">
            eco<span className="text-teal-600 font-normal">huella</span>
          </span>
          <span className="text-[10.5px] font-medium tracking-normal text-teal-700/80 mt-1 italic">
            dejando huella por el futuro
          </span>
        </div>
      )}
    </div>
  );
}

// --- HEADER NAVIGATION ---
function Header({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Leaf },
    { id: 'ideas', label: 'Proyectos DIY', icon: Lightbulb },
    { id: 'mapa', label: 'Actividades Cerca', icon: MapPin },
    { id: 'conferencias', label: 'Conferencias & Talleres', icon: Calendar },
    { id: 'guia', label: 'Guía de Reciclaje', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div onClick={() => setActiveTab('home')}>
            <EcoHuellaLogo />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('mapa')}
              className="hidden lg:flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Users className="w-4 h-4" />
              <span>Sumarme Hoy</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Abrir menú"
            >
              <Layers className="w-6 h-6 text-emerald-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-emerald-100 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-700 hover:bg-emerald-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}

// --- HOME SECTION ---
function HomeSection({ setActiveTab, setSelectedIdea, setSelectedEvent }) {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* Glow Spheres */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold tracking-wide uppercase backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Iniciativa Ciudadana Unida</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
              Transforma tu ciudad <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200">
                dejando huella por el futuro
              </span>
            </h1>

            <p className="text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Aprende a reciclar en casa, descubre proyectos creativos con materiales reutilizados y súmate a las jornadas locales de limpieza y reforestación en nuestros barrios.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setActiveTab('mapa')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold px-7 py-3.5 rounded-2xl shadow-lg shadow-emerald-900/40 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <MapPin className="w-5 h-5" />
                <span>Ver actividades cerca de mí</span>
              </button>

              <button
                onClick={() => setActiveTab('ideas')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-2xl backdrop-blur-md transition-all"
              >
                <Lightbulb className="w-5 h-5 text-amber-300" />
                <span>Explorar Ideas DIY</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-emerald-700/60 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-amber-300">+2.4 Ton</p>
                <p className="text-xs text-emerald-200 font-medium">Residuos Reciclados</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-300">18</p>
                <p className="text-xs text-emerald-200 font-medium">Jornadas Ciudadanas</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-teal-200">+450</p>
                <p className="text-xs text-emerald-200 font-medium">Voluntarios Activos</p>
              </div>
            </div>
          </div>

          {/* Combined Brand Visual Banner Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-xl shadow-2xl text-slate-800">
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg p-3">
                  <EcoHuellaLogo textVisible={false} className="w-full h-full" />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Miembro EcoHuella</h3>
                  <p className="text-xs text-emerald-700 font-medium">Comunidad Sustentable Local</p>
                </div>

                <div className="w-full bg-white p-4 rounded-xl border border-slate-100 space-y-2 text-left text-xs">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Próxima Jornada:</span>
                    <span className="font-bold text-emerald-700">Sábado 10:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Lugar:</span>
                    <span className="font-semibold text-slate-800">Parque Central Ecología</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-1">
                    <div className="bg-emerald-500 h-full w-3/4"></div>
                  </div>
                  <p className="text-[10px] text-slate-400 text-right">75% meta de asistencia alcanzada</p>
                </div>

                <div className="flex gap-2 w-full">
                  <button 
                    onClick={() => setActiveTab('guia')}
                    className="flex-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold py-2 px-3 rounded-xl text-xs transition"
                  >
                    Separar Basura
                  </button>
                  <button 
                    onClick={() => setActiveTab('mapa')}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl text-xs transition"
                  >
                    Participar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlight Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">¿Cómo funciona nuestra plataforma?</h2>
          <p className="text-slate-600 mt-2">Cuatro pilares clave para construir una ciudad más limpia, ordenada y activa.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={Lightbulb}
            title="Ideas DIY & Proyectos"
            desc="Tutoriales estilo Pinterest para reutilizar cartón, plástico y vidrio en casa."
            color="bg-amber-500/10 text-amber-600 border-amber-200"
            onClick={() => setActiveTab('ideas')}
          />
          <FeatureCard 
            icon={MapPin}
            title="Actividades Cerca"
            desc="Mapa interactivo con convocatorias de limpieza de parques, ríos y forestación."
            color="bg-emerald-500/10 text-emerald-600 border-emerald-200"
            onClick={() => setActiveTab('mapa')}
          />
          <FeatureCard 
            icon={Calendar}
            title="Conferencias & Charlas"
            desc="Eventos presenciales y virtuales con expertos en educación ambiental."
            color="bg-teal-500/10 text-teal-600 border-teal-200"
            onClick={() => setActiveTab('conferencias')}
          />
          <FeatureCard 
            icon={BookOpen}
            title="Guía de Reciclaje"
            desc="Aprende la manera correcta de separar residuos en la localidad sin confusión."
            color="bg-blue-500/10 text-blue-600 border-blue-200"
            onClick={() => setActiveTab('guia')}
          />
        </div>
      </section>

      {/* Interactive Quick Trash Sorting Game Widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuickSortingWidget />
      </section>

      {/* Preview DIY Section */}
      <section className="bg-stone-100/80 py-12 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">Inspiración Diaria</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Proyectos Populares DIY</h2>
            </div>
            <button 
              onClick={() => setActiveTab('ideas')}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800"
            >
              Ver todos los proyectos <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIY_IDEAS_DATA.slice(0, 3).map(idea => (
              <DIYCard 
                key={idea.id} 
                idea={idea} 
                onSelect={setSelectedIdea}
                isSaved={false}
                isLiked={false}
                onToggleSave={() => {}}
                onToggleLike={() => {}}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper Feature Card
function FeatureCard({ icon: Icon, title, desc, color, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 group flex flex-col justify-between"
    >
      <div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-4 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition">{title}</h3>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">{desc}</p>
      </div>
      <div className="mt-6 flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:gap-2 transition-all">
        <span>Explorar</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
}

// --- FEATURE 1: IDEAS & PROYECTOS DIY (PINTEREST STYLE MASONRY) ---
function DIYIdeasSection({ savedIdeas, setSavedIdeas, likedIdeas, setLikedIdeas, setSelectedIdea, showToast }) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [activeDifficulty, setActiveDifficulty] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Todos', 'Plástico', 'Cartón', 'Vidrio', 'Orgánico', 'Jardín'];
  const difficulties = ['Todas', 'Fácil', 'Intermedio', 'Avanzado'];

  const filteredIdeas = useMemo(() => {
    return DIY_IDEAS_DATA.filter(idea => {
      const matchCat = activeCategory === 'Todos' || idea.category === activeCategory;
      const matchDiff = activeDifficulty === 'Todas' || idea.difficulty === activeDifficulty;
      const matchSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          idea.materials.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchDiff && matchSearch;
    });
  }, [activeCategory, activeDifficulty, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Heading */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 text-xs font-bold px-3 py-1 rounded-full uppercase">
            Galería Creativa Estilo Pinterest
          </span>
          <h1 className="text-3xl sm:text-4xl font-black">Proyectos DIY con Reciclaje</h1>
          <p className="text-emerald-100 text-sm sm:text-base">
            Transforma los residuos de tu hogar en objetos útiles, decoración y macetas. Filtra por tipo de material y nivel de dificultad.
          </p>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por proyecto o material (ej. botellas, frascos, huerto)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 text-sm"
          />
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Material:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dificultad:</span>
            <select
              value={activeDifficulty}
              onChange={(e) => setActiveDifficulty(e.target.value)}
              className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl border-none focus:ring-2 focus:ring-emerald-500"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Masonry / Grid */}
      {filteredIdeas.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700">No se encontraron proyectos</h3>
          <p className="text-sm text-slate-500 mt-1">Prueba cambiando los filtros o la búsqueda.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map(idea => {
            const isSaved = savedIdeas.includes(idea.id);
            const isLiked = likedIdeas.includes(idea.id);

            return (
              <DIYCard 
                key={idea.id} 
                idea={idea} 
                onSelect={setSelectedIdea}
                isSaved={isSaved}
                isLiked={isLiked}
                onToggleSave={() => {
                  if (isSaved) {
                    setSavedIdeas(savedIdeas.filter(id => id !== idea.id));
                    showToast("Proyecto eliminado de tus guardados");
                  } else {
                    setSavedIdeas([...savedIdeas, idea.id]);
                    showToast("¡Proyecto guardado en tu colección!");
                  }
                }}
                onToggleLike={() => {
                  if (isLiked) {
                    setLikedIdeas(likedIdeas.filter(id => id !== idea.id));
                  } else {
                    setLikedIdeas([...likedIdeas, idea.id]);
                    showToast("¡Te ha gustado este proyecto!");
                  }
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// DIY Card Item
function DIYCard({ idea, onSelect, isSaved, isLiked, onToggleSave, onToggleLike }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
      {/* Card Header Image with Overlay */}
      <div className="relative h-48 bg-slate-200 overflow-hidden cursor-pointer" onClick={() => onSelect(idea)}>
        <img 
          src={idea.image} 
          alt={idea.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
        
        {/* Category & Difficulty Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="bg-emerald-600/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md">
            {idea.category}
          </span>
          <span className="bg-slate-900/70 text-white text-[11px] font-medium px-2 py-1 rounded-lg backdrop-blur-md">
            {idea.difficulty}
          </span>
        </div>

        {/* Save / Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave();
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${
            isSaved 
              ? 'bg-amber-500 text-white' 
              : 'bg-white/80 text-slate-700 hover:bg-white'
          }`}
          title="Guardar idea"
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </button>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <span className="text-xs text-emerald-200 flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5" /> {idea.timeNeeded}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 
            onClick={() => onSelect(idea)}
            className="font-bold text-slate-800 text-lg group-hover:text-emerald-700 transition cursor-pointer line-clamp-1"
          >
            {idea.title}
          </h3>
          <p className="text-slate-600 text-xs mt-1 line-clamp-2 leading-relaxed">
            {idea.description}
          </p>
        </div>

        {/* Materials List Preview */}
        <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/60">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Materiales principales:</p>
          <div className="flex flex-wrap gap-1">
            {idea.materials.slice(0, 3).map((mat, idx) => (
              <span key={idx} className="bg-white text-slate-700 border border-slate-200 text-[10px] px-2 py-0.5 rounded-md">
                {mat}
              </span>
            ))}
            {idea.materials.length > 3 && (
              <span className="text-[10px] text-slate-400 self-center">+{idea.materials.length - 3} más</span>
            )}
          </div>
        </div>

        {/* Bottom Bar Action */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <button 
            onClick={onToggleLike}
            className={`flex items-center gap-1.5 font-semibold transition ${
              isLiked ? 'text-rose-600' : 'text-slate-500 hover:text-rose-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span>{idea.likes + (isLiked ? 1 : 0)}</span>
          </button>

          <button 
            onClick={() => onSelect(idea)}
            className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
          >
            Paso a Paso <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// DIY Step Modal
function DIYDetailModal({ idea, onClose, isSaved, toggleSave }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
        {/* Header Image Banner */}
        <div className="relative h-60 bg-slate-800">
          <img src={idea.image} alt={idea.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full transition shadow"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-md mb-2 inline-block">
              {idea.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black leading-tight">{idea.title}</h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 text-sm">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-xs text-slate-400 font-medium">Dificultad:</span>
                <p className="font-bold text-slate-800">{idea.difficulty}</p>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium">Tiempo estimado:</span>
                <p className="font-bold text-slate-800">{idea.timeNeeded}</p>
              </div>
            </div>

            <button
              onClick={toggleSave}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                isSaved ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
              <span>{isSaved ? 'Guardado en Mis Proyectos' : 'Guardar Proyecto'}</span>
            </button>
          </div>

          {/* Materials Section */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              <span>Materiales Necesarios</span>
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm text-slate-700">
              {idea.materials.map((mat, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-emerald-50/50 p-2 rounded-lg border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{mat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions Step-by-Step */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Instrucciones Paso a Paso</span>
            </h3>
            <div className="space-y-3">
              {idea.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 rounded-b-3xl flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition"
          >
            Entendido, ¡Manos a la obra!
          </button>
        </div>
      </div>
    </div>
  );
}

// --- FEATURE 2: ACTIVIDADES CERCA DE MÍ (INTERACTIVE MAP & CLEANUPS) ---
function LocalActivitiesSection({ setSelectedEvent, setVolunteerModalOpen }) {
  const [filterType, setFilterType] = useState('Todos');
  const [activePin, setActivePin] = useState(1);

  const filteredEvents = useMemo(() => {
    if (filterType === 'Todos') return CLEANUP_EVENTS_DATA;
    return CLEANUP_EVENTS_DATA.filter(ev => ev.type === filterType);
  }, [filterType]);

  const activeEventDetail = CLEANUP_EVENTS_DATA.find(ev => ev.id === activePin) || CLEANUP_EVENTS_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Participación Ciudadana en tu Zona</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900">Actividades Cerca de Mí</h1>
          <p className="text-slate-600 text-sm mt-1">
            Unete a jornadas voluntarias de limpieza, restauración de áreas verdes y siembra en parques locales.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {['Todos', 'Jornada de Limpieza', 'Restauración Verde', 'Taller Comunitario'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filterType === type 
                  ? 'bg-emerald-600 text-white shadow' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Map + Event Details Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Visual Simulated Map Display */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden relative min-h-[420px] flex flex-col">
          {/* Simulated Map Header Controls */}
          <div className="bg-slate-900 text-white p-3 px-4 flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>Mapa Interactivo de Puntos de Limpieza - Ciudad Juárez</span>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded border border-emerald-400/30">
              GPS Activo
            </span>
          </div>

          {/* Interactive Map Canvas Simulation */}
          <div className="relative flex-1 bg-emerald-950/5 min-h-[380px] p-6 overflow-hidden flex items-center justify-center">
            {/* Styled Map Graphic Background */}
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#059669" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Simulated River Vector */}
              <path d="M -20 200 Q 150 100 300 250 T 600 150" fill="none" stroke="#0284c7" strokeWidth="24" opacity="0.6" />
              {/* Park outlines */}
              <circle cx="200" cy="120" r="70" fill="#10b981" opacity="0.2" />
              <rect x="380" y="220" width="120" height="90" rx="20" fill="#10b981" opacity="0.2" />
            </svg>

            {/* Map Pins */}
            {filteredEvents.map((ev) => {
              const isSelected = activePin === ev.id;
              return (
                <div
                  key={ev.id}
                  onClick={() => setActivePin(ev.id)}
                  style={{ top: `${ev.mapY}%`, left: `${ev.mapX}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all z-20 group"
                >
                  <div className={`relative flex items-center justify-center transition-all ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}>
                    {/* Ripple Effect */}
                    {isSelected && (
                      <span className="absolute w-12 h-12 bg-emerald-500/30 rounded-full animate-ping"></span>
                    )}

                    <div className={`p-2.5 rounded-full shadow-lg border-2 flex items-center justify-center ${
                      isSelected 
                        ? 'bg-amber-500 text-slate-950 border-white ring-4 ring-amber-500/30' 
                        : 'bg-emerald-600 text-white border-white'
                    }`}>
                      <MapPin className="w-5 h-5 fill-current" />
                    </div>

                    {/* Pin Hover Label */}
                    <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap shadow opacity-0 group-hover:opacity-100 transition pointer-events-none">
                      {ev.title}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* User Current Location Indicator */}
            <div className="absolute top-[65%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md border border-white">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span>Tu ubicación</span>
            </div>
          </div>

          {/* Selected Event Quick Bar inside map */}
          <div className="bg-white border-t border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Ubicación Seleccionada en Mapa:</span>
              <h4 className="font-bold text-slate-900 text-sm">{activeEventDetail.title}</h4>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {activeEventDetail.location}
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedEvent(activeEventDetail);
                setVolunteerModalOpen(true);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition shrink-0"
            >
              Unirme a esta jornada
            </button>
          </div>
        </div>

        {/* List of Events Cards */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-bold text-slate-800 text-base flex items-center justify-between">
            <span>Próximas Convocatorias ({filteredEvents.length})</span>
            <span className="text-xs text-slate-400 font-normal">Haz clic para ubicar en mapa</span>
          </h3>

          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
            {filteredEvents.map(ev => {
              const isSelected = activePin === ev.id;
              return (
                <div
                  key={ev.id}
                  onClick={() => setActivePin(ev.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md' 
                      : 'bg-white border-slate-200/80 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {ev.type}
                      </span>
                      <h4 className="font-bold text-slate-800 text-base mt-1">{ev.title}</h4>
                    </div>
                    <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-lg shrink-0">
                      {ev.date}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">{ev.description}</p>

                  <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" /> {ev.time}
                    </span>
                    <span className="text-emerald-700 font-bold">
                      {ev.volunteersCount} inscritos
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Volunteer Modal
function VolunteerModal({ event, onClose, showToast }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', neighbors: 1 });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      showToast(`¡Gracias ${formData.name}! Te hemos enviado los detalles al correo.`);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-800">¡Registro Exitoso!</h3>
            <p className="text-slate-600 text-sm">
              Te has registrado para: <br />
              <strong className="text-emerald-700">{event.title}</strong>
            </p>
            <p className="text-xs text-slate-400">Recibirás un recordatorio por WhatsApp un día antes.</p>
          </div>
        ) : (
          <>
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase">Inscripción de Voluntarios</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{event.title}</h3>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {event.location} • {event.date} ({event.time})
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Completo</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Ej. Ana María López"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="ana@ejemplo.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono (WhatsApp)</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="656 123 4567"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">¿Cuántas personas van contigo?</label>
                <select
                  value={formData.neighbors}
                  onChange={e => setFormData({...formData, neighbors: Number(e.target.value)})}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value={1}>Solo yo</option>
                  <option value={2}>2 personas</option>
                  <option value={3}>3 personas</option>
                  <option value={5}>Grupo / Familia (+5)</option>
                </select>
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Te proporcionaremos guantes, bolsas biodegradables y agua potable durante la actividad.</span>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg transition"
              >
                Confirmar mi Asistencia
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// --- FEATURE 3: PRÓXIMAS CONFERENCIAS & TALLERES ---
function ConferencesSection({ setSelectedConference, setRsvpModalOpen }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Banner */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl z-10">
          <span className="bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
            Educación Ambiental Comunitaria
          </span>
          <h1 className="text-3xl sm:text-4xl font-black">Conferencias & Charlas Educativas</h1>
          <p className="text-slate-300 text-sm">
            Aprende de biólogos, gestores ambientales y líderes comunitarios. Modalidad presencial y transmisiones en vivo.
          </p>
        </div>

        {/* Live Countdown Banner for Featured Event */}
        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center space-y-2 shrink-0 z-10 w-full sm:w-auto">
          <p className="text-xs font-bold text-amber-300 uppercase">Próximo Gran Taller En Vivo</p>
          <div className="flex justify-center gap-3 text-white">
            <div className="bg-slate-800/80 p-2 rounded-lg w-14">
              <span className="block text-xl font-black text-emerald-400">03</span>
              <span className="text-[9px] text-slate-400 uppercase">Días</span>
            </div>
            <div className="bg-slate-800/80 p-2 rounded-lg w-14">
              <span className="block text-xl font-black text-emerald-400">14</span>
              <span className="text-[9px] text-slate-400 uppercase">Horas</span>
            </div>
            <div className="bg-slate-800/80 p-2 rounded-lg w-14">
              <span className="block text-xl font-black text-emerald-400">25</span>
              <span className="text-[9px] text-slate-400 uppercase">Min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Conferences */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CONFERENCES_DATA.map(conf => (
          <div key={conf.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition flex flex-col justify-between overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start gap-2">
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                  conf.mode === 'Presencial' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {conf.mode}
                </span>
                <span className="text-xs font-bold text-slate-500">{conf.date}</span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-lg leading-snug">{conf.title}</h3>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed">{conf.description}</p>
              </div>

              {/* Speaker Card */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img src={conf.speakerAvatar} alt={conf.speaker} className="w-10 h-10 rounded-full object-cover border" />
                <div>
                  <p className="text-xs font-bold text-slate-800">{conf.speaker}</p>
                  <p className="text-[11px] text-slate-500">{conf.speakerRole}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">{conf.time}</span>
              <button
                onClick={() => {
                  setSelectedConference(conf);
                  setRsvpModalOpen(true);
                }}
                className="bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
              >
                Reservar Cupo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// RSVP Modal
function RSVPModal({ conference, onClose, showToast }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => {
      showToast(`¡Cupo reservado con éxito! Revisa tu correo ${email}`);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>

        {done ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-xl font-bold text-slate-800">¡Lugar Reservado!</h3>
            <p className="text-xs text-slate-600">Te enviaremos el pase digital y el enlace de acceso si es virtual.</p>
          </div>
        ) : (
          <>
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase">Reserva de Entrada Gratuita</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">{conference.title}</h3>
              <p className="text-xs text-slate-500 mt-1">Impartido por: {conference.speaker}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Correo para enviar el boleto:</label>
                <input 
                  type="email" 
                  required 
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow transition"
              >
                Confirmar mi Pase Gratuito
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// --- FEATURE 4: GUÍA DE RECICLAJE & SEPARACIÓN EN CASA ---
function RecyclingGuideSection() {
  const [activeBin, setActiveBin] = useState('organico');

  const binDetails = {
    organico: {
      color: 'bg-amber-700',
      border: 'border-amber-800',
      title: 'Contenedor Orgánico (Marrón / Verde Cobre)',
      accepts: ['Restos de verduras y frutas', 'Cáscaras de huevo', 'Posos de café y té', 'Hojas secas y restos de jardín'],
      rejects: ['Plásticos', 'Aceite comestible usado', 'Pañales o toallitas', 'Huesos grandes en exceso'],
      tip: 'Ideal para compostaje casero. Reduce el 40% de la basura de tu hogar.'
    },
    inorganico: {
      color: 'bg-emerald-600',
      border: 'border-emerald-700',
      title: 'Envases y Plásticos (Verde / Amarillo)',
      accepts: ['Botellas de PET (agua, refrescos)', 'Envases HDPE (detergentes, champú)', 'Latas de aluminio y conserva', 'Brik / Envases multilaminados'],
      rejects: ['Juguetes de plástico rotos', 'Bolsas muy sucias de grasa', 'Aparatos electrónicos'],
      tip: 'Lava y aplasta tus botellas antes de depositarlas para ahorrar espacio.'
    },
    papel: {
      color: 'bg-blue-600',
      border: 'border-blue-700',
      title: 'Papel y Cartón (Azul)',
      accepts: ['Cajas de cartón corrugado', 'Periódicos y revistas', 'Hojas de papel impresas', 'Tubos de papel higiénico'],
      rejects: ['Cajas de pizza con mucha grasa', 'Papel servilleta usado', 'Papel plastificado o térmico'],
      tip: 'Desarma las cajas para que ocupen menos espacio en la estación de recolección.'
    },
    vidrio: {
      color: 'bg-teal-700',
      border: 'border-teal-800',
      title: 'Vidrio (Verde Oscuro)',
      accepts: ['Frascos de conservas o mermelada', 'Botellas de vidrio transparente o ámbar'],
      rejects: ['Espejos o cristales rotos', 'Focos o bombillas', 'Vajilla de cerámica o pirex'],
      tip: 'Quita las tapas de metal y recíclalas en el contenedor de latas.'
    }
  };

  const current = binDetails[activeBin];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Aprende a Separar en Casa</span>
        <h1 className="text-3xl font-black text-slate-900">Guía Práctica de Clasificación</h1>
        <p className="text-slate-600 text-sm">
          Haz clic en cada contenedor para aprender qué materiales van en cada lugar y evitar la contaminación cruzada.
        </p>
      </div>

      {/* Interactive Bin Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { key: 'organico', name: 'Orgánicos', color: 'bg-amber-800' },
          { key: 'inorganico', name: 'Plásticos & Latas', color: 'bg-emerald-600' },
          { key: 'papel', name: 'Papel & Cartón', color: 'bg-blue-600' },
          { key: 'vidrio', name: 'Vidrio', color: 'bg-teal-700' },
        ].map((bin) => (
          <button
            key={bin.key}
            onClick={() => setActiveBin(bin.key)}
            className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between h-32 ${
              activeBin === bin.key
                ? `${bin.color} text-white shadow-xl ring-4 ring-emerald-500/20 scale-105`
                : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Recycle className="w-8 h-8 opacity-80" />
            <span className="font-extrabold text-sm sm:text-base">{bin.name}</span>
          </button>
        ))}
      </div>

      {/* Bin Detail Panel */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-lg grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-4 h-8 rounded-full ${current.color}`}></div>
            <h3 className="text-xl font-bold text-slate-900">{current.title}</h3>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
              <Check className="w-4 h-4 text-emerald-600" /> Sí se recicla aquí:
            </h4>
            <ul className="space-y-1.5 text-sm text-slate-700">
              {current.accepts.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4 border-t md:border-t-0 md:border-l border-slate-100 md:pl-8 pt-4 md:pt-0">
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1">
              <X className="w-4 h-4 text-rose-600" /> NO depositar aquí:
            </h4>
            <ul className="space-y-1.5 text-sm text-slate-700">
              {current.rejects.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-rose-50/60 p-2 rounded-lg border border-rose-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
            <p className="font-bold text-amber-800 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-600" /> Consejos EcoHuella:
            </p>
            <p className="leading-relaxed">{current.tip}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Interactive Quick Sorting Mini-Game Widget for Home
function QuickSortingWidget() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const items = [
    { name: 'Botella de Agua (PET)', target: 'inorganico' },
    { name: 'Caja de Cereal de Cartón', target: 'papel' },
    { name: 'Cáscaras de Plátano', target: 'organico' },
    { name: 'Frasco de Mermelada', target: 'vidrio' },
  ];

  const currentItem = items[currentIdx % items.length];

  const handleChoice = (choice) => {
    if (choice === currentItem.target) {
      setScore(score + 10);
      setFeedback({ success: true, msg: '¡Correcto! +10 Puntos Eco' });
    } else {
      setFeedback({ success: false, msg: '¡Casi! Inténtalo de nuevo' });
    }

    setTimeout(() => {
      setFeedback(null);
      setCurrentIdx(currentIdx + 1);
    }, 1200);
  };

  return (
    <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="space-y-2 max-w-md text-center md:text-left">
        <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full uppercase border border-emerald-400/30">
          Mini-Reto Interactivo
        </span>
        <h3 className="text-2xl font-black">¿Sabes clasificar este residuo?</h3>
        <p className="text-xs text-emerald-100">Pon a prueba tus conocimientos de reciclaje en 5 segundos.</p>
      </div>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center space-y-4 w-full md:w-80">
        <div className="bg-white text-slate-900 font-black p-3 rounded-xl text-base shadow">
          {currentItem.name}
        </div>

        {feedback ? (
          <div className={`p-2 rounded-lg text-xs font-bold ${feedback.success ? 'bg-emerald-400 text-emerald-950' : 'bg-rose-400 text-slate-950'}`}>
            {feedback.msg}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button onClick={() => handleChoice('organico')} className="bg-amber-700/80 hover:bg-amber-700 p-2 rounded-lg transition">
              Orgánico
            </button>
            <button onClick={() => handleChoice('inorganico')} className="bg-emerald-600/80 hover:bg-emerald-600 p-2 rounded-lg transition">
              Plástico/Lata
            </button>
            <button onClick={() => handleChoice('papel')} className="bg-blue-600/80 hover:bg-blue-600 p-2 rounded-lg transition">
              Papel/Cartón
            </button>
            <button onClick={() => handleChoice('vidrio')} className="bg-teal-700/80 hover:bg-teal-700 p-2 rounded-lg transition">
              Vidrio
            </button>
          </div>
        )}

        <div className="text-[11px] text-emerald-300 font-semibold pt-1">
          Puntaje Acumulado: {score} Pts
        </div>
      </div>
    </div>
  );
}

// --- FOOTER COMPONENT ---
function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <EcoHuellaLogo />
            <p className="text-xs text-slate-400 leading-relaxed pt-2">
              Dejando huella por el futuro. Iniciativa de concientización, reciclaje urbano y participación ciudadana.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Navegación</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-white">Inicio</button></li>
              <li><button onClick={() => setActiveTab('ideas')} className="hover:text-white">Proyectos DIY</button></li>
              <li><button onClick={() => setActiveTab('mapa')} className="hover:text-white">Actividades Cerca</button></li>
              <li><button onClick={() => setActiveTab('conferencias')} className="hover:text-white">Conferencias</button></li>
              <li><button onClick={() => setActiveTab('guia')} className="hover:text-white">Guía de Reciclaje</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Contacto Ciudadano</h4>
            <p className="text-xs text-slate-300">Oficina de Enlace Ecológico</p>
            <p className="text-xs text-slate-400 mt-1">contacto@ecohuella-ciudad.org</p>
            <p className="text-xs text-slate-400">Tel: (656) 555-0199</p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Boletín de Actividades</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Tu correo" 
                className="bg-slate-800 text-xs px-3 py-2 rounded-lg w-full text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button className="bg-emerald-600 hover:bg-emerald-500 p-2 rounded-lg text-white font-bold text-xs">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} EcoHuella - Proyecto de Concientización y Reciclaje Local.
        </div>
      </div>
    </footer>
  );
}

// --- MOCK DATA FOR DIY IDEAS (PINTEREST STYLE) ---
const DIY_IDEAS_DATA = [
  {
    id: 1,
    title: "Macetas Auto-Regables con Botellas PET",
    category: "Plástico",
    difficulty: "Fácil",
    timeNeeded: "20 min",
    likes: 142,
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
    description: "Aprovecha botellas de plástico vacías para crear un sistema de autorriego ideal para menta, albahaca y suculentas.",
    materials: ["Botella de plástico de 2L", "Cuerda de algodón o estambre", "Tierra para macetas", "Tijeras / Cúter", "Semillas o brote"],
    steps: [
      "Corta la botella de plástico por la mitad.",
      "Haz un pequeño orificio en la tapa de la botella y pasa la cuerda de algodón.",
      "Coloca la parte superior de la botella boca abajo dentro de la base inferior.",
      "Lena la base inferior con agua y la parte superior con tierra y la planta. La cuerda absorberá la humedad automáticamente."
    ]
  },
  {
    id: 2,
    title: "Compostero Casero en Caja de Frutas",
    category: "Orgánico",
    difficulty: "Intermedio",
    timeNeeded: "45 min",
    likes: 210,
    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=800&q=80",
    description: "Aprende a transformar los desperdicios de cocina en abono rico para tus plantas usando huacales de madera.",
    materials: ["Caja de madera o huacal", "Cartón seco perforado", "Restos verdes (cáscaras)", "Hojas secas (café)"],
    steps: [
      "Forra el interior del huacal con cartón seco con pequeños orificios para ventilación.",
      "Añade una capa base de hojas secas y ramas finas.",
      "Agrega tus restos de cocina vegetales y cubre con otra capa de hojas secas.",
      "Mantén con humedad moderada y mezcla una vez por semana."
    ]
  },
  {
    id: 3,
    title: "Lámparas Colgantes con Frascos de Vidrio",
    category: "Vidrio",
    difficulty: "Avanzado",
    timeNeeded: "1 hora",
    likes: 98,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    description: "Reutiliza frascos de conserva o mermelada para crear una iluminación cálida e industrial.",
    materials: ["Frascos de vidrio limpios", "Cable textil con socket", "Focos LED de bajo consumo", "Perforadora para metal"],
    steps: [
      "Limpia bien los frascos de vidrio y quita el pegamento de las etiquetas con aceite.",
      "Perfora la tapa metálica del frasco del tamaño del socket.",
      "Instala el cableado de forma segura y enrosca el foco LED dentro del frasco."
    ]
  },
  {
    id: 4,
    title: "Organizador de Escritorio de Cartón",
    category: "Cartón",
    difficulty: "Fácil",
    timeNeeded: "30 min",
    likes: 175,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    description: "Crea compartimentos para lápices, papeles y cables utilizando cajas de cereal o envases rígidos.",
    materials: ["Cajas de cereal limpias", "Papel kraft o pinturas de agua", "Pegamento", "Tijeras"],
    steps: [
      "Corta las cajas de cereal en diagonal a diferentes alturas.",
      "Une las cajas con pegamento para formar una estructura con varios pisos.",
      "Decora el exterior con pinturas o papel kraft reciclado."
    ]
  },
  {
    id: 5,
    title: "Hotel de Insectos y Polinizadores",
    category: "Jardín",
    difficulty: "Intermedio",
    timeNeeded: "50 min",
    likes: 310,
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb1b7a5?auto=format&fit=crop&w=800&q=80",
    description: "Refugio para abejas solitarias y mariquitas usando piñas de pino, cañas y trozos de madera.",
    materials: ["Caja de madera sin tratar", "Cañas de bambú huecas", "Piñas de pino secas", "Malla metálica"],
    steps: [
      "Agrupa las cañas de bambú y las piñas bien apretadas dentro de la caja.",
      "Sujeta el frente con malla metálica para evitar que caigan los materiales.",
      "Coloca el hotel en un lugar protegido de la lluvia en tu jardín."
    ]
  }
];

// --- MOCK DATA FOR LOCAL CLEANUP ACTIVITIES ---
const CLEANUP_EVENTS_DATA = [
  {
    id: 1,
    title: "Limpieza Comunitaria del Río & Ribera",
    type: "Jornada de Limpieza",
    date: "Sábado 15 de Nov",
    time: "09:00 AM - 12:00 PM",
    location: "Parque Lineal de la Ribera",
    volunteersCount: 38,
    mapX: 42,
    mapY: 35,
    description: "Retiro de plásticos, bolsas y botellas acumuladas en el cauce del río. Incluye hidratación y kits."
  },
  {
    id: 2,
    title: "Reforestación y Pintura de Bancas",
    type: "Restauración Verde",
    date: "Domingo 23 de Nov",
    time: "10:00 AM - 01:30 PM",
    location: "Plaza de la Comunidad Norte",
    volunteersCount: 25,
    mapX: 68,
    mapY: 60,
    description: "Siembra de 30 árboles nativos y restauración de espacios de juego infantiles."
  },
  {
    id: 3,
    title: "Taller Abierto de Compostaje en Parque",
    type: "Taller Comunitario",
    date: "Sábado 29 de Nov",
    time: "11:00 AM - 01:00 PM",
    location: "Vivero Municipal Central",
    volunteersCount: 19,
    mapX: 25,
    mapY: 70,
    description: "Aprende de manera práctica a iniciar tu compostera casera con restos de comida."
  }
];

// --- MOCK DATA FOR CONFERENCES ---
const CONFERENCES_DATA = [
  {
    id: 1,
    title: "Economía Circular: De Residuo a Recurso en la Ciudad",
    speaker: "Dra. Elena Rostova",
    speakerRole: "Especialista en Gestión Ambiental",
    speakerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    date: "Jueves 12 de Noviembre",
    time: "06:00 PM - 07:30 PM",
    mode: "Presencial & Streaming",
    description: "Estrategias prácticas para reducir desperdicios a escala familiar y pequeños comercios locales."
  },
  {
    id: 2,
    title: "El Impacto de los Microplásticos en Nuestro Entorno",
    speaker: "Ing. Carlos Mendoza",
    speakerRole: "Fundador de Ecología Activa",
    speakerAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    date: "Martes 18 de Noviembre",
    time: "05:00 PM - 06:30 PM",
    mode: "Online (Zoom)",
    description: "Análisis del ciclo de vida del plástico y cómo sustituirlo efectivamente en el consumo diario."
  }
];