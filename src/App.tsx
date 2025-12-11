import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Clock, 
  ShieldAlert, 
  Users, 
  BrainCircuit, 
  Wrench, 
  Heart, 
  CheckCircle, 
  ArrowRight, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Sparkles,
  Loader2,
  Send
} from 'lucide-react';

const Website = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State for the AI Feature
  const [processInput, setProcessInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Gemini API Handler
  const handleAnalyzeProcess = async () => {
    if (!processInput.trim()) return;
    
    setIsLoading(true);
    setShowResult(true);
    setAiResponse(''); // Reset previous response

    // ------------------------------------------------------------------
    // WICHTIG FÜR IHR LOKALES PROJEKT:
    // Entfernen Sie unten die zwei Schrägstriche (//) vor 'import.meta...', 
    // damit der API-Key aus Ihrer .env Datei geladen wird.
    // ------------------------------------------------------------------
    
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        
    const systemPrompt = `
      Du bist Robin Taggeselle, ein Unternehmensberater für KI-Strategie und Prozessautomatisierung.
      Deine Tonalität ist professionell, empathisch, modern und praxisnah (kein "Gefachsimpel").
      
      Aufgabe:
      Ein potenzieller Kunde (KMU) beschreibt einen manuellen Prozess.
      1. Analysiere kurz das Problem (Erkenne den "Schmerzpunkt").
      2. Schlage eine konkrete, moderne Automatisierungslösung vor (z.B. OCR, Zapier, N8N, Make, KI-Agenten, Datenbank-Verknüpfung).
      3. Schätze grob die Zeitersparnis oder den Sicherheitsgewinn.
      4. Beende mit einem kurzen Satz, der zum Erstgespräch einlädt.
      
      Halte die Antwort kurz (max. 3-4 Sätze) und formatiere sie ansprechend.
      Wenn die Eingabe kein geschäftlicher Prozess ist, antworte höflich und humorvoll, dass du auf Business-Prozesse spezialisiert bist.
    `;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Nutzer-Eingabe: "${processInput}"` }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          }),
        }
      );

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Entschuldigung, ich konnte gerade keine Verbindung zu meiner KI-Datenbank herstellen. Bitte versuchen Sie es gleich noch einmal.";
      setAiResponse(generatedText);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setAiResponse("Es gab einen kleinen technischen Fehler bei der Analyse. Lassen Sie uns das Problem am besten persönlich besprechen!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-sans text-[#333333] bg-white selection:bg-[#8A9A5B] selection:text-white scroll-smooth">
      
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold tracking-tight text-[#333333]">
                ROBIN TAGGESELLE
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#problem" className="text-gray-600 hover:text-[#8A9A5B] transition-colors">Herausforderungen</a>
              <a href="#demo" className="text-[#8A9A5B] font-medium hover:text-[#76854e] transition-colors flex items-center gap-2">
                <Sparkles size={16} /> Live-Demo
              </a>
              <a href="#leistungen" className="text-gray-600 hover:text-[#8A9A5B] transition-colors">Leistungen</a>
              <a href="#ueber-mich" className="text-gray-600 hover:text-[#8A9A5B] transition-colors">Über Mich</a>
              <a href="#kontakt" className="bg-[#8A9A5B] text-white px-6 py-2.5 rounded-lg hover:bg-[#76854e] transition-colors font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Erstgespräch
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-[#8A9A5B]">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#problem" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#8A9A5B] rounded-md">Herausforderungen</a>
              <a href="#demo" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-[#8A9A5B] bg-green-50 rounded-md"><Sparkles size={16} className="inline mr-2"/>Live-Demo</a>
              <a href="#leistungen" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#8A9A5B] rounded-md">Leistungen</a>
              <a href="#ueber-mich" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#8A9A5B] rounded-md">Über Mich</a>
              <a href="#kontakt" onClick={() => setIsMenuOpen(false)} className="block mt-4 px-3 py-3 text-center text-base font-medium bg-[#8A9A5B] text-white rounded-md shadow-md">Erstgespräch vereinbaren</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#8A9A5B] via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:w-2/3">
            <div className="inline-block px-4 py-1.5 mb-6 bg-[#F5F5DC] text-[#6d7a46] rounded-full text-sm font-semibold tracking-wide uppercase">
              Unternehmensberatung für KMU
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[#333333]">
              KI-Strategie und <br/>
              <span className="text-[#8A9A5B]">Prozessautomatisierung</span>,<br/>
              die im Alltag wirklich funktioniert.
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
              Vom manuellen Chaos zu automatisierten Erfolgen: Ich verbinde technische Expertise mit dem Blick für Ihre Mitarbeiter. Für mehr Zeit, Umsatz und Rechtssicherheit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#kontakt" className="inline-flex justify-center items-center px-8 py-4 bg-[#8A9A5B] text-white rounded-xl font-semibold text-lg hover:bg-[#76854e] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Kostenloses Erstgespräch
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <div className="flex items-center gap-2 px-6 py-4 text-sm text-gray-500 bg-gray-50 rounded-xl border border-gray-100">
                <CheckCircle className="h-5 w-5 text-[#8A9A5B]" />
                <span>BAFA-förderfähig</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section id="problem" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Kennen Sie das? <br/>Die Bremser im Tagesgeschäft.</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Viele Unternehmen spüren den Druck der Digitalisierung, wissen aber nicht, wo sie anfangen sollen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Pain Point 1 */}
            <div className="group p-8 rounded-2xl bg-gray-50 hover:bg-[#F5F5DC]/50 transition-colors border border-transparent hover:border-[#8A9A5B]/20 duration-300">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="h-7 w-7 text-[#8A9A5B]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Zeitfresser Routine</h3>
              <p className="text-gray-600 leading-relaxed">
                Sie und Ihr Team verbringen Stunden mit Aufgaben, die eine KI in Minuten erledigen könnte.
              </p>
            </div>

            {/* Pain Point 2 */}
            <div className="group p-8 rounded-2xl bg-gray-50 hover:bg-[#F5F5DC]/50 transition-colors border border-transparent hover:border-[#8A9A5B]/20 duration-300">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldAlert className="h-7 w-7 text-[#8A9A5B]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Unsicherheit & Compliance</h3>
              <p className="text-gray-600 leading-relaxed">
                Welche Tools sind sicher? Wie sieht es mit dem Datenschutz aus? Die Angst vor Fehlern lähmt die Innovation.
              </p>
            </div>

            {/* Pain Point 3 */}
            <div className="group p-8 rounded-2xl bg-gray-50 hover:bg-[#F5F5DC]/50 transition-colors border border-transparent hover:border-[#8A9A5B]/20 duration-300">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-7 w-7 text-[#8A9A5B]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Team-Widerstand</h3>
              <p className="text-gray-600 leading-relaxed">
                "Das haben wir schon immer so gemacht." Mitarbeiter haben Sorge, ersetzt zu werden, statt Technik als Werkzeug zu nutzen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW GEMINI FEATURE SECTION: AI PROCESS CHECK --- */}
      <section id="demo" className="py-20 bg-gradient-to-br from-[#8A9A5B] to-[#76854e] text-white overflow-hidden relative">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-white/20">
              <Sparkles size={16} className="text-yellow-300" />
              <span>Powered by Gemini AI</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Live-Demo: Der Prozess-Check</h2>
            <p className="text-lg text-white/90">
              Probieren Sie es aus: Beschreiben Sie einen nervigen, manuellen Prozess aus Ihrem Arbeitsalltag. <br className="hidden md:inline"/>
              Meine KI-Analyse zeigt Ihnen sofort das Automatisierungspotenzial.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden text-[#333333]">
            <div className="p-1 bg-gray-100 flex items-center gap-2 px-4 border-b border-gray-200">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-xs text-gray-500 font-mono ml-2">robin-ai-assistant.exe</span>
            </div>
            
            <div className="p-6 md:p-8">
              {!showResult ? (
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    Welcher Prozess kostet Sie Zeit?
                  </label>
                  <div className="relative">
                    <textarea 
                      value={processInput}
                      onChange={(e) => setProcessInput(e.target.value)}
                      placeholder="Beispiel: Ich muss jede Woche 50 Rechnungen aus E-Mails herunterladen, die Daten in eine Excel-Tabelle tippen und sie dann an den Steuerberater schicken."
                      className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-[#8A9A5B] focus:ring focus:ring-[#8A9A5B]/20 outline-none transition-all min-h-[120px] resize-none text-gray-700"
                    />
                    <button 
                      onClick={handleAnalyzeProcess}
                      disabled={isLoading || !processInput.trim()}
                      className="absolute bottom-3 right-3 bg-[#8A9A5B] text-white p-2 rounded-lg hover:bg-[#76854e] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 text-center">
                    Ihre Eingabe wird live analysiert. Keine Daten werden dauerhaft gespeichert.
                  </p>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#F5F5DC] flex items-center justify-center flex-shrink-0 border border-[#8A9A5B]">
                      <span className="font-serif font-bold text-[#8A9A5B] text-xl">RT</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Robins Analyse</h4>
                      {isLoading ? (
                        <div className="flex items-center gap-2 text-gray-500">
                          <Loader2 className="animate-spin" size={16} />
                          <span>Analysiere Prozess-Struktur...</span>
                        </div>
                      ) : (
                        <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
                          <p className="whitespace-pre-line">{aiResponse}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {!isLoading && (
                    <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                      <button 
                        onClick={() => { setShowResult(false); setProcessInput(''); }}
                        className="text-sm text-gray-500 hover:text-[#8A9A5B] font-medium"
                      >
                        ← Einen weiteren Prozess prüfen
                      </button>
                      <a 
                        href="#kontakt" 
                        className="text-sm bg-[#333333] text-white px-4 py-2 rounded-lg hover:bg-black transition-colors"
                      >
                        Lösung umsetzen
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section (3 Pillars) */}
      <section id="leistungen" className="py-24 bg-[#F5F5DC]/40 relative">
         {/* Decorative Background Elements */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-[#8A9A5B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8A9A5B]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#8A9A5B] font-semibold tracking-wider uppercase text-sm">Das Leistungsangebot</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Mein Ansatz: Strategie, Umsetzung & Kultur</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kein Bauchladen, sondern eine klare Struktur für Ihre Transformation.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Säule 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-[#8A9A5B] hover:shadow-xl transition-shadow flex flex-col group">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F5F5DC] text-[#8A9A5B] group-hover:scale-110 transition-transform duration-300">
                <BrainCircuit size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">KI-Strategie & Prozess-Architektur</h3>
              <p className="text-sm font-semibold text-[#8A9A5B] uppercase mb-4 tracking-wide">Der Kopf</p>
              <p className="text-gray-600 mb-6 flex-grow">
                Wir analysieren Ihre Wertschöpfungskette und finden die Prozesse, bei denen sich Automatisierung sofort rechnet.
              </p>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start"><CheckCircle size={16} className="mr-2 mt-1 text-[#8A9A5B]" /><span>Analyse von Zeitfressern</span></li>
                <li className="flex items-start"><CheckCircle size={16} className="mr-2 mt-1 text-[#8A9A5B]" /><span>12-Monats-Roadmap</span></li>
                <li className="flex items-start"><CheckCircle size={16} className="mr-2 mt-1 text-[#8A9A5B]" /><span>ROI-Berechnung</span></li>
              </ul>
            </div>

            {/* Säule 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-[#8A9A5B] hover:shadow-xl transition-shadow flex flex-col group">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F5F5DC] text-[#8A9A5B] group-hover:scale-110 transition-transform duration-300">
                <Wrench size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Agile Implementierung & Automation</h3>
              <p className="text-sm font-semibold text-[#8A9A5B] uppercase mb-4 tracking-wide">Die Hand</p>
              <p className="text-gray-600 mb-6 flex-grow">
                Weg von der Theorie, rein in die Praxis. Als zertifizierter Prince2 Agile® Practitioner sorge ich dafür, dass PS auf die Straße kommen.
              </p>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start"><CheckCircle size={16} className="mr-2 mt-1 text-[#8A9A5B]" /><span>Pilotprojekte (Quick Wins)</span></li>
                <li className="flex items-start"><CheckCircle size={16} className="mr-2 mt-1 text-[#8A9A5B]" /><span>Workflow-Automation</span></li>
                <li className="flex items-start"><CheckCircle size={16} className="mr-2 mt-1 text-[#8A9A5B]" /><span>Tool-Audit</span></li>
              </ul>
            </div>

            {/* Säule 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-[#8A9A5B] hover:shadow-xl transition-shadow flex flex-col group">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F5F5DC] text-[#8A9A5B] group-hover:scale-110 transition-transform duration-300">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Change Management & Empowerment</h3>
              <p className="text-sm font-semibold text-[#8A9A5B] uppercase mb-4 tracking-wide">Das Herz</p>
              <p className="text-gray-600 mb-6 flex-grow">
                Die beste KI bringt nichts, wenn das Team sie nicht nutzt. Ich hole Ihre Mitarbeiter ab und nehme Ängste.
              </p>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li className="flex items-start"><CheckCircle size={16} className="mr-2 mt-1 text-[#8A9A5B]" /><span>Nutzungsrichtlinien & Ethik</span></li>
                <li className="flex items-start"><CheckCircle size={16} className="mr-2 mt-1 text-[#8A9A5B]" /><span>Praxisnahe Workshops</span></li>
                <li className="flex items-start"><CheckCircle size={16} className="mr-2 mt-1 text-[#8A9A5B]" /><span>Team-Empowerment</span></li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* About Me */}
      <section id="ueber-mich" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Image Placeholder Area */}
            <div className="lg:w-1/2 relative">
               <div className="absolute top-4 left-4 w-full h-full bg-[#F5F5DC] rounded-2xl z-0"></div>
               <div className="relative z-10 bg-gray-200 rounded-2xl overflow-hidden aspect-[4/5] shadow-lg flex items-center justify-center">
                 {/* Updated with user's imgbb link */}
                 <img 
                    src="https://i.ibb.co/Q7TCnzpk/Selfie-gem-buss.jpg" 
                    alt="Robin Taggeselle" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'; // Hide if image fails to load
                      if (e.currentTarget.nextSibling) {
                        (e.currentTarget.nextSibling as HTMLElement).style.display = 'flex'; // Show fallback
                      }
                    }}
                 />
                 <div className="text-center p-8 absolute inset-0 hidden flex-col items-center justify-center bg-gray-200">
                   <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                     <span className="text-4xl text-gray-500 font-serif">RT</span>
                   </div>
                   <p className="text-gray-500 italic">Bild konnte nicht geladen werden</p>
                 </div>
               </div>
               
               {/* Stats Card */}
               <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl z-20 max-w-xs border-l-4 border-[#8A9A5B]">
                 <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Erfahrung</p>
                 <p className="text-3xl font-bold text-[#333333]">10+ Jahre</p>
                 <p className="text-sm text-gray-600">Führung & Strategie</p>
               </div>
            </div>

            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Aus der Praxis,<br/>nicht aus dem Elfenbeinturm.</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Ich bin <strong>Robin Taggeselle</strong>. Mein Hintergrund ist nicht die bloße Beratungstheorie, sondern das operative Geschäft. Über 10 Jahre habe ich Teams geleitet, Digitalstrategien für bis zu 100 Mitarbeiter verantwortet und Unternehmen durch echte Krisen und Wachstumsphasen gesteuert.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Ich spreche beide Sprachen: Die der IT und die der Geschäftsführung. Mein Anspruch ist es, komplexe Technologie ohne <strong>Technokraten-Sprech</strong> zu erklären und Menschen bei Veränderungen empathisch mitzunehmen.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-[#8A9A5B] mr-4"></div>
                  <span className="font-medium">Zertifizierter KI & Prompt Engineer</span>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                   <div className="w-2 h-2 rounded-full bg-[#8A9A5B] mr-4"></div>
                  <span className="font-medium">Change Management Practitioner (APMG)</span>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                   <div className="w-2 h-2 rounded-full bg-[#8A9A5B] mr-4"></div>
                  <span className="font-medium">Prince2 Agile® Project Management</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Target Groups */}
      <section className="py-24 bg-[#8A9A5B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Maßgeschneidert für den Mittelstand.</h2>
          <p className="text-white/90 text-lg mb-16 max-w-2xl mx-auto">
            Meine Expertise ist branchenübergreifend, aber besonders wertvoll für Unternehmen, die jetzt den Anschluss nicht verlieren wollen.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Gesundheitswesen', 'Handwerk & Bau', 'Dienstleistung & Kanzleien', 'E-Commerce'].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
                <p className="font-semibold text-lg">{item}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 inline-block bg-black/20 px-6 py-3 rounded-full text-sm font-medium">
             💡 Hinweis: Beratungsleistungen sind BAFA-förderfähig.
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="kontakt" className="bg-[#333333] text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Lassen Sie uns Ihre <br/>Prozesse entfesseln.</h2>
              <p className="text-gray-400 text-lg mb-8">
                Vereinbaren Sie jetzt ein unverbindliches Erstgespräch. Wir schauen gemeinsam, wo Ihr größter Hebel liegt.
              </p>
              <div className="flex gap-4">
                <a href="mailto:robin.taggeselle@gmail.com" className="bg-[#8A9A5B] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#76854e] transition-colors">
                  Gespräch vereinbaren
                </a>
              </div>
            </div>
            
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-[#8A9A5B] mr-4" />
                  <span className="text-lg">robin.taggeselle@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-[#8A9A5B] mr-4" />
                  <span className="text-lg">+49 174 6091102</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-[#8A9A5B] mr-4" />
                  <span className="text-lg">Mühlenbecker Land / Berlin / Remote</span>
                </div>
                 <div className="flex items-center pt-4 border-t border-white/10">
                  <Linkedin className="h-6 w-6 text-[#8A9A5B] mr-4" />
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn Profil besuchen</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <div className="mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Robin Taggeselle. Alle Rechte vorbehalten.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Impressum</a>
              <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Website;