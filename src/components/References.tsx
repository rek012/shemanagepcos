export default function References() {
  const references = [
    {
      authors: "Abo Shereda, H. M., Radwan, H. A., Afifi Alqersh, D. L., Hashem, S. R., El-Saiyed Konsouh, A. M., & Nada, H. E.",
      year: "2025",
      title: "Effect of bio-psychosocial nursing intervention on emotional status, body image, and quality of life of women with polycystic ovarian syndrome: A quasi-experimental study",
      journal: "BMC Nursing",
      volume: "24",
      article: "Article 887",
      type: "journal"
    },
    {
      title: "Polycystic ovary syndrome (PCOS) - Symptoms and causes",
      source: "Mayo Clinic",
      year: "2022",
      url: "https://www.mayoclinic.org/diseases-conditions/pcos/symptoms-causes/syc-20353439",
      type: "website"
    },
    {
      authors: "Deeks, A., et al.",
      year: "2013",
      title: "Assessing self-efficacy and self-help methods in women with and without PCOS",
      journal: "British Journal of Health Psychology",
      volume: "18(2)",
      pages: "450–462",
      type: "journal"
    },
    {
      authors: "Palomba, S., et al.",
      year: "2014",
      title: "Long-term complications of polycystic ovary syndrome (PCOS)",
      journal: "Human Reproduction Update",
      volume: "20(5)",
      pages: "743–760",
      type: "journal"
    },
    {
      authors: "Sánchez-Ferrer, M. L., et al.",
      year: "2024",
      title: "Depression, tension induction, and coping impairments in women with PCOS",
      journal: "Archives of Women's Mental Health",
      volume: "28",
      pages: "339–348",
      type: "journal"
    },
    {
      authors: "Teede, H. J., Misso, M. L., Costello, M. F., Dokras, A., Laven, J., Moran, L., Piltonen, T., & Norman, R. J.",
      year: "2018",
      title: "International evidence-based guideline for the assessment and management of polycystic ovary syndrome 2018",
      source: "Monash University",
      type: "guideline"
    },
    {
      authors: "Tehrani, F., et al.",
      year: "2020",
      title: "Relationship between coping strategies and quality of life in women with PCOS",
      journal: "Journal of Obstetrics and Gynaecology Research",
      type: "journal"
    },
    {
      title: "Polycystic ovary syndrome: Causes, symptoms, pathophysiology, and remedies",
      source: "ScienceDirect",
      year: "2023",
      month: "May",
      url: "https://www.sciencedirect.com/science/article/abs/pii/S2451847623000040",
      type: "website"
    }
  ];

  const formatReference = (ref: typeof references[0], index: number) => {
    if (ref.type === 'journal') {
      return (
        <div key={index} className="mb-4 pl-6 -indent-6">
          <span className="font-medium">{ref.authors}</span> ({ref.year}). {ref.title}. <em>{ref.journal}</em>
          {ref.volume && `, ${ref.volume}`}
          {ref.pages && `, ${ref.pages}`}
          {ref.article && `, ${ref.article}`}.
        </div>
      );
    } else if (ref.type === 'guideline') {
      return (
        <div key={index} className="mb-4 pl-6 -indent-6">
          <span className="font-medium">{ref.authors}</span> ({ref.year}). <em>{ref.title}</em>. {ref.source}.
        </div>
      );
    } else {
      return (
        <div key={index} className="mb-4 pl-6 -indent-6">
          {ref.title}. ({ref.year}{ref.month && `, ${ref.month}`}). {ref.source}.{' '}
          {ref.url && (
            <a 
              href={ref.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:opacity-80 transition-opacity inline-flex items-center gap-1"
            >
              {ref.url}
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      );
    }
  };

  return (
    <section id="references" className="py-12 sm:py-16 md:py-20" style={{ backgroundColor: '#7F5561', color: '#FFE1E0' }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            References
          </h2>
          <div className="w-20 sm:w-24 h-1 mx-auto mb-4 sm:mb-6 rounded-full" style={{ background: 'linear-gradient(to right, #F49BAB, #9B7EBD)' }}></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Evidence-based information from trusted medical and academic sources
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div 
            className="rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl"
            style={{ backgroundColor: '#9B7EBD', border: '1px solid #F49BAB' }}
          >
            <div className="text-sm sm:text-base leading-relaxed text-gray-100">
              {references.map((ref, index) => formatReference(ref, index))}
            </div>
          </div>
        </div>

        <div className="text-center pt-12 mt-12" style={{ borderTop: '1px solid #9B7EBD' }}>
          <p className="mb-4 font-medium" style={{ color: '#FFE1E0' }}>
            © {new Date().getFullYear()} SheManagePCOS. All rights reserved.
          </p>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto leading-relaxed">
            This website provides general information about PCOS and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </div>
      </div>
    </section>
  );
}