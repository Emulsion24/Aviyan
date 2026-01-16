"use client";
import { Download, FileText, Printer, ImageIcon, Music2Icon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Modal Component
const DownloadModal = ({ file, onClose }) => {
  if (!file) return null;

  const handleDownloadClick = () => {
    // For Google Drive links, open in new tab
    if (file.file.includes("drive.google.com")) {
      window.open(file.file, '_blank');
      onClose();
      return;
    }

    // Direct download
    const link = document.createElement('a');
    link.href = file.file;
    link.download = file.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose(); 
  };
  
  // Logic to detect file types for preview
  const isViewable = file.type === "PDF" || file.type === "JPG";
  const isPlayable = file.type === "MP3";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 md:p-8 transform transition-all duration-300 scale-100 opacity-100" 
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h3 className="text-2xl font-bold text-gray-800">
            {file.filename}
          </h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          आप **{file.type}** फ़ाइल के साथ क्या करना चाहते हैं?
        </p>

        {/* MP3 Playback Section */}
        {isPlayable && (
          <div className="bg-orange-100 p-4 rounded-xl mb-6 border border-orange-300">
            <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                <Music2Icon size={20} /> पहले गीत सुनें:
            </h4>
            <audio controls src={file.file} className="w-full">
                Your browser does not support the audio element.
            </audio>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <p className="font-semibold text-gray-800 mb-1">फाइल का प्रकार (Type): <span className="text-orange-600">{file.type}</span></p>
          <p className="font-semibold text-gray-800">नाम (Name): <span className="text-gray-700 break-words">{file.filename}</span></p>
        </div>

        {/* View/Preview Link for applicable files */}
        {((isViewable && !isPlayable) || file.file.includes("drive.google.com")) && (
          <a
            href={file.file}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-500 text-white font-semibold shadow-md hover:bg-indigo-600 transition-all duration-300"
          >
            <FileText size={18} />
            {file.file.includes("drive.google.com") ? "गूगल ड्राइव में देखें" : "फाइल का पूर्वावलोकन (Preview)"}
          </a>
        )}

        {/* Final Download Button */}
        <button
          onClick={handleDownloadClick}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-600 text-white font-bold shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-[1.01] active:scale-95"
        >
          <Download size={20} />
          <span>हाँ, डाउनलोड करें</span>
        </button>
        
        <button 
          onClick={onClose} 
          className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700 transition"
        >
          रद्द करें
        </button>
      </div>
    </div>
  );
};

export default function DownloadsSection() {
  const [selectedFile, setSelectedFile] = useState(null);

  const downloads = [
    // 1. Hindi Prachar Patrak
    {
      id: 1,
      title: "प्रचार पत्रक (Hindi)",
      description: "गौ सम्मान आह्वान अभियान की पूर्ण जानकारी (हिंदी)",
      icon: FileText,
      files: [ 
        { type: "PDF", file: "/GSAA-02 A5 Final (3).pdf", filename: "Gau-Samman-Aviyan-प्रचार-पत्रक.pdf" },
        { type: "CDR", file: "https://drive.google.com/file/d/1jiI7LbE1TaZp7ITfF8YkMofg78d92vIp/view?usp=sharing", filename: "Gau-Samman-Aviyan.cdr" } 
      ],
      color: "from-orange-500 to-amber-600",
      bgPattern: "from-orange-50 to-amber-50"
    },
    // 2. English Prachar Patrak (New)
    {
      id: 2,
      title: "Prachar Patrak (English)",
      description: "Complete information about Gau Samman Abhiyan (English)",
      icon: FileText,
      files: [ 
        { type: "PDF", file: "/GSAA-02 A5 English (1).pdf", filename: "Gau-Samman-Aviyan-English.pdf" },
        { type: "CDR", file: "https://drive.google.com/file/d/1t3AeN-ZBz4C34Y8owi_7GOTMkYtomViL/view?usp=sharing", filename: "Gau-Samman-Aviyan-English.cdr" } 
      ],
      color: "from-purple-500 to-violet-600",
      bgPattern: "from-purple-50 to-violet-50"
    },
    // 3. Udbodhan Patra
    {
      id: 3,
      title: "उद्बोधन पत्र",
      description: "प्रिंट करने योग्य अभियान सामग्री",
      icon: Printer,
      files: [ 
        { type: "PDF", file: "/GMPC Finaly C.pdf", filename: "Gau-Samman-उद्बोधन-पत्र.pdf" },
        { type: "CDR", file: "https://drive.google.com/file/d/1F0UnSuYDMEKEM36Jt1cyq2xyvVdFMG_-/view?usp=drive_link", filename: "Gau-Samman-उद्बोधन-पत्र.cdr" } 
      ],
      color: "from-blue-500 to-indigo-600",
      bgPattern: "from-blue-50 to-indigo-50"
    },
    // 4. Logo
    {
      id: 4,
      title: "लोगो डाउनलोड",
      description: "गौ सम्मान आह्वान का आधिकारिक लोगो",
      icon: ImageIcon,
      files: [
        { type: "JPG", file: "/logo.jpg", filename: "Gau-Samman-Logo.jpg" }
      ],
      color: "from-green-500 to-emerald-600",
      bgPattern: "from-green-50 to-emerald-50"
    },
    // 5. Song
    {
      id: 5,
      title: "अभियान गीत (MP3)",
      description: "गौ सम्मान आह्वान अभियान का आधिकारिक गीत डाउनलोड करें।",
      icon: Music2Icon,
      files: [ 
        { type: "MP3", file: "/Goumata DynamicCD.wav", filename: "Gau-Samman-Geet.mp3" }
      ],
      color: "from-cyan-500 to-teal-600",
      bgPattern: "from-cyan-50 to-teal-50"
    },
    // 6. Poster 19 x 22
    {
      id: 6,
      title: "पोस्टर (Poster) 19x22",
      description: "19x22 इंच पोस्टर प्रिंट फाइल डाउनलोड करें।",
      icon: ImageIcon,
      files: [
        { type: "PDF", file: "Poster 19x22.pdf", filename: "Poster-19x22.pdf" },
        { type: "CDR", file: "https://drive.google.com/file/d/19pverH4yBchrbnRpPawmkF4XUWq2Kh9W/view?usp=sharing", filename: "Poster-19x22.cdr" }
      ],
      color: "from-red-500 to-rose-600",
      bgPattern: "from-red-50 to-rose-50"
    },
    // 7. Flex 20 x 10
    {
      id: 7,
      title: "फ्लेक्स (Flex) 20x10",
      description: "20x10 फीट फ्लेक्स प्रिंट फाइल डाउनलोड करें।",
      icon: ImageIcon,
      files: [
        { type: "PDF", file: "Flex 20x10 ...1.pdf", filename: "Flex-20x10.pdf" },
        { type: "CDR", file: "https://drive.google.com/file/d/1DdPlLONlPe5nCetjDnADwkEqXuOhlTYk/view?usp=sharing", filename: "Flex-20x10.cdr" }
      ],
      color: "from-pink-500 to-fuchsia-600",
      bgPattern: "from-pink-50 to-fuchsia-50"
    },
    // 8. Flex 10 x 10
    {
      id: 8,
      title: "फ्लेक्स (Flex) 10x10",
      description: "10x10 फीट फ्लेक्स प्रिंट फाइल डाउनलोड करें।",
      icon: ImageIcon,
      files: [
        // Using the file path provided in your previous snippet for 10x10 (check if correct)
        { type: "PDF", file: "10x10.pdf", filename: "Flex-10x10.pdf" },
        { type: "CDR", file: "https://drive.google.com/file/d/1IWkT6SyouKo1ORjKjIXjjn-2reHHBQ-A/view?usp=sharing", filename: "Flex-10x10.cdr" }
      ],
      color: "from-indigo-500 to-violet-600",
      bgPattern: "from-indigo-50 to-violet-50"
    },
    // 9. Flex 6 x 4
    {
      id: 9,
      title: "फ्लेक्स (Flex) 6x4",
      description: "6x4 फीट फ्लेक्स प्रिंट फाइल डाउनलोड करें।",
      icon: ImageIcon,
      files: [
        { type: "PDF", file: "6x4.pdf", filename: "Flex-6x4.pdf" },
        { type: "CDR", file: "https://drive.google.com/file/d/15JySIr_Fa7UM8Xw5FrOQ_RNzCMOGoZjP/view?usp=sharing", filename: "Flex-6x4.cdr" }
      ],
      color: "from-teal-500 to-emerald-600",
      bgPattern: "from-teal-50 to-emerald-50"
    },
    // 10. Flex 4 x 2
    {
      id: 10,
      title: "फ्लेक्स (Flex) 4x2",
      description: "4x2 फीट फ्लेक्स प्रिंट फाइल डाउनलोड करें।",
      icon: ImageIcon,
      files: [
        { type: "PDF", file: "2x4.pdf", filename: "Flex-4x2.pdf" },
        { type: "CDR", file: "https://drive.google.com/file/d/1OqFeD6Tg3pIeWskp_t03GA_T6WgagQep/view?usp=sharing", filename: "Flex-4x2.cdr" }
      ],
      color: "from-sky-500 to-blue-600",
      bgPattern: "from-sky-50 to-blue-50"
    },
       {
      id: 11,
      title: "प्रचार पत्रक (Gujarati)",
      description: "गौ सम्मान आह्वान अभियान की पूर्ण जानकारी (गुजराती)",
      icon: FileText,
      files: [ 
        { type: "PDF", file: "/GSAA-02 A5 Final Gujrati.pdf", filename: "Gau-Samman-Aviyan-प्रचार-पत्रक.pdf" },
        { type: "CDR", file: "https://drive.google.com/file/d/1av13J5-tN3HtkYd4kARt2Je_TeRCRnKF/view?usp=sharing", filename: "Gau-Samman-Aviyan.cdr" } 
      ],
      color: "from-orange-500 to-amber-600",
      bgPattern: "from-orange-50 to-amber-50"
    },

{
  id: 12,
  title: "10 x 10 Miss Call",
  description: "गौ सम्मान अभियान हेतु 10x10 मिस कॉल पोस्टर",
  icon: FileText,
  files: [
    { type: "PDF", file: "/10x10 miss call.pdf", filename: "Gau-Samman-Aviyan-प्रचार-पत्रक-10-10-miss-call.pdf" },
    { type: "CDR", file: "/10x10 miss call C.cdr", filename: "Gau-Samman-Aviyan-10-10-miss-call.cdr" }
  ],
  color: "from-red-500 to-rose-600",
  bgPattern: "from-red-50 to-rose-50"
},
{
  id: 13,
  title: "10x10 bennar Abhiyan 1",
  description: "गौ सम्मान अभियान हेतु 10x10 पोस्टर डिजाइन",
  icon: FileText,
  files: [
    { type: "PDF", file: "/10x20 bennar Abhiyan new.pdf", filename: "Gau-Samman-Aviyan-Poster-English.pdf" },
    { type: "CDR", file: "https://drive.google.com/file/d/1cnBaxZrvmLvy6r8rybDX9Z1gb06BQ-G9/view?usp=sharing", filename: "Gau-Samman-Poster-English.cdr" }
  ],
  color: "from-blue-500 to-indigo-600",
  bgPattern: "from-blue-50 to-indigo-50"
},
{
  id: 14,
  title: "10x10 A social Media",
  description: "गौ सम्मान अभियान हेतु 10x10 सोशल मीडिया पोस्टर",
  icon: FileText,
  files: [
    { type: "PDF", file: "/10x10 A social media.pdf", filename: "Gau-Samman-Social-Media.pdf" },
    { type: "CDR", file: "https://drive.google.com/file/d/1ukpljXRvY4ZhrdfIv5npI6LDOXOsy95O/view?usp=sharing", filename: "Gau-Samman-Poster-Hindi.cdr" }
  ],
  color: "from-green-500 to-emerald-600",
  bgPattern: "from-green-50 to-emerald-50"
},
{
  id: 15,
  title: "VC-02",
  description: "गौ सम्मान अभियान हेतु बैनर डिजाइन",
  icon: FileText,
  files: [
    { type: "PDF", file: "/VC-02.pdf", filename: "Gau-Samman-Banner.pdf" },
    { type: "CDR", file: "https://drive.google.com/file/d/1cZtmcmkYI7bWdZGF39XxmhIbmAZndx8F/view?usp=sharing", filename: "Gau-Samman-Banner.cdr" }
  ],
  color: "from-purple-500 to-violet-600",
  bgPattern: "from-purple-50 to-violet-50"
},
{
  id: 16,
  title: "10x10 x Hendal",
  description: "गौ सम्मान अभियान हेतु 10x10 पोस्टर डिजाइन",
  icon: FileText,
  files: [
    { type: "PDF", file: "/10x10 X hendal.pdf", filename: "Gau-Samman-Social-Creatives.pdf" },
    { type: "ZIP", file: "https://drive.google.com/file/d/1VhJVdeYzUDLkXHXP1QEt_3sJ5IJc6Ucx/view?usp=sharing", filename: "Gau-Samman-Social-Creatives.zip" }
  ],
  color: "from-cyan-500 to-sky-600",
  bgPattern: "from-cyan-50 to-sky-50"
},







  ];

  const handleDownloadPrepare = (fileInfo) => {
    setSelectedFile(fileInfo);
  };
  
  return (
    <section id="downlaod"
    className="relative py-20 bg-gradient-to-br from-yellow-50 via-white to-orange-50 overflow-hidden">
      
      <DownloadModal 
        file={selectedFile} 
        onClose={() => setSelectedFile(null)} 
      />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Image
              src="/logo.jpg"
              alt="गौ सम्मान लोगो"
              width={80}
              height={80}
              className="rounded-full object-cover shadow-xl"
            />
          </div>
          
          <h2 className="text-4xl md:text-5xl pt-1 pb-1 font-extrabold mb-4 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
            डाउनलोड सेंटर
          </h2>
          
          <div className="w-24 h-1.5 mx-auto bg-gradient-to-r from-orange-500 via-yellow-500 to-amber-500 rounded-full shadow-md mb-4"></div>
          
          <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto">
            अभियान से जुड़ी महत्वपूर्ण फाइलें डाउनलोड करें और अपने समुदाय में साझा करें
          </p>
          
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {downloads.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-2 border-gray-100 flex flex-col" 
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.bgPattern} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
              
              <div className="relative p-8 flex-grow"> 
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={40} className="text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="relative px-8 pb-8 pt-0"> 
                {/* Two buttons (PDF and CDR) per card */}
                <div className="flex gap-3">
                  {item.files.map((fileInfo) => (
                    <button
                      key={fileInfo.type}
                      onClick={() => handleDownloadPrepare(fileInfo)} 
                      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-gradient-to-r ${item.color} text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm`}
                    >
                      <Download size={16} />
                      <span>{fileInfo.type}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full`}></div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="bg-orange-500 rounded-full p-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-lg mb-2">📢 महत्वपूर्ण सूचना</h4>
              <ul className="text-gray-700 space-y-2 text-sm">
                
 <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>जो प्रिंटिंग वाली फाइल दी हुए हे उसे वैसे ही छपवानी हे, आपको ना एक शब्द हटाना हे और न ही एक शब्द जोड़ना हे</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>सभी फाइलें मुफ्त हैं और अभियान के प्रचार-प्रसार के लिए उपयोग की जा सकती हैं</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>प्रिंट फाइल को उच्च गुणवत्ता में प्रिंट करें और वितरित करें</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>लोगो का उपयोग सोशल मीडिया और डिजिटल प्लेटफॉर्म पर करें</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}