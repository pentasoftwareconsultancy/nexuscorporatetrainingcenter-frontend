import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: 'What courses does Nexus Corporate Training Center LLP offer?',
    answer: 'Nexus Corporate Training Center LLP offers a wide range of technical, management, and soft skills courses tailored for professionals and students.',
  },
  {
    question: 'Does Nexus Corporate Training Center LLP provide 100% placements assistance?',
    answer: 'Yes, placement assistance is provided. However, 100% placement depends on various factors like student performance and interview outcomes.',
  },
  {
    question: 'Who conducts training sessions?',
    answer: 'Industry experts and certified trainers with years of experience conduct the training sessions.',
  },
  {
    question: 'What is the duration of course?',
    answer: 'Course durations vary from a few weeks to several months, depending on the chosen program.',
  },
  {
    question: 'Does Nexus Corporate Training Center LLP provide certificate after course completion?',
    answer: 'Yes, a certificate is provided upon successful completion of the course.',
  },
  {
    question: 'What types of jobs are offered in placement drive?',
    answer: 'Job roles range from entry-level to mid-level positions in IT, management, and other professional areas.',
  },
  {
    question: 'Can non-technical students enroll in Nexus Corporate Training Center LLP courses?',
    answer: 'Yes, many courses are suitable for non-technical students as well.',
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full min-h-screen bg-black px-3 md:px-12 py-16 text-white">
      
      {/* Heading */}
      <h1 className="text-5xl md:text-5xl font-semibold mb-12 tracking-tight font-clash  ">
        FAQs
      </h1>

      {/* FAQ Items */}
      <div className="space-y-5">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl border border-[#3b1d12] bg-[#120b08]"
            >
              {/* LEFT ORANGE GLOW */}
              <div className="absolute inset-y-0 left-0 w-[220px] bg-gradient-to-r from-[#ff6a00]/70 via-[#ff6a00]/20 to-transparent blur-2xl opacity-90" />

              {/* EXTRA BOTTOM GLOW */}
              <div className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-r from-[#ff6a00]/20 via-transparent to-transparent blur-xl" />

              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="relative z-10 flex w-full items-center justify-between px-6 md:px-8 py-6 md:py-7 text-left"
              >
                <span className="max-w-[90%] text-[13px] md:text-[16px] uppercase tracking-wide font-medium leading-relaxed text-[#f5f5f5]">
                  {faq.question}
                </span>

                <span className="text-[#ff6a00]">
                  {isOpen ? (
                    <Minus size={22} strokeWidth={1.5} />
                  ) : (
                    <Plus size={22} strokeWidth={1.5} />
                  )}
                </span>
              </button>

              {/* Answer */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="relative z-10 px-6 md:px-8 pb-6 text-sm md:text-base text-gray-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}