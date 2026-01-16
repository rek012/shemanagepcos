export default function LifestyleManagement() {
  const tips = [
    {
      icon: "🥗",
      title: "Balanced Nutrition",
      description: "Focus on whole foods, lean proteins, healthy fats, and complex carbohydrates. Limit processed foods and added sugars."
    },
    {
      icon: "🏃‍♀️",
      title: "Regular Exercise",
      description: "Aim for at least 150 minutes of moderate activity per week. Combine cardio with strength training for best results."
    },
    {
      icon: "😴",
      title: "Quality Sleep",
      description: "Prioritize 7-9 hours of quality sleep per night. Good sleep helps regulate hormones and reduces stress."
    },
    {
      icon: "🧘‍♀️",
      title: "Stress Management",
      description: "Practice mindfulness, yoga, meditation, or other stress-reduction techniques to balance hormone levels."
    },
    {
      icon: "💊",
      title: "Medical Support",
      description: "Work with healthcare providers for medication if needed, including metformin, birth control, or other treatments."
    },
    {
      icon: "📊",
      title: "Track Progress",
      description: "Monitor symptoms, menstrual cycles, and lifestyle changes to identify what works best for you."
    }
  ];

  return (
    <section id="lifestyle" className="py-12 sm:py-16 md:py-20" style={{ backgroundColor: '#7F5561' }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4" style={{ color: '#FFE1E0' }}>
            Lifestyle Management
          </h2>
          <div className="w-20 sm:w-24 h-1 mx-auto mb-4 sm:mb-6" style={{ background: 'linear-gradient(to right, #F49BAB, #9B7EBD)' }}></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
            Small, consistent changes in daily habits can make a significant impact on managing PCOS symptoms.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="rounded-2xl p-8 transform hover:scale-105 transition-all hover:shadow-xl"
              style={{ background: 'linear-gradient(to bottom right, #FFE1E0, #F49BAB)', border: '1px solid #9B7EBD' }}
            >
              <div className="text-5xl mb-4 transform hover:scale-125 transition-transform">
                {tip.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#7F5561' }}>
                {tip.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
