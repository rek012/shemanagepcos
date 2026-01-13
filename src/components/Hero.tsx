export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              SheManagesPCOS: Empowerment Starts Here
            </h1>
            
            <div>
              <p className="text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-400 mb-6">
                StrongHer: Be Bold. Be Balanced. Be You.
              </p>
            </div>

            <div>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                SheManagesPCOS is a web-based platform designed to guide students of the{' '}
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  University of Rizal System – Taytay
                </span>{' '}
                in understanding and managing Polycystic Ovary Syndrome (PCOS) through accessible information and practical tools. 
                From learning about its causes, symptoms, and health implications to exploring lifestyle strategies in nutrition, exercise, 
                stress, and sleep, this website empowers every user to take control of their health.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <a
                href="#understanding"
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl text-center"
              >
                Learn More
              </a>
              <a
                href="#lifestyle"
                className="px-8 py-4 border-2 border-pink-500 text-pink-600 dark:text-pink-400 rounded-full font-semibold hover:bg-pink-50 dark:hover:bg-pink-900/20 transform hover:scale-105 transition-all text-center"
              >
                Lifestyle Tips
              </a>
            </div>
          </div>

          {/* Right Column - Image Placeholder */}
          <div className="relative">
            <div className="aspect-square w-full max-w-lg mx-auto lg:max-w-none rounded-3xl bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-blue-900/30 shadow-2xl flex items-center justify-center overflow-hidden">
              {/* Placeholder content - replace with actual image */}
              <div className="text-center p-8">
                <svg className="w-32 h-32 mx-auto mb-4 text-purple-400 dark:text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-purple-600 dark:text-purple-400 font-semibold">Image Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
