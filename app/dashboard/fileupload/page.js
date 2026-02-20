"use client";
import { useState, useEffect } from 'react';
import { 
  UploadCloud, Loader2, CheckCircle, Trash2, Edit, Plus, X,
  FileText, Image as ImageIcon, Music, Printer, Save
} from 'lucide-react';

export default function AdminPortal() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('LIST'); 
  
  // Form State supports multiple URLs
  const [formData, setFormData] = useState({
    id: null,
    titleEn: '',
    titleHi: '',
    pdfUrl: '',
    imageUrl: '',
    audioUrl: '',
    cdrUrl: '',
    mainIcon: 'FILE' // Determines the card's main look
  });
  
  // Track which specific field is currently uploading
  const [uploadingField, setUploadingField] = useState(null); 
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchCards(); }, []);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/downloads');
      const result = await res.json();
      
      // FIX: Ensure we only set an actual array into the 'cards' state
      if (Array.isArray(result)) {
        setCards(result);
      } else if (result && Array.isArray(result.data)) {
        setCards(result.data);
      } else {
        setCards([]); // Fallback to empty array if API returns something unexpected
      }
    } catch (e) { 
      console.error(e); 
      setCards([]); // FIX: Fallback to empty array on network error
    } 
    finally { setLoading(false); }
  };

  // --- GENERIC UPLOAD HANDLER ---
  // key: 'pdfUrl', 'imageUrl', or 'audioUrl'
  const handleFileUpload = async (e, key) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // --- NEW: 10MB Size Limit Check for PDFs ---
    if (key === 'pdfUrl' && file.size > 10 * 1024 * 1024) {
      alert("Error: The PDF file is too large. Please upload a file smaller than 10MB.");
      e.target.value = null; // Reset the file input
      return;
    }

    setUploadingField(key); // Show loader for this specific button
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      if (!res.ok) throw new Error("Upload failed");
      const result = await res.json();
      
      // Update specific field in form data
      setFormData((prev) => ({ ...prev, [key]: result.url }));
    } catch (error) {
      alert("Error uploading file");
    } finally {
      setUploadingField(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const method = formData.id ? 'PUT' : 'POST';

    try {
      const res = await fetch('/api/downloads', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(formData.id ? 'Card Updated!' : 'Card Created!');
        resetForm();
        fetchCards();
      }
    } catch (error) { alert('Failed'); } 
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if(!confirm("Delete this card?")) return;
    await fetch(`/api/downloads?id=${id}`, { method: 'DELETE' });
    fetchCards();
  };

  const handleEdit = (card) => {
    setFormData({
      id: card.id,
      titleEn: card.titleEn,
      titleHi: card.titleHi,
      pdfUrl: card.pdfUrl || '',
      imageUrl: card.imageUrl || '',
      audioUrl: card.audioUrl || '',
      cdrUrl: card.cdrUrl || '',
      mainIcon: card.mainIcon || 'FILE'
    });
    setView('FORM');
  };

  const resetForm = () => {
    setFormData({ id: null, titleEn: '', titleHi: '', pdfUrl: '', imageUrl: '', audioUrl: '', cdrUrl: '', mainIcon: 'FILE' });
    setView('LIST');
  };

  // Helper to render main icon
  const renderIcon = (iconName) => {
    switch(iconName) {
      case 'MUSIC': return <Music size={20} />;
      case 'IMAGE': return <ImageIcon size={20} />;
      case 'PRINTER': return <Printer size={20} />;
      default: return <FileText size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-orange-700">Admin Dashboard</h1>
          {view === 'LIST' && (
            <button 
              onClick={() => { resetForm(); setView('FORM'); }}
              className="flex items-center gap-2 bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700 shadow-md transition"
            >
              <Plus size={20} /> Add New Card
            </button>
          )}
        </div>

        {/* --- FORM VIEW --- */}
        {view === 'FORM' && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-orange-50 px-8 py-4 border-b border-orange-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-orange-800">
                {formData.id ? 'Edit Card' : 'Create New Card'}
              </h2>
              <button onClick={resetForm}><X className="text-gray-400 hover:text-red-500" /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 grid gap-8">
              
              {/* 1. Basic Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Title (English)</label>
                  <input type="text" required className="w-full p-3 border rounded-lg" placeholder="e.g. Campaign Poster"
                    value={formData.titleEn} onChange={e => setFormData({...formData, titleEn: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Description (Hindi)</label>
                  <input type="text" required className="w-full p-3 border rounded-lg" placeholder="Hindi description..."
                    value={formData.titleHi} onChange={e => setFormData({...formData, titleHi: e.target.value})} />
                </div>
              </div>

              {/* 2. Main Icon Selector */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Main Icon (For Card Display)</label>
                <div className="flex gap-4">
                  {['FILE', 'IMAGE', 'MUSIC', 'PRINTER'].map((icon) => (
                    <button
                      key={icon} type="button"
                      onClick={() => setFormData({...formData, mainIcon: icon})}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        formData.mainIcon === icon 
                        ? 'bg-orange-600 text-white border-orange-600 shadow-md' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {renderIcon(icon)} <span className="text-sm font-semibold">{icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 my-2"></div>

              {/* 3. MULTI-UPLOAD SECTION */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Attach Files</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  
                  {/* PDF Upload */}
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <div className="flex justify-between mb-2">
                      <label className="font-bold text-blue-800 flex items-center gap-2"><FileText size={16}/> PDF Document (Max 10MB)</label>
                      {formData.pdfUrl && <CheckCircle size={16} className="text-green-600"/>}
                    </div>
                    {formData.pdfUrl ? (
                      <div className="flex gap-2">
                        <input type="text" disabled value={formData.pdfUrl} className="w-full text-xs p-2 bg-white rounded border" />
                        <button type="button" onClick={() => setFormData({...formData, pdfUrl: ''})} className="text-red-500"><Trash2 size={18}/></button>
                      </div>
                    ) : (
                      <div className="relative">
                        <input type="file" accept=".pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => handleFileUpload(e, 'pdfUrl')} disabled={uploadingField === 'pdfUrl'} />
                        <button type="button" className="w-full py-2 bg-white border border-blue-200 rounded text-blue-600 text-sm font-medium hover:bg-blue-100">
                          {uploadingField === 'pdfUrl' ? 'Uploading...' : 'Upload PDF'}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <div className="flex justify-between mb-2">
                      <label className="font-bold text-green-800 flex items-center gap-2"><ImageIcon size={16}/> Image (JPG/PNG)</label>
                      {formData.imageUrl && <CheckCircle size={16} className="text-green-600"/>}
                    </div>
                    {formData.imageUrl ? (
                      <div className="flex gap-2">
                        <img src={formData.imageUrl} className="h-8 w-8 object-cover rounded" />
                        <input type="text" disabled value={formData.imageUrl} className="w-full text-xs p-2 bg-white rounded border" />
                        <button type="button" onClick={() => setFormData({...formData, imageUrl: ''})} className="text-red-500"><Trash2 size={18}/></button>
                      </div>
                    ) : (
                      <div className="relative">
                        <input type="file" accept=".jpg,.jpeg,.png" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => handleFileUpload(e, 'imageUrl')} disabled={uploadingField === 'imageUrl'} />
                        <button type="button" className="w-full py-2 bg-white border border-green-200 rounded text-green-600 text-sm font-medium hover:bg-green-100">
                          {uploadingField === 'imageUrl' ? 'Uploading...' : 'Upload Image'}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Audio Upload */}
                  <div className="bg-pink-50 p-4 rounded-xl border border-pink-100">
                    <div className="flex justify-between mb-2">
                      <label className="font-bold text-pink-800 flex items-center gap-2"><Music size={16}/> Audio (MP3)</label>
                      {formData.audioUrl && <CheckCircle size={16} className="text-green-600"/>}
                    </div>
                    {formData.audioUrl ? (
                      <div className="flex gap-2">
                        <input type="text" disabled value={formData.audioUrl} className="w-full text-xs p-2 bg-white rounded border" />
                        <button type="button" onClick={() => setFormData({...formData, audioUrl: ''})} className="text-red-500"><Trash2 size={18}/></button>
                      </div>
                    ) : (
                      <div className="relative">
                        <input type="file" accept=".mp3,.wav" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => handleFileUpload(e, 'audioUrl')} disabled={uploadingField === 'audioUrl'} />
                        <button type="button" className="w-full py-2 bg-white border border-pink-200 rounded text-pink-600 text-sm font-medium hover:bg-pink-100">
                          {uploadingField === 'audioUrl' ? 'Uploading...' : 'Upload Audio'}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* CDR Link (Input) */}
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <div className="flex justify-between mb-2">
                      <label className="font-bold text-purple-800 flex items-center gap-2"><Printer size={16}/> CDR / Drive Link</label>
                    </div>
                    <input 
                      type="text" 
                      className="w-full p-2 text-sm border border-purple-200 rounded focus:ring-2 focus:ring-purple-500 outline-none" 
                      placeholder="Paste Google Drive Link here..."
                      value={formData.cdrUrl}
                      onChange={(e) => setFormData({...formData, cdrUrl: e.target.value})}
                    />
                  </div>

                </div>
              </div>

              {/* Submit Action */}
              <div className="flex justify-end gap-4 mt-4">
                <button type="button" onClick={resetForm} className="px-6 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-bold">Cancel</button>
                <button 
                  type="submit" 
                  disabled={submitting || uploadingField}
                  className="px-8 py-3 rounded-lg bg-orange-600 text-white font-bold shadow-lg hover:bg-orange-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                  {formData.id ? 'Update Card' : 'Save Card'}
                </button>
              </div>

            </form>
          </div>
        )}

        {/* --- LIST VIEW --- */}
        {view === 'LIST' && (
          <div className="grid gap-4">
            {loading ? <div className="text-center py-20">Loading...</div> : 
             /* FIX: Added Array.isArray check before map */
             Array.isArray(cards) && cards.map(card => (
              <div key={card.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between hover:shadow-md transition">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="p-3 bg-gray-100 rounded-full text-gray-600">
                    {renderIcon(card.mainIcon)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{card.titleEn}</h3>
                    <p className="text-sm text-gray-500">{card.titleHi}</p>
                    
                    {/* Badge indicators for what files are attached */}
                    <div className="flex gap-2 mt-2">
                      {card.pdfUrl && <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-bold">PDF</span>}
                      {card.imageUrl && <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-bold">IMG</span>}
                      {card.audioUrl && <span className="text-[10px] px-2 py-0.5 bg-pink-100 text-pink-700 rounded-full font-bold">MP3</span>}
                      {card.cdrUrl && <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-bold">CDR</span>}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4 md:mt-0 w-full md:w-auto">
                  <button onClick={() => handleEdit(card)} className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium text-sm">Edit</button>
                  <button onClick={() => handleDelete(card.id)} className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium text-sm">Delete</button>
                </div>
              </div>
            ))}
            
            {/* Added a fallback so you aren't left with a blank screen if no cards exist */}
            {!loading && (!Array.isArray(cards) || cards.length === 0) && (
              <div className="text-center py-10 text-gray-500">
                No cards found. Click Add New Card to get started!
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}