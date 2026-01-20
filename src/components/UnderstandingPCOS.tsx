'use client';

import { useState, useEffect, useRef } from 'react';

export default function UnderstandingPCOS() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    const panels = [
        {
            title: "Definition",
            icon: "📚",
            color: "#EC4899",
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
            color: "#A855F7",
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
            color: "#3B82F6",
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
            color: "#6366F1",
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

    // Scroll-based animation effect
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionHeight = rect.height;
            
            // Calculate scroll progress through the section (0 to 1)
            if (rect.top <= windowHeight && rect.bottom >= 0) {
                const scrolled = windowHeight - rect.top;
                const total = sectionHeight + windowHeight;
                const progress = Math.min(Math.max(scrolled / total, 0), 1);
                setScrollProgress(progress);
                
                // Auto-advance carousel based on scroll position
                const newIndex = Math.min(Math.floor(progress * panels.length * 1.5), panels.length - 1);
                setActiveIndex(newIndex);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [panels.length]);

    // Auto-rotate on mobile
    useEffect(() => {
        if (window.innerWidth >= 768) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % panels.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [panels.length]);

    return (
        <section 
            ref={sectionRef}
            id="understanding" 
            className="relative py-16 md:py-24 overflow-hidden" 
            style={{ backgroundColor: '#FFE1E0', minHeight: '150vh' }}
        >
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {panels.map((panel, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full blur-3xl opacity-20 transition-all duration-1000"
                        style={{
                            width: `${200 + i * 60}px`,
                            height: `${200 + i * 60}px`,
                            background: `radial-gradient(circle, ${panel.color}, transparent)`,
                            left: `${5 + i * 20}%`,
                            top: `${15 + (i % 2) * 35}%`,
                            transform: `translate(${scrollProgress * (30 + i * 15)}px, ${scrollProgress * (20 + i * 10)}px) scale(${1 + scrollProgress * 0.4})`,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Animated Header */}
                <div 
                    className="text-center mb-12 md:mb-20 transition-all duration-500"
                    style={{
                        opacity: Math.max(1 - scrollProgress * 1.2, 0),
                        transform: `translateY(${-scrollProgress * 80}px) scale(${1 - scrollProgress * 0.15})`
                    }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6" style={{ color: '#7F5561' }}>
                        Understanding PCOS
                    </h2>
                    <div 
                        className="h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mx-auto rounded-full transition-all duration-700"
                        style={{
                            width: `${80 + scrollProgress * 120}px`
                        }}
                    ></div>
                    <p className="mt-6 text-gray-600 text-sm md:text-lg max-w-2xl mx-auto">
                        Scroll down to explore the key aspects
                    </p>
                </div>

                {/* Desktop Carousel */}
                <div className="hidden md:block">
                    <div 
                        className="sticky top-24 transition-all duration-500"
                        style={{
                            transform: `perspective(1500px) rotateX(${Math.min(scrollProgress * 8, 4)}deg)`
                        }}
                    >
                        <div className="relative h-[550px] lg:h-[650px] max-w-6xl mx-auto">
                            {/* Cards Stack */}
                            {panels.map((panel, index) => {
                                const offset = index - activeIndex;
                                const absOffset = Math.abs(offset);
                                const isActive = index === activeIndex;
                                const isPast = index < activeIndex;
                                
                                return (
                                    <div
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                        className="absolute inset-0 transition-all duration-700 ease-out cursor-pointer"
                                        style={{
                                            transform: `
                                                translateX(${offset * 85}%)
                                                translateY(${absOffset * 20}px)
                                                scale(${1 - absOffset * 0.08})
                                                rotateY(${offset * -8}deg)
                                                rotateZ(${offset * 2}deg)
                                            `,
                                            opacity: absOffset > 1 ? 0 : 1 - absOffset * 0.35,
                                            zIndex: 100 - absOffset,
                                            filter: `blur(${absOffset * 1.5}px) brightness(${isActive ? 1 : 0.7})`,
                                            pointerEvents: absOffset <= 1 ? 'auto' : 'none',
                                        }}
                                    >
                                        {/* Card Container */}
                                        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                                            {/* Gradient Background */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${panel.gradient}`}>
                                                {/* Animated Grid Pattern */}
                                                <div 
                                                    className="absolute inset-0 opacity-20"
                                                    style={{
                                                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.12) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.12) 2px, transparent 2px)',
                                                        backgroundSize: '40px 40px',
                                                        animation: isActive ? 'gridMove 20s linear infinite' : 'none'
                                                    }}
                                                />
                                                
                                                {/* Floating Dots Pattern */}
                                                <div 
                                                    className="absolute inset-0 opacity-15"
                                                    style={{
                                                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)',
                                                        backgroundSize: '30px 30px',
                                                        animation: isActive ? 'float 8s ease-in-out infinite' : 'none'
                                                    }}
                                                />
                                                
                                                {/* Dark Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                                
                                                {/* Shimmer Effect */}
                                                {isActive && (
                                                    <div 
                                                        className="absolute inset-0 opacity-30"
                                                        style={{
                                                            background: 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)',
                                                            backgroundSize: '200% 100%',
                                                            animation: 'shimmer 4s infinite'
                                                        }}
                                                    />
                                                )}
                                            </div>

                                            {/* Icon Badge */}
                                            <div 
                                                className="absolute top-8 left-8 w-20 h-20 rounded-2xl backdrop-blur-md flex items-center justify-center text-4xl shadow-xl transition-all duration-700 border border-white/30"
                                                style={{
                                                    background: 'rgba(255,255,255,0.2)',
                                                    transform: isActive ? 'rotate(0deg) scale(1)' : 'rotate(-15deg) scale(0.85)',
                                                }}
                                            >
                                                {panel.icon}
                                            </div>

                                            {/* Step Counter */}
                                            <div 
                                                className="absolute top-8 right-8 w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center font-bold text-white shadow-lg border border-white/30"
                                                style={{
                                                    background: 'rgba(0,0,0,0.3)',
                                                }}
                                            >
                                                {index + 1}
                                            </div>

                                            {/* Content Container */}
                                            <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end">
                                                <div 
                                                    className="backdrop-blur-xl bg-black/40 p-8 md:p-10 rounded-2xl border border-white/20 transition-all duration-700"
                                                    style={{
                                                        transform: isActive ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                                                        opacity: isActive ? 1 : 0.6
                                                    }}
                                                >
                                                    <div className="text-white">
                                                        {panel.content}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bottom Accent Line */}
                                            <div className="absolute bottom-0 left-0 w-full h-2 bg-white/20">
                                                <div 
                                                    className="h-full transition-all duration-1000 ease-out"
                                                    style={{
                                                        width: isActive ? '100%' : '0%',
                                                        background: panel.color,
                                                        boxShadow: isActive ? `0 0 20px ${panel.color}` : 'none'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex justify-center items-center gap-6 mt-12">
                            {/* Prev Button */}
                            <button
                                onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
                                disabled={activeIndex === 0}
                                className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm shadow-xl flex items-center justify-center transition-all hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-2xl"
                            >
                                <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {/* Dot Indicators */}
                            <div className="flex gap-3">
                                {panels.map((panel, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                        className="relative group"
                                    >
                                        <div 
                                            className={`w-4 h-4 rounded-full transition-all duration-500 ${
                                                activeIndex === index ? 'scale-125' : 'scale-100 hover:scale-110'
                                            }`}
                                            style={{
                                                background: activeIndex === index ? panel.color : '#D1D5DB',
                                                boxShadow: activeIndex === index ? `0 0 15px ${panel.color}` : 'none'
                                            }}
                                        />
                                        {activeIndex === index && (
                                            <div 
                                                className="absolute inset-0 rounded-full animate-ping"
                                                style={{ background: panel.color, opacity: 0.5 }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={() => setActiveIndex(Math.min(panels.length - 1, activeIndex + 1))}
                                disabled={activeIndex === panels.length - 1}
                                className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm shadow-xl flex items-center justify-center transition-all hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-2xl"
                            >
                                <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Version */}
                <div className="md:hidden space-y-5">
                    {panels.map((panel, index) => {
                        const isActive = activeIndex === index;
                        
                        return (
                            <div
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className="relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 cursor-pointer"
                                style={{
                                    transform: isActive ? 'scale(1.02)' : 'scale(0.96)',
                                    opacity: isActive ? 1 : 0.65
                                }}
                            >
                                <div className={`bg-gradient-to-br ${panel.gradient} p-6`}>
                                    {/* Pattern Overlay */}
                                    <div 
                                        className="absolute inset-0 opacity-10"
                                        style={{
                                            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1.5px, transparent 1.5px)',
                                            backgroundSize: '20px 20px'
                                        }}
                                    />
                                    
                                    {/* Header */}
                                    <div className="relative z-10 flex items-center justify-between mb-5">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl">{panel.icon}</span>
                                            <span className="text-white font-bold text-base">{panel.title}</span>
                                        </div>
                                        <div 
                                            className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg"
                                            style={{ background: panel.color }}
                                        >
                                            {index + 1}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 bg-black/50 backdrop-blur-md p-5 rounded-xl text-white border border-white/20">
                                        {panel.content}
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="relative z-10 mt-5 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full transition-all duration-700"
                                            style={{
                                                width: isActive ? '100%' : '0%',
                                                background: 'white',
                                                boxShadow: '0 0 10px rgba(255,255,255,0.8)'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Mobile Navigation Dots */}
                    <div className="flex justify-center gap-2.5 pt-6">
                        {panels.map((panel, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className="transition-all duration-300"
                                style={{
                                    width: activeIndex === index ? '32px' : '10px',
                                    height: '10px',
                                    borderRadius: '5px',
                                    background: activeIndex === index ? panel.color : '#D1D5DB',
                                }}
                            />
                        ))}
                    </div>
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
                
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                
                @keyframes gridMove {
                    0% { background-position: 0 0; }
                    100% { background-position: 40px 40px; }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease forwards;
                    opacity: 0;
                }
            `}</style>
        </section>
    );
}