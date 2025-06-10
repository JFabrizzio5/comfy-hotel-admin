
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RoomCard from './RoomCard';

const UserDashboard = ({ user, onLogout }) => {
  const userRooms = [
    { id: '101', type: 'Individual', status: 'ocupada', keycard: true, services: ['WiFi', 'TV', 'Minibar'] },
    { id: '205', type: 'Suite', status: 'ocupada', keycard: true, services: ['WiFi', 'TV', 'Minibar', 'Jacuzzi', 'Vista al mar'] }
  ];

  const openRoom = (roomId) => {
    alert(`Abriendo habitación ${roomId}... ¡Bienvenido!`);
  };

  const hotelNews = [
    {
      id: 1,
      title: "Nueva área de spa abierta",
      description: "Disfruta de nuestros nuevos tratamientos relajantes",
      date: "2024-06-08",
      image: "🧖‍♀️"
    },
    {
      id: 2,
      title: "Menú de temporada disponible",
      description: "Prueba nuestros platillos especiales de verano",
      date: "2024-06-07",
      image: "🍽️"
    },
    {
      id: 3,
      title: "Eventos especiales este fin de semana",
      description: "Música en vivo y espectáculos todas las noches",
      date: "2024-06-06",
      image: "🎵"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Hotel Azure</h1>
                <p className="text-sm text-gray-500">Bienvenido, {user.name}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="inicio" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="inicio" className="text-sm font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Inicio
            </TabsTrigger>
            <TabsTrigger value="habitaciones" className="text-sm font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Mis Habitaciones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inicio" className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">¡Bienvenido de vuelta!</h2>
              <p className="text-blue-100">Esperamos que disfrutes tu estancia en Hotel Azure</p>
            </div>

            {/* Noticias y Novedades */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Noticias y Novedades</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotelNews.map((news) => (
                  <div key={news.id} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow duration-200">
                    <div className="text-4xl mb-4">{news.image}</div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{news.title}</h4>
                    <p className="text-gray-600 mb-3">{news.description}</p>
                    <p className="text-sm text-gray-500">{news.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Menú del Hotel */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Menú del Hotel</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Desayuno</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Buffet continental - $25</li>
                    <li>• Huevos benedictinos - $18</li>
                    <li>• Pancakes especiales - $15</li>
                    <li>• Omelette del chef - $16</li>
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Cena</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Salmón a la parrilla - $35</li>
                    <li>• Filete de res - $42</li>
                    <li>• Pasta marinera - $28</li>
                    <li>• Ensalada César - $22</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Servicios del Hotel */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Servicios Disponibles</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-white border hover:shadow-md transition-shadow duration-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Room Service</p>
                </div>

                <div className="text-center p-4 rounded-lg bg-white border hover:shadow-md transition-shadow duration-200">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Spa</p>
                </div>

                <div className="text-center p-4 rounded-lg bg-white border hover:shadow-md transition-shadow duration-200">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Piscina</p>
                </div>

                <div className="text-center p-4 rounded-lg bg-white border hover:shadow-md transition-shadow duration-200">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Restaurante</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="habitaciones" className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{userRooms.length}</p>
                    <p className="text-sm text-gray-600">Habitaciones</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">Activo</p>
                    <p className="text-sm text-gray-600">Estado</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">24/7</p>
                    <p className="text-sm text-gray-600">Soporte</p>
                  </div>
                </div>
              </div>
            </div>

            {/* My Rooms Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Mis Habitaciones</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userRooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    onOpenRoom={openRoom}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
