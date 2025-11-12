import React, { useState } from 'react';

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

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" min-h-screen py-4 sm:py-4 lg:py-4 px-4 sm:px-6 lg:px-12">
      {/* Header */}
      <div className="max-full mx-auto mb-6 sm:mb-8 lg:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white font-clash Display text-center sm:text-left">
          FAQs
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 mx-auto sm:mx-0"></div>
      </div>

      {/* FAQ Items */}
      <div className="max-full mx-auto">
        {faqs.map((faq, idx) => (
          <div  
            key={idx} 
            className="mb-3 sm:mb-4 transition-all duration-300 hover:scale-[1.01]"
          >
            {/* Question */}
            <div
              onClick={() => toggleFaq(idx)}
              className="flex items-center justify-between w-full bg-[#161616] text-white px-4 sm:px-6 py-3 sm:py-4 border border-white border-opacity-20 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#1e1e1e] hover:border-opacity-40 active:scale-[0.99]"
            >
              <span className="flex items-start text-sm sm:text-base lg:text-lg font-medium pr-4">
                <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0">•</span>
                <span className="text-left leading-relaxed">
                  {faq.question}
                </span>
              </span>
              <span className="flex-shrink-0 ml-2">
                {openIndex === idx ? (
                  <svg 
                    width="20" 
                    height="20" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    className="text-blue-400 transition-transform duration-300 transform rotate-180"
                  >
                    <path 
                      d="M7 14l5-5 5 5" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg 
                    width="20" 
                    height="20" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    className="text-white transition-transform duration-300"
                  >
                    <path 
                      d="M7 10l5 5 5-5" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </div>

            {/* Answer */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                openIndex === idx 
                  ? 'max-h-40 sm:max-h-48 opacity-100 transform translate-y-0' 
                  : 'max-h-0 opacity-0 transform -translate-y-2'
              }`}
            >
              <div className="bg-[#222] text-gray-300 px-4 sm:px-6 py-3 sm:py-4 border border-white border-opacity-10 border-t-0 rounded-b-lg">
                <div className="flex items-start">
                  <span className="text-green-400 mr-2 sm:mr-3 mt-1 flex-shrink-0">✓</span>
                  <p className="text-sm sm:text-base leading-relaxed lg:leading-loose">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
}

export default FAQ;