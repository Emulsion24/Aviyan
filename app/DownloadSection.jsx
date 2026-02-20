"use client";
import { Download, FileText, Printer, ImageIcon, Music2Icon, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

// --- 1. Helper: Define Color Palettes ---
const CARD_STYLES = [
  { color: "from-orange-500 to-amber-600", bgPattern: "from-orange-50 to-amber-50" },
  { color: "from-purple-500 to-violet-600", bgPattern: "from-purple-50 to-violet-50" },
  { color: "from-blue-500 to-indigo-600", bgPattern: "from-blue-50 to-indigo-50" },
  { color: "from-green-500 to-emerald-600", bgPattern: "from-green-50 to-emerald-50" },
  { color: "from-cyan-500 to-teal-600", bgPattern: "from-cyan-50 to-teal-50" },
  { color: "from-red-500 to-rose-600", bgPattern: "from-red-50 to-rose-50" },
  { color: "from-pink-500 to-fuchsia-600", bgPattern: "from-pink-50 to-fuchsia-50" },
  { color: "from-indigo-500 to-violet-600", bgPattern: "from-indigo-50 to-violet-50" },
];

// --- 2. Helper: Map DB Icon string to Component ---
const getIconComponent = (iconName) => {
  switch (iconName) {
    case 'MUSIC': return Music2Icon;
    case 'IMAGE': return ImageIcon;
    case 'PRINTER': return Printer;
    case 'FILE': 
    default: return FileText;
  }
};

// --- 3. Modal Component (FIXED LOGIC) ---
const DownloadModal = ({ file, onClose }) => {
  if (!file) return null;

  // 1. Helper: Ensure URL is always HTTPS to prevent "Failed to Load" / Mixed Content errors
  const getSecureUrl = (url) => {
    if (!url) return '';
    // If it starts with http://, replace with https://
    if (url.startsWith('http://')) {
      return url.replace('http://', 'https://');
    }
    return url;
  };

  const secureUrl = getSecureUrl(file.file);

  // 2. Logic: Handle the Download Button Click
  const handleDownloadClick = () => {
    let downloadLink = secureUrl;

    // A. Handle Cloudinary: Inject 'fl_attachment' to force the browser to download
    if (downloadLink.includes("cloudinary.com") && downloadLink.includes("/upload/")) {
      // Split the URL at '/upload/' and insert the flag
      const parts = downloadLink.split('/upload/');
      if (parts.length === 2) {
        downloadLink = `${parts[0]}/upload/fl_attachment/${parts[1]}`;
      }
    }

    // B. Handle Google Drive: Ensure it opens in a new tab (Standard behavior)
    if (downloadLink.includes("drive.google.com")) {
      window.open(downloadLink, '_blank');
      onClose();
      return;
    }

    // C. Execute Download
    // We create a temporary link and click it. This is safer than window.open for files.
    try {
      const link = document.createElement('a');
      link.href = downloadLink;
      link.setAttribute('download', file.filename || 'download'); // Hint to browser
      link.setAttribute('target', '_blank'); // Fallback to new tab if download fails
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download trigger failed", err);
      // Fallback
      window.open(downloadLink, '_blank');
    }
    
    onClose();
  };
  
  const isViewable = file.type === "PDF" || file.type === "JPG";
  const isPlayable = file.type === "MP3";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 md:p-8 transform transition-all duration-300 scale-100 opacity-100" 
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h3 className="text-2xl font-bold text-gray-800 line-clamp-1">
            {file.filename}
          </h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          आप **{file.type}** फ़ाइल के साथ क्या करना चाहते हैं?
        </p>

        {isPlayable && (
          <div className="bg-orange-100 p-4 rounded-xl mb-6 border border-orange-300">
            <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                <Music2Icon size={20} /> पहले गीत सुनें:
            </h4>
            {/* FIXED: Uses secureUrl so audio doesn't get blocked */}
            <audio controls src={secureUrl} className="w-full">
                Your browser does not support the audio element.
            </audio>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <p className="font-semibold text-gray-800 mb-1">फाइल का प्रकार: <span className="text-orange-600">{file.type}</span></p>
          <p className="font-semibold text-gray-800">नाम: <span className="text-gray-700 break-words">{file.filename}</span></p>
        </div>

        {/* PREVIEW BUTTON */}
        {((isViewable && !isPlayable) || secureUrl.includes("drive.google.com")) && (
          <a
            /* FIXED: Uses secureUrl directly in href */
            href={secureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-500 text-white font-semibold shadow-md hover:bg-indigo-600 transition-all duration-300"
          >
            <FileText size={18} />
            {secureUrl.includes("drive.google.com") ? "गूगल ड्राइव में देखें" : "फाइल का पूर्वावलोकन (Preview)"}
          </a>
        )}

        {/* DOWNLOAD BUTTON */}
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

// --- 4. Main Component ---
export default function DownloadsSection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data from Backend
  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const response = await fetch('/api/downloads?limit=100', { cache: 'no-store' });
        const result = await response.json();
        
        // Handle API Structure (Array vs Object wrapper)
        let cardsData = [];
        if (Array.isArray(result)) {
          cardsData = result;
        } else if (result.data && Array.isArray(result.data)) {
          cardsData = result.data;
        }

        if (cardsData.length > 0) {
          const formattedData = cardsData.map((item, index) => {
            const style = CARD_STYLES[index % CARD_STYLES.length];
            const IconComp = getIconComponent(item.mainIcon);

            const files = [];
            // Safe checks for urls
            if (item.pdfUrl) files.push({ type: "PDF", file: item.pdfUrl, filename: `${item.titleEn}.pdf` });
            if (item.cdrUrl) files.push({ type: "CDR", file: item.cdrUrl, filename: `${item.titleEn}.cdr` });
            if (item.imageUrl) files.push({ type: "JPG", file: item.imageUrl, filename: `${item.titleEn}.jpg` });
            if (item.audioUrl) files.push({ type: "MP3", file: item.audioUrl, filename: `${item.titleEn}.mp3` });

            return {
              id: item.id,
              title: item.titleEn,
              description: item.titleHi,
              icon: IconComp,
              files: files,
              color: style.color,
              bgPattern: style.bgPattern
            };
          });

          setDownloads(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch downloads", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloads();
  }, []);

  const handleDownloadPrepare = (fileInfo) => {
    setSelectedFile(fileInfo);
  };
  
  return (
    <section id="downlaod" className="relative py-20 bg-gradient-to-br from-yellow-50 via-white to-orange-50 overflow-hidden">
      
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
              alt="Logo"
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

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={48} className="text-orange-600 animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Loading resources...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {downloads.length > 0 ? downloads.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-2 border-gray-100 flex flex-col" 
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
                  <div className="flex flex-wrap gap-2">
                    {item.files.length > 0 ? (
                      item.files.map((fileInfo, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleDownloadPrepare(fileInfo)} 
                          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-gradient-to-r ${item.color} text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-xs whitespace-nowrap`}
                        >
                          <Download size={14} />
                          <span>{fileInfo.type}</span>
                        </button>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400 w-full text-center">No files available</span>
                    )}
                  </div>
                </div>

                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full`}></div>
              </div>
            )) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                  No downloads available at the moment.
              </div>
            )}
          </div>
        )}

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
                <li className="flex items-start gap-2"><span className="text-orange-500 mt-1">•</span><span>जो प्रिंटिंग वाली फाइल दी हुए हे उसे वैसे ही छपवानी हे, आपको ना एक शब्द हटाना हे और न ही एक शब्द जोड़ना हे</span></li>
                <li className="flex items-start gap-2"><span className="text-orange-500 mt-1">•</span><span>सभी फाइलें मुफ्त हैं और अभियान के प्रचार-प्रसार के लिए उपयोग की जा सकती हैं</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}