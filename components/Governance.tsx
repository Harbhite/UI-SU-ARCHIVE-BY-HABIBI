
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Landmark, Users, Scale, Gavel, Mic, Book, Coins, Shield, Trophy } from 'lucide-react';

interface GovernanceProps {
  onBack: () => void;
}

export const GovernancePage: React.FC<GovernanceProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'cec' | 'src' | 'judiciary'>('cec');

  return (
    <div className="min-h-screen bg-[#F9F8F4] pt-24 pb-16">
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

        <div className="mb-12">
            <div className="inline-block mb-3 text-xs font-bold tracking-widest text-nobel-gold uppercase">The System</div>
            <h1 className="font-serif text-4xl md:text-6xl text-stone-900 mb-6">Union Structure</h1>
            <p className="text-lg text-stone-600 max-w-3xl leading-relaxed">
                The University of Ibadan Students' Union acts as a sovereign state within the university. 
                Its governance is modeled after the Federal Republic of Nigeria, ensuring a complete separation of powers 
                to guarantee accountability, representation, and justice.
            </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 border-b border-stone-200 pb-1">
            <button 
                onClick={() => setActiveTab('cec')}
                className={`pb-4 px-2 text-sm font-bold tracking-widest uppercase transition-all relative ${activeTab === 'cec' ? 'text-ui-blue' : 'text-stone-400 hover:text-stone-600'}`}
            >
                <span className="flex items-center gap-2"><Landmark size={16}/> The Executive (CEC)</span>
                {activeTab === 'cec' && <motion.div layoutId="tab-line" className="absolute bottom-0 left-0 w-full h-1 bg-ui-blue" />}
            </button>
            <button 
                onClick={() => setActiveTab('src')}
                className={`pb-4 px-2 text-sm font-bold tracking-widest uppercase transition-all relative ${activeTab === 'src' ? 'text-ui-blue' : 'text-stone-400 hover:text-stone-600'}`}
            >
                <span className="flex items-center gap-2"><Users size={16}/> The Legislative (SRC)</span>
                {activeTab === 'src' && <motion.div layoutId="tab-line" className="absolute bottom-0 left-0 w-full h-1 bg-ui-blue" />}
            </button>
            <button 
                onClick={() => setActiveTab('judiciary')}
                className={`pb-4 px-2 text-sm font-bold tracking-widest uppercase transition-all relative ${activeTab === 'judiciary' ? 'text-ui-blue' : 'text-stone-400 hover:text-stone-600'}`}
            >
                <span className="flex items-center gap-2"><Scale size={16}/> The Judiciary</span>
                {activeTab === 'judiciary' && <motion.div layoutId="tab-line" className="absolute bottom-0 left-0 w-full h-1 bg-ui-blue" />}
            </button>
        </div>

        {/* Content */}
        <div className="min-h-[500px]">
            {activeTab === 'cec' && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <RoleCard 
                        title="The President" 
                        icon={<Landmark size={24}/>}
                        desc="The Number One Student. The President is the Chief Executive Officer of the Union, responsible for the general administration and representing the Union in all capacities."
                        color="bg-stone-900 text-white"
                    />
                    <RoleCard 
                        title="Vice President" 
                        icon={<Trophy size={24}/>}
                        desc="Constitutional head of the Academic and Welfare Committee. The VP deputizes for the President and traditionally oversees academic competitions and welfare matters."
                    />
                    <RoleCard 
                        title="General Secretary" 
                        icon={<Book size={24}/>}
                        desc="The Scribe of the Union. Responsible for the Union's correspondence, keeping records, and managing the Secretariat. Often seen as the engine room of the administration."
                    />
                    <RoleCard 
                        title="Asst. General Secretary" 
                        icon={<Book size={24}/>}
                        desc="Assists the General Secretary and records minutes of meetings. Often in charge of specific internal duties within the Secretariat."
                    />
                    <RoleCard 
                        title="Treasurer" 
                        icon={<Coins size={24}/>}
                        desc="Custodian of the Union's funds. Ensures that all monies are banked and keeps strict records of income and expenditure in liaison with the Financial Secretary."
                    />
                    <RoleCard 
                        title="House Secretary" 
                        icon={<Shield size={24}/>}
                        desc="The Minister of Welfare. Responsible for the maintenance of the Union building (SUB) and general welfare of students in halls of residence and faculties."
                    />
                    <RoleCard 
                        title="Public Relations Officer" 
                        icon={<Mic size={24}/>}
                        desc="The Image Maker. Responsible for information dissemination, press releases, and managing the Union's public image."
                    />
                    <RoleCard 
                        title="Sports Secretary" 
                        icon={<Trophy size={24}/>}
                        desc="Organizes sporting activities, the Dean's Cup, and the Inter-Hall games. Promotes physical fitness among Uites."
                    />
                </motion.div>
            )}

            {activeTab === 'src' && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12"
                >
                    <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm">
                        <h3 className="font-serif text-2xl mb-4 text-stone-900">The Students' Representative Council</h3>
                        <p className="text-stone-600 leading-relaxed mb-6">
                            The SRC is the highest policy-making body of the Union. It consists of elected representatives from every Hall of Residence and Faculty Constituency.
                            Often described as the "hallowed chambers," the SRC checks the excesses of the Executive and approves the budget.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-stone-50 p-6 rounded border border-stone-100">
                                <h4 className="font-bold text-stone-900 mb-2">Composition</h4>
                                <p className="text-sm text-stone-600">
                                    Historically composed of 109 members (Senators), representing the diverse population of Uites. Representation is proportional based on constituency size.
                                </p>
                            </div>
                            <div className="bg-stone-50 p-6 rounded border border-stone-100">
                                <h4 className="font-bold text-stone-900 mb-2">Powers</h4>
                                <ul className="text-sm text-stone-600 list-disc list-inside space-y-2">
                                    <li>Budget Approval & Appropriation</li>
                                    <li>Impeachment of Executive Officers</li>
                                    <li>Passing Bye-Laws</li>
                                    <li>Investigative Oversight</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                         <h3 className="font-serif text-2xl mb-6 text-stone-900">Principal Officers</h3>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <RoleCard 
                                title="The Speaker" 
                                icon={<Gavel size={24}/>}
                                desc="The Number Three Student. Presides over all SRC meetings, interprets standing orders, and maintains order in the house."
                                color="bg-stone-800 text-white"
                            />
                             <RoleCard 
                                title="Deputy Speaker" 
                                icon={<Users size={24}/>}
                                desc="Assists the Speaker and presides in their absence. Often heads key legislative committees."
                            />
                             <RoleCard 
                                title="Clerk of the House" 
                                icon={<Book size={24}/>}
                                desc="The administrative head of the SRC. Records votes, proceedings, and maintains the legislative archives."
                            />
                         </div>
                    </div>
                </motion.div>
            )}

            {activeTab === 'judiciary' && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-stone-100 rounded-full -mr-32 -mt-32 opacity-50 pointer-events-none"></div>
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <h3 className="font-serif text-2xl mb-4 text-stone-900 flex items-center gap-3">
                                <Scale className="text-nobel-gold"/> The Judicial Council
                            </h3>
                            <p className="text-stone-600 leading-relaxed mb-6">
                                The Judiciary acts as the interpreter of the Union Constitution. It adjudicates disputes between students, between arms of government, and ensures that the rule of law prevails.
                            </p>
                            <p className="text-stone-600 leading-relaxed mb-8">
                                It is composed of the Chief Justice, Judges from various halls, and the Registrar.
                            </p>

                            <div className="border-l-4 border-nobel-gold pl-6 py-2 bg-stone-50 rounded-r-lg">
                                <h4 className="font-bold text-stone-900 mb-1">Independence</h4>
                                <p className="text-sm text-stone-500 italic">
                                    "Justice must not only be done, but must be seen to be done."
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-stone-900 text-stone-100 p-6 rounded-lg shadow-lg">
                            <div className="mb-4 text-nobel-gold"><Gavel size={32} /></div>
                            <h4 className="font-serif text-xl mb-2">The Chief Justice</h4>
                            <p className="text-stone-400 text-sm leading-relaxed mb-4">
                                The head of the Judicial arm. Appointed to uphold the constitution without fear or favor.
                            </p>
                            <div className="h-px w-full bg-stone-700 my-4"></div>
                            <div className="text-xs uppercase tracking-widest text-stone-500 font-bold">Jurisdiction</div>
                            <ul className="mt-2 text-sm space-y-2 text-stone-300">
                                <li>• Constitutional Interpretation</li>
                                <li>• Electoral Disputes</li>
                                <li>• Student Disciplinary Cases</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
      </div>
    </div>
  );
};

const RoleCard = ({ title, desc, icon, color = "bg-white" }: { title: string, desc: string, icon: React.ReactNode, color?: string }) => (
    <div className={`p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all ${color === "bg-white" ? "bg-white" : color}`}>
        <div className={`mb-4 ${color === "bg-white" ? "text-nobel-gold" : "text-white"}`}>
            {icon}
        </div>
        <h3 className={`font-serif text-xl font-bold mb-3 ${color === "bg-white" ? "text-stone-900" : "text-white"}`}>{title}</h3>
        <p className={`text-sm leading-relaxed ${color === "bg-white" ? "text-stone-600" : "text-stone-300"}`}>{desc}</p>
    </div>
);
