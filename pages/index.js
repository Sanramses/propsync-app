import React, { useState, useEffect } from 'react';
import { Search, MapPin, Bed, Bath, Square, Phone, Mail, Star, Filter, X, Menu, Home, Building, TreePine, Warehouse } from 'lucide-react';

// Date demo pentru proprietăți
const PROPERTIES_DATA = [
  {
    id: 1,
    title: "Apartament 3 camere modern",
    price: 95000,
    location: "București, Sector 2",
    bedrooms: 3,
    bathrooms: 2,
    area: 78,
    type: "apartament",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop",
    features: ["Parcare", "Balcon", "Centrală proprie"],
    description: "Apartament modern cu finisaje de calitate, situat într-o zonă liniștită cu acces facil la transport public."
  },
  {
    id: 2,
    title: "Casă cu grădină",
    price: 180000,
    location: "Ilfov, Otopeni",
    bedrooms: 4,
    bathrooms: 3,
    area: 120,
    type: "casa",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=300&fit=crop",
    features: ["Grădină", "Garaj", "Șemineu"],
    description: "Casă spațioasă cu grădină mare, perfectă pentru familie. Zona foarte liniștită și sigură."
  },
  {
    id: 3,
    title: "Penthouse cu terasă",
    price: 250000,
    location: "București, Sector 1",
    bedrooms: 4,
    bathrooms: 3,
    area: 150,
    type: "penthouse",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=300&fit=crop",
    features: ["Terasă mare", "Vedere panoramică", "Lift"],
    description: "Penthouse exclusivist cu terasă generoasă și vedere spectaculoasă asupra orașului."
  },
  {
    id: 4,
    title: "Apartament 2 camere central",
    price: 75000,
    location: "Cluj-Napoca, Centru",
    bedrooms: 2,
    bathrooms: 1,
    area: 55,
    type: "apartament",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop",
    features: ["Zonă centrală", "Renovat recent", "Mobilat"],
    description: "Apartament complet renovat în centrul Clujului, ideal pentru tineri profesioniști."
  },
  {
    id: 5,
    title: "Vilă de lux",
    price: 450000,
    location: "București, Pipera",
    bedrooms: 5,
    bathrooms: 4,
    area: 200,
    type: "casa",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&h=300&fit=crop",
    features: ["Piscină", "Grădină mare", "Sistem securitate"],
    description: "Vilă de lux cu toate facilitățile moderne, situată în zona exclusivistă Pipera."
  },
  {
    id: 6,
    title: "Studio modern",
    price: 45000,
    location: "Timișoara, Sagului",
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
    type: "studio",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=300&fit=crop",
    features: ["Mobilat complet", "Zonă nouă", "Parcare"],
    description: "Studio modern perfect pentru studenți sau tineri profesioniști, complet mobilat."
  }
];

const CITIES = ["București", "Cluj-Napoca", "Timișoara", "Iași", "Constanța", "Brașov"];
const PROPERTY_TYPES = [
  { value: "apartament", label: "Apartament", icon: Building },
  { value: "casa", label: "Casă", icon: Home },
  { value: "penthouse", label: "Penthouse", icon: Building },
  { value: "studio", label: "Studio", icon: Warehouse },
  { value: "teren", label: "Teren", icon: TreePine }
];

function ImoSyncApp() {
  const [properties, setProperties] = useState(PROPERTIES_DATA);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    city: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filterProperties = () => {
    let filtered = PROPERTIES_DATA;

    if (searchTerm) {
      filtered = filtered.filter(prop => 
        prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.type) {
      filtered = filtered.filter(prop => prop.type === filters.type);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(prop => prop.price >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(prop => prop.price <= parseInt(filters.maxPrice));
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(prop => prop.bedrooms >= parseInt(filters.bedrooms));
    }

    if (filters.city) {
      filtered = filtered.filter(prop => prop.location.includes(filters.city));
    }

    setProperties(filtered);
  };

  useEffect(() => {
    filterProperties();
  }, [searchTerm, filters]);

  const PropertyCard = ({ property }) => (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => setSelectedProperty(property)}
    >
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {property.price.toLocaleString('ro-RO')} €
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span>{property.bedrooms} cam</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span>{property.bathrooms} băi</span>
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            <span>{property.area} m²</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {property.features.slice(0, 2).map((feature, idx) => (
            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const PropertyModal = ({ property, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={property.image} 
            alt={property.title}
            className="w-full h-64 object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-bold">
            {property.price.toLocaleString('ro-RO')} €
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{property.title}</h2>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{property.location}</span>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Bed className="w-6 h-6 mx-auto mb-1 text-blue-600" />
              <div className="text-sm text-gray-600">Camere</div>
              <div className="font-semibold">{property.bedrooms}</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Bath className="w-6 h-6 mx-auto mb-1 text-blue-600" />
              <div className="text-sm text-gray-600">Băi</div>
              <div className="font-semibold">{property.bathrooms}</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Square className="w-6 h-6 mx-auto mb-1 text-blue-600" />
              <div className="text-sm text-gray-600">Suprafață</div>
              <div className="font-semibold">{property.area} m²</div>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Descriere</h3>
            <p className="text-gray-600 leading-relaxed">{property.description}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Facilități</h3>
            <div className="flex flex-wrap gap-2">
              {property.features.map((feature, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-3">Contact pentru vizionare</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                <Phone className="w-5 h-5 mr-2" />
                Sună acum: 0721.123.456
              </button>
              <button className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                <Mail className="w-5 h-5 mr-2" />
                Trimite email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                <Home className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">ImoSync</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-blue-600 font-medium">Acasă</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Proprietăți</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Servicii</a>
              <a href="/social-media" className="text-gray-600 hover:text-blue-600">Social Media</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
            </nav>
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <nav className="px-4 py-2 space-y-2">
            <a href="#" className="block py-2 text-blue-600 font-medium">Acasă</a>
            <a href="#" className="block py-2 text-gray-600">Proprietăți</a>
            <a href="#" className="block py-2 text-gray-600">Servicii</a>
            <a href="/social-media" className="text-gray-600 hover:text-blue-600">Social Media</a>
            <a href="#" className="block py-2 text-gray-600">Contact</a>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Găsește casa perfectă pentru tine
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Cea mai mare selecție de proprietăți în România
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg p-4 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Caută după locație sau tip proprietate..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filtre
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <select 
                className="border border-gray-300 rounded-lg px-3 py-2"
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
              >
                <option value="">Tip proprietate</option>
                {PROPERTY_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              
              <select 
                className="border border-gray-300 rounded-lg px-3 py-2"
                value={filters.city}
                onChange={(e) => setFilters({...filters, city: e.target.value})}
              >
                <option value="">Oraș</option>
                {CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              
              <input
                type="number"
                placeholder="Preț minim (€)"
                className="border border-gray-300 rounded-lg px-3 py-2"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              />
              
              <input
                type="number"
                placeholder="Preț maxim (€)"
                className="border border-gray-300 rounded-lg px-3 py-2"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              />
              
              <select 
                className="border border-gray-300 rounded-lg px-3 py-2"
                value={filters.bedrooms}
                onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
              >
                <option value="">Camere</option>
                <option value="1">1+ camere</option>
                <option value="2">2+ camere</option>
                <option value="3">3+ camere</option>
                <option value="4">4+ camere</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Properties Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Proprietăți disponibile ({properties.length})
            </h2>
          </div>
          
          {properties.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Nu am găsit proprietăți</h3>
              <p className="text-gray-500">Încearcă să modifici criteriile de căutare</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">De ce să alegi ImoSync?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Experiență vastă</h3>
              <p className="text-gray-600">Peste 10 ani de experiență în piața imobiliară românească</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Căutare avansată</h3>
              <p className="text-gray-600">Filtre detaliate pentru a găsi exact ce cauți</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Suport 24/7</h3>
              <p className="text-gray-600">Echipa noastră este mereu disponibilă pentru tine</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">ImoSync</h3>
              </div>
              <p className="text-gray-300">
                Platforma ta de încredere pentru găsirea proprietății perfecte în România
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legături rapide</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Acasă</a></li>
                <li><a href="#" className="hover:text-white">Proprietăți</a></li>
                <li><a href="#" className="hover:text-white">Servicii</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Orașe</h4>
              <ul className="space-y-2 text-gray-300">
                {CITIES.slice(0, 5).map(city => (
                  <li key={city}><a href="#" className="hover:text-white">{city}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>0721.123.456</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>contact@ImoSync.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>București, România</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 ImoSync. Toate drepturile rezervate.</p>
          </div>
        </div>
      </footer>

      {/* Property Modal */}
      {selectedProperty && (
        <PropertyModal 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}
    </div>
  );
}

export default ImoSyncApp;
