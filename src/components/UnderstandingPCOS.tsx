'use client';

import { useState } from 'react';

export default function UnderstandingPCOS() {
    const [activeIndex, setActiveIndex] = useState(0);

    const panels = [
        {
            title: "Definition",
            icon: "📚",
            color: "bg-pink-500",
            gradient: "from-pink-500 to-rose-500",
            content: (
                <div className="space-y-2 md:space-y-4">
                    <div className="bg-white/20 backdrop-blur-sm px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs inline-block mb-1 md:mb-3">
                        What is PCOS?
                    </div>
                    <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-3">Polycystic Ovary Syndrome</h2>
                    <p className="text-xs md:text-base leading-relaxed opacity-95">
                        Polycystic ovary syndrome (PCOS) is a serious hormonal disorder affecting women of
                        reproductive age. The symptoms may change over time, but they typically begin in
                        adolescence.
                    </p>
                </div>
            )
        },
        {
            title: "Causes & Risk Factors",
            icon: "🧬",
            color: "bg-purple-500",
            gradient: "from-purple-500 to-indigo-500",
            content: (
                <div className="space-y-2 md:space-y-3">
                    <div className="bg-white/20 backdrop-blur-sm px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs inline-block mb-1 md:mb-2">
                        Risk Factors
                    </div>
                    <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-3">Causes & Risk Factors</h2>
                    <div className="space-y-1.5 md:space-y-2 text-[11px] md:text-sm">
                        <div className="flex items-start animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                            <span className="mr-1.5 md:mr-2">•</span>
                            <span>Genetic predisposition and family history</span>
                        </div>
                        <div className="flex items-start animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                            <span className="mr-1.5 md:mr-2">•</span>
                            <span>Environmental factors and endocrine disruptors</span>
                        </div>
                        <div className="flex items-start animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                            <span className="mr-1.5 md:mr-2">•</span>
                            <span>Unhealthy eating habits and poor dietary patterns</span>
                        </div>
                        <div className="flex items-start animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                            <span className="mr-1.5 md:mr-2">•</span>
                            <span>Sedentary lifestyle and physical inactivity</span>
                        </div>
                        <div className="flex items-start animate-fadeIn" style={{ animationDelay: '0.6s' }}>
                            <span className="mr-1.5 md:mr-2">•</span>
                            <span>Chronic low-grade inflammation</span>
                        </div>
                        <div className="flex items-start animate-fadeIn" style={{ animationDelay: '0.7s' }}>
                            <span className="mr-1.5 md:mr-2">•</span>
                            <span>Altered steroidogenesis and androgen production</span>
                        </div>
                        <div className="flex items-start animate-fadeIn" style={{ animationDelay: '0.8s' }}>
                            <span className="mr-1.5 md:mr-2">•</span>
                            <span>Obesity worsening insulin resistance</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Common Symptoms",
            icon: "⚠️",
            color: "bg-blue-500",
            gradient: "from-blue-500 to-cyan-500",
            content: (
                <div className="space-y-2 md:space-y-3">
                    <div className="bg-white/20 backdrop-blur-sm px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs inline-block mb-1 md:mb-2">
                        Physical & Mental
                    </div>
                    <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-3">Recognizing PCOS</h2>
                    <p className="text-[11px] md:text-sm leading-relaxed opacity-95 mb-2 md:mb-3">
                        PCOS affects both physical and mental health:
                    </p>
                    <div className="space-y-1.5 md:space-y-2 text-[11px] md:text-sm">
                        <div className="flex items-start animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                            <span className="mr-1.5 md:mr-2">•</span>
                            <span><strong>Physical:</strong> Irregular periods, heavy periods, infertility, weight gain</span>
                        </div>
                        <div className="flex items-start animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                            <span className="mr-1.5 md:mr-2">•</span>
                            <span><strong>Hormonal:</strong> Acne, excess hair growth, hair loss</span>
                        </div>
                        <div className="flex items-start animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                            <span className="mr-1.5 md:mr-2">•</span>
                            <span><strong>Metabolic:</strong> Diabetes risk, heart disease, insulin resistance</span>
                        </div>
                        <div className="flex items-start animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                            <span className="mr-1.5 md:mr-2">•</span>
                            <span><strong>Mental:</strong> Anxiety, depression, body image issues</span>
                        </div>
                        <div className="flex items-start animate-fadeIn" style={{ animationDelay: '0.6s' }}>
                            <span className="mr-1.5 md:mr-2">•</span>
                            <span><strong>Social:</strong> Impact on relationships and work life</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Diagnosis",
            icon: "🔬",
            color: "bg-indigo-500",
            gradient: "from-indigo-500 to-purple-600",
            content: (
                <div className="space-y-2 md:space-y-3">
                    <div className="bg-white/20 backdrop-blur-sm px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs inline-block mb-1 md:mb-2">
                        2 of 3 Criteria
                    </div>
                    <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-3">Getting Diagnosed</h2>
                    <p className="text-[11px] md:text-sm leading-relaxed opacity-95 mb-2 md:mb-3">
                        PCOS is confirmed with at least two of the following:
                    </p>
                    <div className="space-y-1.5 md:space-y-2 text-[11px] md:text-sm">
                        <div className="flex items-start animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                            <span className="mr-1.5 md:mr-2">✓</span>
                            <span>High androgen levels (blood test or physical signs)</span>
                        </div>
                        <div className="flex items-start animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                            <span className="mr-1.5 md:mr-2">✓</span>
                            <span>Irregular or absent menstrual cycles</span>
                        </div>
                        <div className="flex items-start animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                            <span className="mr-1.5 md:mr-2">✓</span>
                            <span>Polycystic ovaries on ultrasound scan</span>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <section id="understanding" className="py-10 md:py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 md:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                        Understanding PCOS
                    </h2>
                    <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto"></div>
                </div>

                {/* Horizontal Accordion - Desktop */}
                <div className="hidden md:block">
                    <div className="relative w-full max-w-5xl mx-auto h-[450px] lg:h-[600px] flex rounded-2xl overflow-hidden shadow-2xl">
                        {panels.map((panel, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`relative h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer overflow-hidden border-r border-white/10 last:border-r-0 ${activeIndex === index
                                    ? 'flex-[10] cursor-default z-10'
                                    : 'flex-1'
                                    }`}
                                style={{
                                    boxShadow: activeIndex === index ? '0 0 25px rgba(0, 0, 0, 0.15)' : 'none'
                                }}
                            >
                                {/* Background Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${panel.gradient} transition-transform duration-700 ${activeIndex === index ? 'scale-105' : 'scale-100'
                                    }`}
                                    style={{
                                        filter: activeIndex === index ? 'brightness(0.9)' : 'brightness(0.8)'
                                    }}
                                />

                                {/* Pattern Overlay */}
                                <div className="absolute inset-0 opacity-10"
                                    style={{
                                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                                        backgroundSize: '20px 20px'
                                    }}
                                />

                                {/* Vertical Title (shown when collapsed) */}
                                <span
                                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-white font-semibold text-sm uppercase whitespace-nowrap transition-opacity duration-300 ${activeIndex === index ? 'opacity-0' : 'opacity-100'
                                        }`}
                                    style={{
                                        writingMode: 'vertical-rl',
                                        textOrientation: 'mixed',
                                        transform: 'translate(-50%, -50%) rotate(180deg)',
                                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
                                    }}
                                >
                                    {panel.title}
                                </span>

                                {/* Content (shown when expanded) */}
                                <div
                                    className={`absolute inset-0 z-20 p-6 md:p-8 text-white transition-all duration-500 overflow-y-auto flex items-end ${activeIndex === index
                                        ? 'opacity-100'
                                        : 'opacity-0 pointer-events-none'
                                        }`}
                                >
                                    <div className="w-full p-6 rounded-lg" style={{
                                        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 60%, rgba(0, 0, 0, 0.7))'
                                    }}>
                                        {panel.content}
                                    </div>
                                </div>

                                {/* Accent Color Bar */}
                                <div
                                    className={`absolute bottom-0 left-0 w-full ${panel.color} z-30 transition-all duration-500 ${activeIndex === index ? 'h-2' : 'h-1'
                                        }`}
                                />
                            </div>
                        ))}

                        {/* Dot Indicators */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-40">
                            {panels.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveIndex(index);
                                    }}
                                    className={`transition-all duration-300 rounded-full ${activeIndex === index
                                        ? 'w-5 h-2 bg-white'
                                        : 'w-2 h-2 bg-white/50 hover:bg-white/75'
                                        }`}
                                    aria-label={`Go to ${panels[index].title}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Vertical Accordion - Mobile */}
                <div className="md:hidden space-y-3">
                    {panels.map((panel, index) => (
                        <div
                            key={index}
                            className="rounded-xl overflow-hidden shadow-lg"
                        >
                            {/* Accordion Header */}
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                                className={`w-full text-left transition-all duration-300 ${
                                    activeIndex === index ? 'pb-0' : 'pb-4'
                                }`}
                            >
                                <div className={`relative bg-gradient-to-br ${panel.gradient} p-4 flex items-center justify-between`}>
                                    {/* Pattern Overlay */}
                                    <div className="absolute inset-0 opacity-10"
                                        style={{
                                            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                                            backgroundSize: '15px 15px'
                                        }}
                                    />
                                    
                                    <div className="flex items-center gap-3 z-10">
                                        <span className="text-2xl">{panel.icon}</span>
                                        <span className="text-white font-semibold text-sm">{panel.title}</span>
                                    </div>
                                    
                                    <svg
                                        className={`w-5 h-5 text-white transition-transform duration-300 z-10 ${
                                            activeIndex === index ? 'rotate-180' : ''
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>

                            {/* Accordion Content */}
                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                    activeIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className={`bg-gradient-to-br ${panel.gradient} p-4 text-white`}>
                                    {/* Dark overlay for better readability */}
                                    <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg">
                                        {panel.content}
                                    </div>
                                </div>
                            </div>

                            {/* Accent Color Bar */}
                            <div className={`w-full ${panel.color} h-1`} />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease forwards;
                    opacity: 0;
                }
            `}</style>
        </section>
    );
}