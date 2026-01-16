export default function References() {
  const references = [
    {
      title: "Polycystic Ovary Syndrome",
      source: "Mayo Clinic",
      url: "https://www.mayoclinic.org/diseases-conditions/pcos",
      year: "2024"
    },
    {
      title: "PCOS: Definition, Phenotypes, Diagnosis",
      source: "American College of Obstetricians and Gynecologists",
      url: "https://www.acog.org",
      year: "2024"
    },
    {
      title: "Polycystic Ovary Syndrome (PCOS)",
      source: "National Institutes of Health",
      url: "https://www.nichd.nih.gov/health/topics/pcos",
      year: "2024"
    },
    {
      title: "PCOS Awareness Association",
      source: "PCOSAA",
      url: "https://www.pcosaa.org",
      year: "2024"
    }
  ];

  return (
    <section id="references" className="py-12 sm:py-16 md:py-20" style={{ backgroundColor: '#7F5561', color: '#FFE1E0' }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            References
          </h2>
          <div className="w-20 sm:w-24 h-1 mx-auto mb-4 sm:mb-6" style={{ background: 'linear-gradient(to right, #F49BAB, #9B7EBD)' }}></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Evidence-based information from trusted medical sources
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12">
          {references.map((ref, index) => (
            <a
              key={index}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl p-6 transition-all transform hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: '#9B7EBD', border: '1px solid #F49BAB' }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#FFE1E0' }}>
                    {ref.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-1">{ref.source}</p>
                  <p className="text-gray-500 text-xs">{ref.year}</p>
                </div>
                <svg className="w-5 h-5 text-pink-500 flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center pt-12" style={{ borderTop: '1px solid #9B7EBD' }}>
          <p className="mb-4" style={{ color: '#FFE1E0' }}>
            © {new Date().getFullYear()} SheManagePCOS. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            This website provides general information about PCOS and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified health provider.
          </p>
        </div>
      </div>
    </section>
  );
}
