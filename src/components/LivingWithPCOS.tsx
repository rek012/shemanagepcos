export default function LivingWithPCOS() {
  return (
    <section id="living" className="py-12 sm:py-16 md:py-20" style={{ background: 'linear-gradient(to bottom right, #9B7EBD, #F49BAB, #FFE1E0)' }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4" style={{ color: '#7F5561' }}>
            Living with PCOS
          </h2>
          <div className="w-20 sm:w-24 h-1 mx-auto" style={{ background: 'linear-gradient(to right, #F49BAB, #9B7EBD)' }}></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <div className="space-y-4 sm:space-y-6">
            <div className="rounded-lg sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1" style={{ backgroundColor: '#FFE1E0' }}>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{ color: '#F49BAB' }}>💪 Building Resilience</h3>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#7F5561' }}>
                Living with PCOS is a journey. Focus on progress, not perfection. Celebrate small victories and be patient with yourself as you learn what works for your body.
              </p>
            </div>

            <div className="rounded-lg sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1" style={{ backgroundColor: '#FFE1E0' }}>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{ color: '#9B7EBD' }}>👥 Community Support</h3>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#7F5561' }}>
                Connect with others who understand your experience. Support groups, online communities, and counseling can provide valuable emotional support and practical advice.
              </p>
            </div>

            <div className="rounded-lg sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1" style={{ backgroundColor: '#FFE1E0' }}>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{ color: '#7F5561' }}>🎯 Setting Goals</h3>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#7F5561' }}>
                Set realistic, achievable goals for managing your symptoms. Work with healthcare providers to create a personalized treatment plan that fits your lifestyle.
              </p>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="rounded-lg sm:rounded-2xl p-4 sm:p-6 shadow-xl transform hover:scale-105 transition-all" style={{ background: 'linear-gradient(to bottom right, #F49BAB, #9B7EBD)', color: '#FFE1E0' }}>
              <h3 className="text-2xl font-bold mb-6">Key Takeaways</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-2xl mr-3">✓</span>
                  <span>PCOS is manageable with the right approach</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">✓</span>
                  <span>Every woman's experience is unique</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">✓</span>
                  <span>Lifestyle changes can significantly improve symptoms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">✓</span>
                  <span>Regular medical care is essential</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">✓</span>
                  <span>You are not alone in this journey</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl p-8 shadow-lg" style={{ backgroundColor: '#FFE1E0' }}>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#7F5561' }}>
                Remember
              </h3>
              <p className="text-gray-700 leading-relaxed italic">
                "PCOS doesn't define you. With knowledge, support, and proper management, you can live a full, healthy, and empowered life."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
