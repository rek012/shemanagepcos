"use client";

import { useEffect, useState } from "react";

export function CarouselCustomNavigation() {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
      title: "Reproductive Issues",
      caption: (
        <>
          Women with PCOS often experience irregular ovulation, which may lead to difficulty<br />
          getting pregnant. They also have higher risks of complications during pregnancy, such as<br />
          gestational diabetes and high blood pressure.
        </>
      ),
    },
    {
      image:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
      title: "Metabolic Problems",
      caption: (
        <>
          PCOS is strongly linked to insulin resistance, weight gain, and an increased risk of Type<br />
          2 Diabetes. It also raises the chances of having high cholesterol and heart disease later in life.
        </>
      ),
    },
    {
      image:
        "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
      title: "Psychological Concerns",
      caption: (
        <>
          Anxiety, depression, and low self-esteem are common due to physical symptoms like<br />
          weight changes, acne, and infertility. Many students with PCOS struggle silently because they<br />
          lack proper guidance.
        </>
      ),
    },
    {
      image:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1600&q=80",
      title: "Cancer and Other Risks",
      caption: (
        <>
          Women with PCOS have a higher risk of endometrial cancer due to irregular menstrual<br />
          cycles. Fatty liver disease and sleep apnea can also occur, especially in those who are<br />
          overweight.
        </>
      ),
    },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full rounded-xl overflow-hidden">
      <div className="relative w-full h-[20rem] sm:h-[24rem] md:h-[28rem] lg:h-[36rem]">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-transform duration-700 ${
              i === active ? "translate-x-0 z-20" : i < active ? "-translate-x-full z-10" : "translate-x-full z-10"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover block"
              onError={(e) => (e.currentTarget.src = "https://placehold.co/1200x800?text=Image")}
            />

            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 p-6 md:p-12 bg-gradient-to-t from-black/70 to-transparent text-white max-w-xl rounded-tr-2xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{slide.title}</h3>
              <div className="text-sm md:text-base leading-relaxed">{slide.caption}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        aria-label="Previous"
        onClick={() => setActive((a) => (a === 0 ? slides.length - 1 : a - 1))}
        className="absolute left-4 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full p-2 sm:p-3 shadow text-lg sm:text-xl"
      >
        &#8592;
      </button>
      <button
        aria-label="Next"
        onClick={() => setActive((a) => (a + 1) % slides.length)}
        className="absolute right-4 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full p-2 sm:p-3 shadow text-lg sm:text-xl"
      >
        &#8594;
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-pink-500" : "w-4 bg-pink-200"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HealthImplications() {
  return (
    <section id="health-implications" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Intro Section (exact text, do not paraphrase) */}
        <div className="text-center mb-8 sm:mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-3 sm:mb-4 tracking-tight">
            Health Implications and Complications
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto mb-4 sm:mb-6 md:mb-8 rounded-full"></div>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-4 sm:mb-6">
            Polycystic Ovary Syndrome (PCOS) is a common hormonal disorder that affects about<br className="hidden sm:block" />
            one in five women. It causes problems with reproduction, metabolism, and emotional well-being,<br className="hidden sm:block" />
            making it a long-term health concern. Because many students lack access to consistent health<br className="hidden sm:block" />
            education and support, a web-based intervention can help them manage symptoms and<br className="hidden sm:block" />
            understand their condition better.
          </div>
        </div>

        {/* Material Tailwind Carousel Integration */}
        <div className="flex flex-col items-center mb-8 sm:mb-12 md:mb-16">
          <div className="w-full max-w-5xl">
            <CarouselCustomNavigation />
          </div>
        </div>
      </div>
    </section>
  );
}
