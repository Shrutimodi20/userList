import React, { useState, useEffect } from 'react';
import { User, Search, Moon, Sun, ChevronDown, ChevronUp, MapPin, Mail, Phone, Briefcase } from 'lucide-react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [animateEntry, setAnimateEntry] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        setUsers(data.users);
        setLoading(false);
        
        // Trigger entry animation after a short delay
        setTimeout(() => {
          setAnimateEntry(true);
        }, 100);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Sort users based on selected sort option
  const sortedUsers = [...(users || [])].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.firstName.localeCompare(b.firstName);
      case 'age':
        return a.age - b.age;
      case 'company':
        return (a.company?.name || '').localeCompare(b.company?.name || '');
      default:
        return 0;
    }
  });

  const filteredUsers = sortedUsers.filter(user => 
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin border-purple-500"></div>
            <div className="absolute inset-2 border-4 border-t-transparent border-l-transparent border-r-transparent rounded-full animate-spin border-blue-500 animation-delay-200"></div>
            <div className="absolute inset-4 border-4 border-t-transparent border-b-transparent border-r-transparent rounded-full animate-spin border-pink-500 animation-delay-300"></div>
          </div>
          <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Loading users data...</p>
        </div>
      </div>
    );
  }

  const getRandomGradient = (id) => {
    const gradients = [
      'from-pink-500 to-purple-500',
      'from-blue-500 to-teal-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-amber-500',
      'from-indigo-500 to-blue-500',
      'from-red-500 to-pink-500',
    ];
    return gradients[id % gradients.length];
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold relative overflow-hidden">
            <span className="animate-slide-in-right inline-block">Interactive</span>
            &nbsp;
            <span className="animate-slide-in-left inline-block">User Directory</span>
            <div className={`h-1 w-full ${darkMode ? 'bg-purple-500' : 'bg-purple-700'} mt-1 animate-width`}></div>
          </h1>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-200'}`}
          >
            {darkMode ? <Sun className="h-5 w-5 text-yellow-300" /> : <Moon className="h-5 w-5 text-gray-700" />}
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
            <input
              type="text"
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="name">Sort by Name</option>
              <option value="age">Sort by Age</option>
              <option value="company">Sort by Company</option>
            </select>
            
            <div className="flex border rounded-lg overflow-hidden">
              <button 
                onClick={() => setViewMode('grid')} 
                className={`px-4 py-2 transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-purple-600 text-white' 
                    : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
                }`}
              >
                Grid
              </button>
              <button 
                onClick={() => setViewMode('list')} 
                className={`px-4 py-2 transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-purple-600 text-white' 
                    : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className={`p-8 rounded-lg shadow-md text-center animate-fadeIn ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="mx-auto w-24 h-24 relative">
              <div className="absolute inset-0 rounded-full bg-red-100 animate-ping opacity-20"></div>
              <div className="relative flex items-center justify-center w-full h-full rounded-full bg-red-50">
                <svg className="w-12 h-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className={`text-lg font-medium mt-4 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>No users found</h3>
            <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
            {filteredUsers.map((user, index) => (
              <div
                key={user.id}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg overflow-hidden shadow-md transition-all duration-300 ${
                  animateEntry ? 'animate-fade-slide-up' : 'opacity-0'
                } ${
                  selectedUser?.id === user.id 
                    ? 'ring-2 ring-purple-500 transform scale-102 z-10' 
                    : 'hover:shadow-xl hover:-translate-y-1'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedUser(selectedUser?.id === user.id ? null : user)}
              >
                <div className="flex p-4">
                  <div className="relative w-16 h-16 mr-4 flex-shrink-0 overflow-hidden">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getRandomGradient(user.id)} animate-pulse-slow`}></div>
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="relative w-full h-full rounded-full object-cover border-2 border-white shadow-inner transform hover:scale-110 transition-transform"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/api/placeholder/100/100";
                        }}
                      />
                    ) : (
                      <div className="relative w-full h-full rounded-full bg-purple-100 flex items-center justify-center">
                        <User className="h-8 w-8 text-purple-500" />
                      </div>
                    )}
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full transform ${
                      user.role === 'admin' ? 'bg-purple-500 animate-ping-slow' : 'bg-green-500'
                    }`}></span>
                  </div>
                  <div className="flex-1">
                    <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                      {`${user.firstName} ${user.lastName}`}
                    </h2>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Mail className="inline-block w-3 h-3 mr-1" />
                      {user.email}
                    </p>
                    <div className="flex items-center mt-1 text-xs">
                      <span className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Briefcase className="inline-block w-3 h-3 mr-1" />
                        {user.company?.name || 'Not specified'}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full ${
                        darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {user.company?.title || 'No title'}
                      </span>
                    </div>
                  </div>
                  <div className="self-center">
                    {selectedUser?.id === user.id ? 
                      <ChevronUp className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} /> : 
                      <ChevronDown className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    }
                  </div>
                </div>

                {selectedUser?.id === user.id && (
                  <div className={`p-4 border-t animate-expand-vertical origin-top ${
                    darkMode ? 'bg-gray-900 border-gray-700' : 'bg-purple-50 border-purple-100'
                  }`}>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Age</p>
                        <p className="font-medium">{user.age}</p>
                      </div>
                      <div>
                        <p className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Gender</p>
                        <p className="font-medium capitalize">{user.gender}</p>
                      </div>
                      <div>
                        <p className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Phone</p>
                        <p className="font-medium flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {user.phone}
                        </p>
                      </div>
                      <div>
                        <p className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Department</p>
                        <p className="font-medium">{user.company?.department || 'N/A'}</p>
                      </div>
                      <div className="col-span-2">
                        <p className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Address</p>
                        <p className="font-medium flex items-center">
                          <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                          {`${user.address?.address || ''}, ${user.address?.city || ''}, ${user.address?.state || ''} ${user.address?.postalCode || ''}`}
                        </p>
                      </div>
                      
                      <div className="col-span-2 mt-2">
                        <div className={`h-1 w-full rounded overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-width"
                            style={{ width: `${(user.age / 100) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>Age indicator</span>
                          <span>{user.age}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;