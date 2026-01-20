'use client';

import { useState, useEffect } from 'react';

export default function UnderstandingPCOS() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const panels = [
        {
            title: "Definition",
            subtitle: "What is PCOS?",
            icon: "📚",
            color: "#EC4899",
            description: "Polycystic ovary syndrome (PCOS) is a serious hormonal disorder affecting women of reproductive age. The symptoms may change over time, but they typically begin in adolescence.",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop"
        },
        {
            title: "Causes & Risk Factors",
            subtitle: "Understanding the Origins",
            icon: "🧬",
            color: "#A855F7",
            description: "Key factors include genetic predisposition, environmental influences, unhealthy eating habits, sedentary lifestyle, chronic inflammation, and hormonal imbalances that contribute to insulin resistance.",
            image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1200&h=800&fit=crop"
        },
        {
            title: "Common Symptoms",
            subtitle: "Recognizing PCOS",
            icon: "⚠️",
            color: "#3B82F6",
            description: "PCOS manifests through irregular periods, weight changes, hormonal effects like acne and excess hair growth, metabolic risks including diabetes and heart disease, plus mental health challenges.",
            image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&h=800&fit=crop"
        },
        {
            title: "Diagnosis",
            subtitle: "Getting Confirmed",
            icon: "🔬",
            color: "#6366F1",
            description: "PCOS diagnosis requires at least two of three criteria: high androgen levels (via blood test or physical signs), irregular or absent menstrual cycles, and polycystic ovaries on ultrasound scan.",
            image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=1200&h=800&fit=crop"
        }
    ];

    // Auto-play carousel
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % panels.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, panels.length]);

   const goToSlide = (index: number) => {
        setActiveIndex(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % panels.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + panels.length) % panels.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    return (
        <section id="understanding" className="py-12 md:py-20 lg:py-28" style={{ backgroundColor: '#FFE1E0' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8 md:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4" style={{ color: '#7F5561' }}>
                        Understanding PCOS
                    </h2>
                    <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-pink-500 to-indigo-500 mx-auto rounded-full"></div>
                </div>

                {/* Main Carousel Container */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Carousel Wrapper */}
                    <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-white">
                        {/* Slides */}
                        <div className="relative" style={{ paddingBottom: '56.25%' }}> {/* 16:9 aspect ratio */}
                            {panels.map((panel, index) => {
                                const isActive = index === activeIndex;
                                const isPrev = index === (activeIndex - 1 + panels.length) % panels.length;
                                const isNext = index === (activeIndex + 1) % panels.length;

                                return (
                                    <div
                                        key={index}
                                        className="absolute inset-0 transition-all duration-700 ease-in-out"
                                        style={{
                                            opacity: isActive ? 1 : 0,
                                            transform: isActive ? 'translateX(0) scale(1)' : 
                                                      isPrev ? 'translateX(-100%) scale(0.95)' :
                                                      isNext ? 'translateX(100%) scale(0.95)' : 
                                                      'translateX(0) scale(0.95)',
                                            pointerEvents: isActive ? 'auto' : 'none',
                                            zIndex: isActive ? 10 : 1
                                        }}
                                    >
                                        {/* Background Image */}
                                        <div className="absolute inset-0">
                                            <img
                                                src={panel.image}
                                                alt={panel.title}
                                                className="w-full h-full object-cover"
                                                style={{ filter: 'brightness(0.7)' }}
                                            />
                                            {/* Gradient Overlay */}
                                            <div 
                                                className="absolute inset-0"
                                                style={{
                                                    background: `linear-gradient(135deg, ${panel.color}40 0%, rgba(0,0,0,0.6) 100%)`
                                                }}
                                            />
                                        </div>

                                        {/* Content Overlay */}
                                        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12 lg:p-16">
                                            {/* Icon Badge */}
                                            <div 
                                                className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full mb-4 md:mb-6 backdrop-blur-md border border-white/30 transition-transform duration-700"
                                                style={{
                                                    background: 'rgba(255,255,255,0.15)',
                                                    transform: isActive ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-20deg)',
                                                    transitionDelay: isActive ? '200ms' : '0ms'
                                                }}
                                            >
                                                <span className="text-2xl sm:text-3xl md:text-4xl">{panel.icon}</span>
                                            </div>

                                            {/* Text Content */}
                                            <div 
                                                className="text-white transition-all duration-700"
                                                style={{
                                                    transform: isActive ? 'translateY(0)' : 'translateY(30px)',
                                                    opacity: isActive ? 1 : 0,
                                                    transitionDelay: isActive ? '300ms' : '0ms'
                                                }}
                                            >
                                                {/* Subtitle */}
                                                <p className="text-xs sm:text-sm md:text-base font-medium mb-2 opacity-90 tracking-wide uppercase">
                                                    {panel.subtitle}
                                                </p>

                                                {/* Title */}
                                                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                                                    {panel.title}
                                                </h3>

                                                {/* Accent Line */}
                                                <div 
                                                    className="w-16 sm:w-20 md:w-24 h-1 rounded-full mb-4 md:mb-6 transition-all duration-700"
                                                    style={{
                                                        background: panel.color,
                                                        width: isActive ? '80px' : '0px',
                                                        transitionDelay: isActive ? '400ms' : '0ms'
                                                    }}
                                                />

                                                {/* Description */}
                                                <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl opacity-95">
                                                    {panel.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                                            <div 
                                                className="h-full transition-all duration-700"
                                                style={{
                                                    width: isActive ? '100%' : '0%',
                                                    background: panel.color,
                                                    boxShadow: `0 0 10px ${panel.color}`
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 z-20"
                            aria-label="Previous slide"
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 z-20"
                            aria-label="Next slide"
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Dot Navigation */}
                    <div className="flex justify-center items-center gap-2 sm:gap-3 mt-6 md:mt-8">
                        {panels.map((panel, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className="group relative"
                                aria-label={`Go to slide ${index + 1}`}
                            >
                                {/* Dot */}
                                <div
                                    className="transition-all duration-300"
                                    style={{
                                        width: activeIndex === index ? '40px' : '10px',
                                        height: '10px',
                                        borderRadius: '5px',
                                        background: activeIndex === index ? panel.color : '#D1D5DB',
                                        boxShadow: activeIndex === index ? `0 0 10px ${panel.color}` : 'none'
                                    }}
                                />

                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    {panel.title}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Slide Counter */}
                    <div className="text-center mt-4 md:mt-6">
                        <span className="text-sm md:text-base font-medium" style={{ color: '#7F5561' }}>
                            {activeIndex + 1} / {panels.length}
                        </span>
                    </div>
                </div>

                {/* Auto-play Indicator */}
                <div className="flex justify-center items-center gap-2 mt-6 md:mt-8">
                    <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
                        style={{ color: '#7F5561' }}
                    >
                        {isAutoPlaying ? (
                            <>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                                </svg>
                                <span className="text-sm font-medium hidden sm:inline">Pause</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                                <span className="text-sm font-medium hidden sm:inline">Play</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}