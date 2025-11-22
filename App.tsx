
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, TowerScene } from './components/QuantumScene';
import { TimelineDiagram, StructureDiagram, PopulationChart } from './components/Diagrams';
import { CampusMap, HallGrid } from './components/CampusMap';
import { GovernancePage } from './components/Governance';
import { PastLeadersPage } from './components/PastLeaders';
import { ArrowDown, Menu, X, BookOpen, ArrowRight } from 'lucide-react';

const LeaderCard = ({ name, role, delay }: { name: string, role: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-nobel-gold/50" style={{ animationDelay: delay }}>
      <div className="w-16 h-16 rounded-full bg-stone-100 mb-4 flex items-center justify-center text-2xl font-serif text-nobel-gold font-bold border border-stone-200">
        {name.charAt(0)}
      </div>
      <h3 className="font-serif text-xl text-stone-900 text-center mb-2">{name}</h3>
      <div className="w-8 h-0.5 bg-nobel-gold mb-3 opacity-60"></div>
      <p className="text-xs text-stone-500 font-bold uppercase tracking-widest text-center leading-relaxed">{role}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'governance' | 'history'>('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset scroll when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    
    if (view !== 'home') {
      setView('home');
      // Wait for render then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
    } else {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    }
  };

  // If we are in a sub-view, return that component
  if (view === 'governance') {
    return <GovernancePage onBack={() => setView('home')} />;
  }

  if (view === 'history') {
    return <PastLeadersPage onBack={() => setView('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <div className="w-10 h-10 bg-ui-blue rounded-sm flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm border border-nobel-gold">UI</div>
            <div className="flex flex-col">
                <span className={`font-serif font-bold text-lg tracking-wide leading-none text-ui-blue transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
                UISU ARCHIVE
                </span>
                <span className="text-[10px] tracking-[0.2em] text-nobel-gold uppercase font-bold">Est. 1948</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Introduction</a>
            <a href="#history" onClick={scrollToSection('history')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">History</a>
            <a href="#halls" onClick={scrollToSection('halls')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">The Republics</a>
            <a href="#leaders" onClick={scrollToSection('leaders')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Leadership</a>
            <button 
                onClick={() => setView('governance')}
                className="hover:text-nobel-gold transition-colors cursor-pointer uppercase"
            >
                Governance
            </button>
            <a 
              href="#" 
              className="px-5 py-2 bg-ui-blue text-white rounded-full hover:bg-stone-800 transition-colors shadow-sm cursor-pointer border border-transparent hover:border-nobel-gold"
            >
              Support the Archive
            </a>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Introduction</a>
            <a href="#history" onClick={scrollToSection('history')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">History</a>
            <a href="#halls" onClick={scrollToSection('halls')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">The Republics</a>
            <button onClick={() => { setMenuOpen(false); setView('governance'); }} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Governance</button>
            <button onClick={() => { setMenuOpen(false); setView('history'); }} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Archives</button>
            <a 
              href="#" 
              onClick={() => setMenuOpen(false)} 
              className="px-6 py-3 bg-ui-blue text-white rounded-full shadow-lg cursor-pointer"
            >
              Support
            </a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.92)_0%,rgba(249,248,244,0.6)_50%,rgba(249,248,244,0.3)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-nobel-gold text-nobel-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30">
            The Premier Students' Union
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-medium leading-tight md:leading-[0.9] mb-8 text-ui-blue drop-shadow-sm">
            The Greatest <br/><span className="italic font-normal text-stone-600 text-3xl md:text-5xl block mt-4">Uites</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-700 font-light leading-relaxed mb-12">
            Preserving the legacy, struggle, and intellectual dominance of the University of Ibadan Students' Union since 1948.
          </p>
          
          <div className="flex justify-center">
             <a href="#introduction" onClick={scrollToSection('introduction')} className="group flex flex-col items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
                <span>ENTER THE ARCHIVE</span>
                <span className="p-2 border border-stone-300 rounded-full group-hover:border-stone-900 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction */}
        <section id="introduction" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">About Us</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-stone-900">First and Best</h2>
              <div className="w-16 h-1 bg-nobel-gold mb-6"></div>
            </div>
            <div className="md:col-span-8 text-lg text-stone-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-nobel-gold">F</span>ounded in 1948 along with the University itself, the University of Ibadan Students' Union is the <strong>oldest and most prestigious</strong> student body in Nigeria. 
              </p>
              <p>
                Known as the "Intellectual Capital of Nigeria," the Union has been at the forefront of national consciousness, producing leaders, activists, and captains of industry. From the anti-colonial struggles to the fight for democracy, Uites have always stood on the side of the people. This archive serves to document that rich history.
              </p>
            </div>
          </div>
        </section>

        {/* History Timeline */}
        <section id="history" className="py-24 bg-white border-t border-stone-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200">
                            <BookOpen size={14}/> THE JOURNEY
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">The Aluta Spirit</h2>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                           The history of the Union is written in the ink of intellectualism and the sweat of struggle. We remember the heroes who paid the ultimate price and the victories won for the welfare of the Nigerian student.
                        </p>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                            Explore the timeline to see the defining moments that shaped the Union from its inception to the modern digital age.
                        </p>
                    </div>
                    <div className="w-full">
                        <TimelineDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* Structure & Governance */}
        <section className="py-24 bg-stone-900 text-stone-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-ui-blue blur-[100px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-nobel-gold blur-[100px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1 w-full">
                        <StructureDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-700">
                            GOVERNANCE
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Union Structure</h2>
                        <p className="text-lg text-stone-400 mb-6 leading-relaxed">
                            The Union operates on a democratic system modeled after the federal government. It ensures that every Uite, from Katanga to Queens, has a voice.
                        </p>
                        <p className="text-lg text-stone-400 leading-relaxed mb-8">
                            The <strong>Central Executive Council (CEC)</strong> executes policy, the <strong>Student Representative Council (SRC)</strong> legislates, and the <strong>Judicial Council</strong> interprets the law.
                        </p>
                        <button 
                            onClick={() => setView('governance')}
                            className="flex items-center gap-2 text-nobel-gold font-bold uppercase tracking-wider text-sm hover:text-white transition-colors group"
                        >
                            View Full Constitution & Structure <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                     </div>
                </div>
            </div>
        </section>

        {/* Halls of Residence Map */}
        <section id="halls" className="py-24 bg-white border-t border-stone-200">
          <div className="container mx-auto px-6">
             <div className="text-center mb-12">
                <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">THE REPUBLICS</div>
                <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Halls of Residence</h2>
                <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
                   In UI, halls are more than just hostels; they are Republics with their own governments, traditions, and "Aro" culture. Explore the map or browse the grid to discover the distinct identity of each hall.
                </p>
             </div>
             
             <div className="max-w-5xl mx-auto">
                <CampusMap />
                <HallGrid />
             </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-24 bg-[#F9F8F4]">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">A Growing Legacy</h2>
                    <p className="text-lg text-stone-600 leading-relaxed">
                        The influence of the Union has grown alongside the university population. What started as a small gathering of scholars is now a massive movement.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <PopulationChart />
                </div>
            </div>
        </section>

        {/* Culture / Tower */}
        <section id="culture" className="py-24 bg-white border-t border-stone-200">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative min-h-[400px]">
                    <div className="absolute inset-0 bg-[#F5F4F0] rounded-xl overflow-hidden border border-stone-200 shadow-inner">
                        <TowerScene />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-stone-400 font-serif italic">The Tower of Ibadan</div>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">CULTURE</div>
                    <h2 className="font-serif text-4xl mb-6 text-stone-900">Campus & Heritage</h2>
                    <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                        Life as a Uite is unique. From the gyration at the SUB (Student Union Building) to the quiet study sessions at Kenneth Dike Library. 
                    </p>
                    <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                        The halls of residence—Mellamby, Tedder, Kuti, Sultan Bello, Independence, Nnamdi Azikiwe, Queens, Idia, Awolowo—are not just dormitories; they are nations with their own rich traditions and political weight.
                    </p>
                    
                    <div className="p-6 bg-[#F9F8F4] border border-stone-200 rounded-lg border-l-4 border-l-ui-blue">
                        <p className="font-serif italic text-xl text-stone-800 mb-4">
                            "If you are not a Uite, you are not a Uite. First and Best."
                        </p>
                        <span className="text-sm font-bold text-stone-500 tracking-wider uppercase">— The Anthem</span>
                    </div>
                </div>
             </div>
        </section>

        {/* Leaders */}
        <section id="leaders" className="py-24 bg-[#F5F4F0] border-t border-stone-300">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">HALL OF FAME</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-stone-900">Notable Figures</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">Honoring those who served and those who laid down the foundation.</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center flex-wrap">
                    <LeaderCard 
                        name="Kunle Adepeju" 
                        role="The Martyr (1971)" 
                        delay="0s" 
                    />
                    <LeaderCard 
                        name="Segun Okeowo" 
                        role="Ali Must Go (1978)" 
                        delay="0.1s" 
                    />
                    <LeaderCard 
                        name="Bolaji Aweda" 
                        role="Union President (2024)" 
                        delay="0.2s" 
                    />
                    <LeaderCard 
                        name="Ojo Aderemi" 
                        role="Activist (2017)" 
                        delay="0.3s" 
                    />
                </div>
                <div className="text-center mt-12">
                     <button 
                        onClick={() => setView('history')}
                        className="px-6 py-3 bg-white border border-stone-300 rounded-full text-stone-600 font-bold text-sm uppercase tracking-wider hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all shadow-sm"
                     >
                        Browse Full Executives Archive
                     </button>
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2">UISU ARCHIVE</div>
                <p className="text-sm">Documenting the history of the University of Ibadan Students' Union.</p>
            </div>
            <div className="flex gap-6 text-sm font-medium">
                <a href="#" className="hover:text-white transition-colors">Contact</a>
                <a href="#" className="hover:text-white transition-colors">Donate</a>
                <a href="#" className="hover:text-white transition-colors">Submit History</a>
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-stone-600">
            © 2024 UISU Archive Project. Not officially affiliated with the University administration.
        </div>
      </footer>
    </div>
  );
};

export default App;
