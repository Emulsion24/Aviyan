"use client";
import { Download, FileText, Printer, ImageIcon } from "lucide-react";
import Image from "next/image";

export default function DownloadsSection() {
  const downloads = [
    {
      id: 1,
      title: "अभियान PDF",
      description: "गौ सम्मान आह्वान अभियान की पूर्ण जानकारी",
      icon: FileText,
      file: "/aviyan.pdf",
      filename: "Gau-Samman-Aviyan.pdf",
      color: "from-orange-500 to-amber-600",
      bgPattern: "from-orange-50 to-amber-50"
    },
    {
      id: 2,
      title: "प्रिंट फाइल",
      description: "प्रिंट करने योग्य अभियान सामग्री",
      icon: Printer,
      file: "https://drive.google.com/file/d/1COLb3QqAsFpYg6lt69HB7MTCKnj_UGUu/view?usp=drive_link",
      filename: "Gau-Samman-Printable",
      color: "from-blue-500 to-indigo-600",
      bgPattern: "from-blue-50 to-indigo-50"
    },
    {
      id: 3,
      title: "लोगो डाउनलोड",
      description: "गौ सम्मान आह्वान का आधिकारिक लोगो",
      icon: ImageIcon,
      file: "/logo.jpg",
      filename: "Gau-Samman-Logo.jpg",
      color: "from-green-500 to-emerald-600",
      bgPattern: "from-green-50 to-emerald-50"
    }
  ];

  const handleDownload = (file, filename) => {
    const link = document.createElement('a');
    link.href = file;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="downlaod"
    className="relative py-20 bg-gradient-to-br from-yellow-50 via-white to-orange-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Download Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {downloads.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-2 border-gray-100"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.bgPattern} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative p-8">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={40} className="text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(item.file, item.filename)}
                  className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r ${item.color} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95`}
                >
                  <Download size={20} />
                  <span>डाउनलोड करें</span>
                </button>
              </div>

              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full`}></div>
            </div>
          ))}
        </div>

        {/* Info Box */}
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
                  <span>जो प्रिंटिंग वाली फाइल दी हुए हे उसे वैसे ही छपवानी हे, आपको ना एक शब्द हटाना हे और न ही एक शब्द जोड़ना हे</span>
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