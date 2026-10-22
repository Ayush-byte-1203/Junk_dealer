import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Mail, Linkedin, Award } from 'lucide-react';
import { mentors, teammates } from '../data/teamData';

const Team = () => {

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />




            <div className="min-h-screen bg-white font-sans antialiased">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-5xl font-bold mb-4 leading-tight">Our Team</h1>
                        <p className="text-xl text-green-50 leading-relaxed">Meet the people behind this project</p>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 py-16">
                    {/* Mentors Section */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3 leading-tight">
                            <Award className="text-green-700 flex-shrink-0" size={32} />
                            <span>Project Mentors</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {mentors.map((mentor, index) => (
                                <div key={index} className="bg-white border-2 border-green-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                        <img
                                            src={mentor.image}
                                            alt={mentor.name}
                                            className="w-32 h-32 rounded-full object-cover object-top border-4 border-green-500 bg-white p-1 flex-shrink-0"
                                        />
                                        <div className="flex-1 text-center md:text-left">
                                            <h3 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">{mentor.name}</h3>
                                            <p className="text-green-700 font-semibold mb-4 text-base leading-normal">{mentor.role}</p>
                                            <div className="flex flex-col gap-2 justify-center md:justify-start">
                                                <a href={`mailto:${mentor.email}`} className="flex items-center gap-2 text-gray-600 hover:text-green-700 transition-colors duration-200 no-underline">
                                                    <Mail size={18} className="flex-shrink-0" />
                                                    <span className="text-sm leading-none">{mentor.email}</span>
                                                </a>
                                                <a href={`https://${mentor.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-green-700 transition-colors duration-200 no-underline">
                                                    <Linkedin size={18} className="flex-shrink-0" />
                                                    <span className="text-sm leading-none">LinkedIn</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Team Members Section */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 leading-tight">Team Members</h2>

                        {/* All Members - 2x2 Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {teammates.map((member, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-24 h-24 rounded-full object-cover object-center border-2 border-gray-300 mb-4 flex-shrink-0"
                                        />
                                        <h3 className="text-xl font-bold text-gray-800 mb-1 leading-tight">{member.name}</h3>
                                        <p className="text-gray-600 mb-4 text-base leading-normal">{member.role}</p>
                                        <div className="flex flex-col gap-2 w-full">
                                            <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-gray-500 hover:text-green-700 transition-colors duration-200 text-sm justify-center leading-none no-underline">
                                                <Mail size={16} className="flex-shrink-0" />
                                                <span>Email</span>
                                            </a>
                                            <a href={`https://${member.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-green-700 transition-colors duration-200 text-sm justify-center leading-none no-underline">
                                                <Linkedin size={16} className="flex-shrink-0" />
                                                <span>LinkedIn</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Team;
