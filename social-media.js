import React, { useState } from 'react';
import { Copy, Facebook, Instagram, Linkedin, MessageCircle, Megaphone, Sparkles, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const SocialMediaGenerator = () => {
  const [propertyData, setPropertyData] = useState({
    title: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    type: 'apartament',
    features: '',
    description: ''
  });

  const [generatedContent, setGeneratedContent] = useState({});
  const [selectedPlatform, setSelectedPlatform] = useState('facebook');

  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-pink-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' },
    { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: 'bg-green-500' },
    { id: 'ads', name: 'Google Ads', icon: Megaphone, color: 'bg-red-500' }
  ];

  const generateContent = () => {
    const { title, price, location, bedrooms, bathrooms, area, type, features, description } = propertyData;
    
    const content = {
      facebook: `🏠 ${title}

💰 Preț: ${price} €
📍 Locație: ${location}
🛏️ ${bedrooms} camere | 🚿 ${bathrooms} băi | 📐 ${area} m²

✨ Caracteristici speciale:
${features.split(',').map(f => `• ${f.trim()}`).join('\n')}

${description}

Sună acum pentru o vizionare! 📞
Contact: 0721.123.456

#imobiliare #${location.toLowerCase().replace(/\s+/g, '')} #${type} #proprietati #ImoSync`,

      instagram: `✨ ${title} ✨

💎 ${price} € 
📍 ${location}
🏠 ${bedrooms} cam • ${bathrooms} băi • ${area} m²

${description}

${features.split(',').slice(0, 3).map(f => `#${f.trim().toLowerCase().replace(/\s+/g, '')}`).join(' ')} #imobiliare #${type} #${location.toLowerCase().replace(/\s+/g, '')} #casa #apartament #proprietati #vanzare #bucuresti #cluj #timisoara #imosync #realestate #home #dreamhome`,

      linkedin: `🏠 Oportunitate de investiție: ${title}

Prezentăm o proprietate excepțională în ${location}, perfectă pentru cumpărătorii care caută calitate și confort.

📊 Detalii tehnice:
- Preț: ${price} €
- Suprafață: ${area} m²
- Configurație: ${bedrooms} camere, ${bathrooms} băi
- Tip: ${type}

🔑 Avantaje principale:
${features.split(',').map(f => `• ${f.trim()}`).join('\n')}

${description}

Pentru mai multe detalii și programarea unei vizionări, contactați-ne la 0721.123.456.

#ImobiliareProfesionale #InvestitiiImobiliare #${location.replace(/\s+/g, '')} #ImoSync`,

      whatsapp: `🏠 *${title}*

💰 *${price} €*
📍 ${location}
🛏️ ${bedrooms} camere | 🚿 ${bathrooms} băi | 📐 ${area} m²

✨ *Caracteristici:*
${features.split(',').map(f => `• ${f.trim()}`).join('\n')}

${description}

Programează o vizionare! 📅
Răspund rapid la mesaje 💬`,

      ads: `${title} - ${price} € | ${location}

${bedrooms} camere, ${bathrooms} băi, ${area} m². ${features.split(',').slice(0, 2).join(', ')}. ${description.substring(0, 100)}... Sună acum: 0721.123.456`
    };

    setGeneratedContent(content);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Text copiat în clipboard!');
  };

  const propertyTypes = [
    { value: 'apartament', label: 'Apartament' },
    { value: 'casa', label: 'Casă' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'studio', label: 'Studio' },
    { value: 'vila', label: 'Vilă' },
    { value: 'teren', label: 'Teren' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 mr-6">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Înapoi la proprietăți
              </Link>
              <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">ImoSync</h1>
                <p className="text-sm text-gray-600">Generator Social Media</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Generator Descrieri Social Media</h2>
          <p className="text-gray-600">Creează descrieri perfecte pentru proprietățile tale pe toate canalele sociale</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Detalii Proprietate</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titlu proprietate</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ex: Apartament 3 camere modern"
                  value={propertyData.title}
                  onChange={(e) => setPropertyData({...propertyData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preț (€)</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="95.000"
                    value={propertyData.price}
                    onChange={(e) => setPropertyData({...propertyData, price: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tip proprietate</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={propertyData.type}
                    onChange={(e) => setPropertyData({...propertyData, type: e.target.value})}
                  >
                    {propertyTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Locație</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="București, Sector 2"
                  value={propertyData.location}
                  onChange={(e) => setPropertyData({...propertyData, location: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Camere</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="3"
                    value={propertyData.bedrooms}
                    onChange={(e) => setPropertyData({...propertyData, bedrooms: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Băi</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2"
                    value={propertyData.bathrooms}
                    onChange={(e) => setPropertyData({...propertyData, bathrooms: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Suprafață (m²)</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="78"
                    value={propertyData.area}
                    onChange={(e) => setPropertyData({...propertyData, area: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caracteristici (separate prin virgulă)</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Parcare, Balcon, Centrală proprie, Finisaje premium"
                  value={propertyData.features}
                  onChange={(e) => setPropertyData({...propertyData, features: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descriere scurtă</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Apartament modern cu finisaje de calitate, situat într-o zonă liniștită cu acces facil la transport public."
                  value={propertyData.description}
                  onChange={(e) => setPropertyData({...propertyData, description: e.target.value})}
                />
              </div>

              <button
                onClick={generateContent}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Generează Descrieri
              </button>
            </div>
          </div>

          {/* Generated Content */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Conținut Generat</h3>
            
            {/* Platform Selector */}
            <div className="flex flex-wrap gap-2 mb-6">
              {platforms.map(platform => {
                const Icon = platform.icon;
                return (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`flex items-center px-3 py-2 rounded-lg text-white text-sm font-medium transition-all ${
                      selectedPlatform === platform.id 
                        ? platform.color + ' shadow-lg transform scale-105' 
                        : 'bg-gray-400 hover:bg-gray-500'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {platform.name}
                  </button>
                );
              })}
            </div>

            {/* Generated Content Display */}
            {generatedContent[selectedPlatform] && (
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-gray-800">
                    {platforms.find(p => p.id === selectedPlatform)?.name}
                  </h4>
                  <button
                    onClick={() => copyToClipboard(generatedContent[selectedPlatform])}
                    className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copiază
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                    {generatedContent[selectedPlatform]}
                  </pre>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Caractere: {generatedContent[selectedPlatform].length}
                </div>
              </div>
            )}

            {!Object.keys(generatedContent).length && (
              <div className="text-center py-12 text-gray-500">
                <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Completează detaliile proprietății și apasă "Generează Descrieri" pentru a vedea rezultatele</p>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-4">💡 Sfaturi pentru Social Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Facebook</h4>
              <p className="text-gray-600">Folosește emojis, detalii complete și call-to-action clar. Ideal: 80-100 cuvinte.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-pink-700 mb-2">Instagram</h4>
              <p className="text-gray-600">Hashtag-uri relevante (max 30), description scurtă, emojis. Focus pe visual.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-blue-700 mb-2">LinkedIn</h4>
              <p className="text-gray-600">Ton profesional, detalii tehnice, beneficii de investiție. Fără prea multe emojis.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaGenerator;
