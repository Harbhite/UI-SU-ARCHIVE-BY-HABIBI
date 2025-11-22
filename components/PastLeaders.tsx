
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Award, Calendar, User } from 'lucide-react';

interface PastLeadersProps {
  onBack: () => void;
}

interface Administration {
    session: string;
    president: string;
    alias: string; // President's alias
    motto: string; // Regime name/motto
    notableEvents: string;
    status: 'Completed' | 'Suspended' | 'Impeached' | 'Active';
}

const administrations: Administration[] = [
    {
        session: "2024/2025",
        president: "Aweda Bolaji",
        alias: "Oloye",
        motto: "Team inclusive",
        notableEvents: "Current administration focusing on inclusivity and student welfare amid rising costs.",
        status: "Active"
    },
    {
        session: "2023/2024",
        president: "Samuel Samson Tobiloba",
        alias: "Host",
        motto: "Team Reform",
        notableEvents: "Focused on reforming union processes and digitalizing the secretariat.",
        status: "Completed"
    },
    {
        session: "2021/2022",
        president: "Adewole Adeyinka",
        alias: "Mascot",
        motto: "Team Restoration",
        notableEvents: "Restored the union after a long period of suspension and caretaker committees.",
        status: "Completed"
    },
    {
        session: "2019/2020",
        president: "Akeju Olusegun",
        alias: "Akeju",
        motto: "Unification",
        notableEvents: "Managed student affairs during the COVID-19 pandemic transition.",
        status: "Completed"
    },
    {
        session: "2017/2018",
        president: "Ojo Aderemi",
        alias: "Patriotic Intelligentsia",
        motto: "Patriotic Intelligentsia",
        notableEvents: "Historically suspended for leading a protest against ID card fees. Famous 'Book of Life' speech.",
        status: "Suspended"
    },
    {
        session: "2014/2015",
        president: "Odesola Victor",
        alias: "Odesola",
        motto: "Redemption",
        notableEvents: "Advocated for better hostel facilities.",
        status: "Completed"
    },
    {
        session: "2011/2012",
        president: "Edet Tokunbo",
        alias: "Tokunbo",
        motto: "Transformation",
        notableEvents: "Led protests against fee hikes.",
        status: "Completed"
    },
    {
        session: "1994/1995",
        president: "Sowore Omoyele",
        alias: "Sowore",
        motto: "Anti-Military",
        notableEvents: "Led fierce anti-military protests during the Abacha regime. Expelled/Suspended multiple times.",
        status: "Suspended"
    },
    {
        session: "1978/1979",
        president: "Segun Okeowo",
        alias: "Okeowo",
        motto: "Ali Must Go",
        notableEvents: "Led the nationwide 'Ali Must Go' protests against the commercialization of education.",
        status: "Impeached" // Removed from the constituent assembly, rusticated
    },
    {
        session: "1970/1971",
        president: "Speaker (Acting)",
        alias: "Kunle Adepeju Era",
        motto: "Welfare",
        notableEvents: "Kunle Adepeju was shot by police during a peaceful protest, becoming the first student martyr.",
        status: "Completed"
    }
];

export const PastLeadersPage: React.FC<PastLeadersProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAdmins = administrations.filter(admin => 
    admin.president.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.session.includes(searchTerm) ||
    admin.alias.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F5F4F0] pt-24 pb-16">
      <div className="container mx-auto px-6">
        <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-stone-500 hover:text-ui-blue transition-colors mb-8 font-medium"
        >
            <div className="p-2 rounded-full bg-white border border-stone-200 group-hover:border-ui-blue transition-colors">
                <ArrowLeft size={16} />
            </div>
            <span>Back to Archive</span>
        </button>

        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
                <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">HALL OF FAME</div>
                <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">Executive Archive</h1>
                <p className="text-stone-600 max-w-xl leading-relaxed">
                    A chronicled list of past Students' Union administrations. These individuals bore the burden of Aluta to preserve the heritage of the Union.
                </p>
            </div>
            
            <div className="relative w-full md:w-72">
                <input 
                    type="text" 
                    placeholder="Search by name or year..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-nobel-gold focus:ring-1 focus:ring-nobel-gold text-stone-800 placeholder-stone-400"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
            {filteredAdmins.length > 0 ? (
                filteredAdmins.map((admin, index) => (
                    <motion.div 
                        key={admin.session}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white p-6 rounded-lg border border-stone-200 hover:border-nobel-gold hover:shadow-md transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-1 h-full bg-stone-200 group-hover:bg-nobel-gold transition-colors"></div>
                        
                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                            <div className="min-w-[100px]">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold rounded-full border border-stone-200">
                                    <Calendar size={12} /> {admin.session}
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-1">
                                    <h3 className="font-serif text-xl text-stone-900 font-bold">{admin.president}</h3>
                                    <span className="text-sm text-stone-500 italic">"{admin.alias}"</span>
                                </div>
                                <div className="text-xs font-bold tracking-widest text-ui-blue uppercase mb-2">{admin.motto}</div>
                                <p className="text-stone-600 text-sm leading-relaxed">{admin.notableEvents}</p>
                            </div>

                            <div className="min-w-[120px] text-right">
                                <span className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm ${
                                    admin.status === 'Active' ? 'bg-green-100 text-green-800' :
                                    admin.status === 'Suspended' ? 'bg-red-100 text-red-800' :
                                    admin.status === 'Impeached' ? 'bg-orange-100 text-orange-800' :
                                    'bg-stone-100 text-stone-500'
                                }`}>
                                    {admin.status}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))
            ) : (
                <div className="py-12 text-center text-stone-500 bg-white rounded-lg border border-stone-200 border-dashed">
                    <p>No records found matching "{searchTerm}"</p>
                </div>
            )}
        </div>
        
        <div className="mt-12 p-6 bg-[#EFECE6] rounded-lg border border-stone-200 text-center">
            <p className="text-sm text-stone-600 font-serif italic">
                "The labor of our heroes past shall never be in vain."
            </p>
        </div>

      </div>
    </div>
  );
}
