// import React, { useState } from 'react';

// const faqs = [
//   {
//     question: 'What courses does Nexus Corporate Training Center LLP offer?',
//     answer: 'Nexus Corporate Training Center LLP offers a wide range of technical, management, and soft skills courses tailored for professionals and students.',
//   },
//   {
//     question: 'Does Nexus Corporate Training Center LLP provide 100% placements assistance?',
//     answer: 'Yes, placement assistance is provided. However, 100% placement depends on various factors like student performance and interview outcomes.',
//   },
//   {
//     question: 'Who conducts training sessions?',
//     answer: 'Industry experts and certified trainers with years of experience conduct the training sessions.',
//   },
//   {
//     question: 'What is the duration of course?',
//     answer: 'Course durations vary from a few weeks to several months, depending on the chosen program.',
//   },
//   {
//     question: 'Does Nexus Corporate Training Center LLP provide certificate after course completion?',
//     answer: 'Yes, a certificate is provided upon successful completion of the course.',
//   },
//   {
//     question: 'What types of jobs are offered in placement drive?',
//     answer: 'Job roles range from entry-level to mid-level positions in IT, management, and other professional areas.',
//   },
//   {
//     question: 'Can non-technical students enroll in Nexus Corporate Training Center LLP courses?',
//     answer: 'Yes, many courses are suitable for non-technical students as well.',
//   }
// ];

// function FAQ() {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleFaq = index => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div className=" py-4 sm:py-4 lg:py-4 px-4 sm:px-6 lg:px-12">
//       {/* Header */}
//       <div className="max-full mx-auto mb-6 sm:mb-8 lg:mb-12">
//         <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white font-clash Display text-center sm:text-left">
//           FAQs
//         </h2>
//       </div>

//       {/* FAQ Items */}
//       <div className="max-full mx-auto">
//         {faqs.map((faq, idx) => (
//           <div  
//             key={idx} 
//             className="mb-3 sm:mb-4 transition-all duration-300 hover:scale-[1.01]"
//           >
//             {/* Question */}
//             <div
//               onClick={() => toggleFaq(idx)}
//               className="flex items-center justify-between w-full bg-[#161616] text-white px-4 sm:px-6 py-3 sm:py-4 border border-white border-opacity-20 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#1e1e1e] hover:border-opacity-40 active:scale-[0.99]"
//             >
//               <span className="flex items-start text-sm sm:text-base lg:text-lg font-medium pr-4">
//                 <span className="text-white mr-2 sm:mr-3 mt-1 shrink-0">•</span>
//                 <span className="text-left leading-relaxed">
//                   {faq.question}
//                 </span>
//               </span>
//               <span className="shrink-0 ml-2">
//                 {openIndex === idx ? (
//                   <svg 
//                     width="20" 
//                     height="20" 
//                     fill="none" 
//                     viewBox="0 0 24 24" 
//                     className="text-blue-400 transition-transform duration-300 transform rotate-180"
//                   >
//                     <path 
//                       d="M7 14l5-5 5 5" 
//                       stroke="currentColor" 
//                       strokeWidth="2" 
//                       strokeLinecap="round" 
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 ) : (
//                   <svg 
//                     width="20" 
//                     height="20" 
//                     fill="none" 
//                     viewBox="0 0 24 24" 
//                     className="text-white transition-transform duration-300"
//                   >
//                     <path 
//                       d="M7 10l5 5 5-5" 
//                       stroke="currentColor" 
//                       strokeWidth="2" 
//                       strokeLinecap="round" 
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 )}
//               </span>
//             </div>

//             {/* Answer */}
//             <div
//               className={`transition-all duration-500 ease-in-out ${
//                 openIndex === idx 
//                   ? 'max-h-40 sm:max-h-48 opacity-100 transform translate-y-0' 
//                   : 'max-h-0 opacity-0 transform -translate-y-2'
//               }`}
//             >
//               <div className="bg-[#222] text-gray-300 px-4 sm:px-6 py-3 sm:py-4 border border-white border-opacity-10 border-t-0 rounded-b-lg">
//                 <div className="flex items-start">
//                   <span className="text-green-400 mr-2 sm:mr-3 mt-1 shrink-0">✓</span>
//                   <p className="text-sm sm:text-base leading-relaxed lg:leading-loose">
//                     {faq.answer}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

     
//     </div>
//   );
// }

// export default FAQ;

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
    <section className="w-full min-h-screen bg-black px-6 md:px-14 py-16 text-white">
      
      {/* Heading */}
      <h1 className="text-5xl md:text-7xl font-light mb-12 tracking-tight">
        FAQ
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