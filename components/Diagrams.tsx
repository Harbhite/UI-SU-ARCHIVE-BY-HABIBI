/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Scale, Landmark, BookOpen } from 'lucide-react';

// --- TIMELINE DIAGRAM ---
export const TimelineDiagram: React.FC = () => {
  const [activeEra, setActiveEra] = useState<string>('1948');
  
  const eras = [
    { id: '1948', title: 'The Foundation', desc: 'The University College Ibadan is established. The Students Union is formed shortly after as the first in Nigeria, setting the precedent for student activism.', icon: <Landmark size={20}/> },
    { id: '1971', title: 'Kunle Adepeju', desc: 'A dark day. Kunle Adepeju becomes the first student martyr in Nigeria during a protest against cafeteria management and poor welfare conditions.', icon: <Users size={20}/> },
    { id: '1978', title: 'Ali Must Go', desc: 'UI students play a central role in the nationwide "Ali Must Go" protests against education commercialization, solidifying the Aluta spirit.', icon: <Scale size={20}/> },
    { id: '2024', title: 'Digital Era', desc: 'The Union evolves, embracing technology for elections (e-voting) and digital archives while maintaining its fierce advocacy for welfare.', icon: <Calendar size={20}/> },
  ];

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-stone-200 my-8 w-full">
      <h3 className="font-serif text-2xl mb-2 text-ui-blue">Historical Timeline</h3>
      <p className="text-sm text-stone-500 mb-8 text-center max-w-md">
        Trace the pivotal moments that shaped the Union.
      </p>
      
      <div className="relative w-full max-w-2xl">
         {/* Line */}
         <div className="absolute top-6 left-0 w-full h-1 bg-stone-200 rounded-full"></div>
         
         {/* Nodes */}
         <div className="flex justify-between relative z-10">
             {eras.map((era) => (
                 <button
                    key={era.id}
                    onClick={() => setActiveEra(era.id)}
                    className={`flex flex-col items-center gap-3 transition-all duration-300 group`}
                 >
                     <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${activeEra === era.id ? 'bg-ui-blue border-nobel-gold text-white scale-110 shadow-lg' : 'bg-white border-stone-300 text-stone-400 hover:border-ui-blue'}`}>
                        {era.icon}
                     </div>
                     <span className={`text-sm font-bold font-serif ${activeEra === era.id ? 'text-ui-blue' : 'text-stone-400'}`}>{era.id}</span>
                 </button>
             ))}
         </div>
      </div>

      {/* Content Display */}
      <div className="mt-8 w-full max-w-lg min-h-[120px] text-center">
         {eras.map((era) => activeEra === era.id && (
             <motion.div
                key={era.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-stone-50 p-6 rounded-lg border border-stone-100"
             >
                 <h4 className="font-serif text-xl text-stone-900 mb-2">{era.title}</h4>
                 <p className="text-stone-600 leading-relaxed">{era.desc}</p>
             </motion.div>
         ))}
      </div>
    </div>
  );
};

// --- STRUCTURE DIAGRAM ---
export const StructureDiagram: React.FC = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center p-8 bg-[#F5F4F0] rounded-xl border border-stone-200 my-8 w-full">
      <h3 className="font-serif text-xl mb-4 text-stone-900">Structure of the Union</h3>
      <p className="text-sm text-stone-600 mb-8 text-center max-w-md">
        The three arms of government ensuring checks and balances.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          {/* CEC */}
          <div 
            className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm hover:shadow-md transition-all cursor-default relative overflow-hidden group"
            onMouseEnter={() => setHoveredSection('cec')}
            onMouseLeave={() => setHoveredSection(null)}
          >
             <div className="absolute top-0 left-0 w-1 h-full bg-nobel-gold"></div>
             <div className="mb-4 text-nobel-gold"><Landmark size={32}/></div>
             <h4 className="font-bold text-stone-900 mb-2">The CEC</h4>
             <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Executive Council</p>
             <p className="text-sm text-stone-600">Headed by the President. Responsible for daily administration, welfare, and implementation of policies.</p>
          </div>

          {/* SRC */}
          <div 
            className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm hover:shadow-md transition-all cursor-default relative overflow-hidden group"
            onMouseEnter={() => setHoveredSection('src')}
            onMouseLeave={() => setHoveredSection(null)}
          >
             <div className="absolute top-0 left-0 w-1 h-full bg-stone-800"></div>
             <div className="mb-4 text-stone-800"><Users size={32}/></div>
             <h4 className="font-bold text-stone-900 mb-2">The SRC</h4>
             <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Representative Council</p>
             <p className="text-sm text-stone-600">Composed of representatives from all faculties and halls. They make laws and check the executive.</p>
          </div>

          {/* JUDICIARY */}
          <div 
            className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm hover:shadow-md transition-all cursor-default relative overflow-hidden group"
            onMouseEnter={() => setHoveredSection('judiciary')}
            onMouseLeave={() => setHoveredSection(null)}
          >
             <div className="absolute top-0 left-0 w-1 h-full bg-blue-900"></div>
             <div className="mb-4 text-blue-900"><Scale size={32}/></div>
             <h4 className="font-bold text-stone-900 mb-2">The Judiciary</h4>
             <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Student Court</p>
             <p className="text-sm text-stone-600">Interprets the constitution and settles disputes. Ensures justice prevails in union affairs.</p>
          </div>
      </div>
    </div>
  );
};

// --- STATS CHART ---
export const PopulationChart: React.FC = () => {
    // Simplified bar chart for student population/influence
    const data = [
        { year: 1948, count: 104, label: 'Pioneers' },
        { year: 1960, count: 1200, label: 'Independence' },
        { year: 1990, count: 12000, label: 'Expansion' },
        { year: 2024, count: 35000, label: 'Present Day' }
    ];
    
    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-stone-900 text-stone-100 rounded-xl my-8 border border-stone-800 shadow-lg w-full">
            <div className="flex-1 min-w-[240px]">
                <h3 className="font-serif text-xl mb-2 text-nobel-gold">The Growing Legion</h3>
                <p className="text-stone-400 text-sm mb-4 leading-relaxed">
                    From a humble beginning of 104 students in 1948, the Union now represents the interests of over 35,000 intellectuals. "Greatest Uites" are a force to be reckoned with.
                </p>
                <div className="flex items-center gap-3 mt-4">
                    <BookOpen className="text-nobel-gold" size={20} />
                    <span className="text-xs font-bold tracking-widest uppercase text-stone-500">Knowledge & Service</span>
                </div>
            </div>
            
            <div className="relative w-full md:w-80 h-64 bg-stone-800/50 rounded-xl border border-stone-700/50 p-6 flex justify-between items-end gap-4">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-10">
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                </div>

                {data.map((item, i) => (
                    <div key={item.year} className="flex-1 flex flex-col justify-end items-center h-full z-10 group">
                        <div className="flex-1 w-full flex items-end justify-center relative mb-3">
                            <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-white bg-stone-900 px-2 py-1 rounded border border-stone-600">{item.count.toLocaleString()}</div>
                            <motion.div 
                                className="w-full bg-gradient-to-t from-stone-700 to-nobel-gold rounded-t-sm"
                                initial={{ height: 0 }}
                                whileInView={{ height: `${(item.count / 35000) * 100}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                            />
                        </div>
                        <div className="h-4 flex items-center text-[10px] font-bold text-stone-500">{item.year}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}