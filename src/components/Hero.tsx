export default function Hero() {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #F49BAB, #9B7EBD, #FFE1E0)' }}>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center animate-fade-in">
          {/* Left Column - Content */}
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: '#7F5561' }}>
              SheManagedPCOS: Empowerment Starts Here
            </h1>
            
            <div>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4" style={{ color: '#F49BAB' }}>
                Be Bold. Be Balanced. Be You.
              </p>
            </div>

            <div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed" style={{ color: '#7F5561' }}>
                SheManagedPCOS is a web-based platform designed to guide students of the{' '}
                <span className="font-semibold" style={{ color: '#9B7EBD' }}>
                  University of Rizal System – Taytay
                </span>{' '}
                in understanding and managing Polycystic Ovary Syndrome (PCOS) through accessible information and practical tools. 
                From learning about its causes, symptoms, and health implications to exploring lifestyle strategies in nutrition, exercise, 
                stress, and sleep, this website empowers every user to take control of their health.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
              <a
                href="#understanding"
                className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-full font-semibold transform hover:scale-105 transition-all shadow-lg hover:shadow-xl text-center"
                style={{ background: 'linear-gradient(to right, #F49BAB, #9B7EBD)', color: '#FFE1E0' }}
              >
                Learn More
              </a>
              <a
                href="#lifestyle"
                className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-full font-semibold transform hover:scale-105 transition-all text-center"
                style={{ borderColor: '#F49BAB', color: '#7F5561' }}
              >
                Lifestyle Tips
              </a>
            </div>
          </div>

          {/* Right Column - Image Placeholder */}
          <div className="relative mt-6 sm:mt-0">
            <div className="aspect-square w-full max-w-lg mx-auto lg:max-w-none rounded-2xl sm:rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #F49BAB, #9B7EBD, #FFE1E0)' }}>
              {/* Placeholder content - replace with actual image */}
              <div className="text-center p-8">
                <svg className="w-32 h-32 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#9B7EBD' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="font-semibold" style={{ color: '#9B7EBD' }}>Image Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
