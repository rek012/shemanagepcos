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
    <section id="lifestyle" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Lifestyle Management
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Small, consistent changes in daily habits can make a significant impact on managing PCOS symptoms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 transform hover:scale-105 transition-all hover:shadow-xl border border-pink-100 dark:border-pink-900/30"
            >
              <div className="text-5xl mb-4 transform hover:scale-125 transition-transform">
                {tip.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {tip.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
