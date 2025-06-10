
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MaintenanceDashboard = ({ user, onLogout }) => {
  // Estado de las habitaciones para mantenimiento
  const [rooms, setRooms] = useState(() => {
    return Array.from({ length: 150 }, (_, i) => {
      const roomNumber = i + 1;
      const needsCleaning = Math.random() > 0.7; // 30% necesita limpieza
      const isInMaintenance = false;
      
      return {
        id: roomNumber,
        number: roomNumber,
        needsCleaning,
        isInMaintenance,
        lastCleaned: needsCleaning ? null : new Date(Date.now() - Math.random() * 48 * 60 * 60 * 1000)
      };
    });
  });

  const [currentMaintenanceRoom, setCurrentMaintenanceRoom] = useState(null);

  const openDoor = (roomId) => {
    if (currentMaintenanceRoom && currentMaintenanceRoom !== roomId) {
      alert('Ya tienes una habitación en mantenimiento. Termina con ella primero.');
      return;
    }

    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === roomId
          ? { ...room, isInMaintenance: true }
          : room
      )
    );
    setCurrentMaintenanceRoom(roomId);
  };

  const finishMaintenance = (roomId) => {
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === roomId
          ? { 
              ...room, 
              isInMaintenance: false, 
              needsCleaning: false,
              lastCleaned: new Date()
            }
          : room
      )
    );
    setCurrentMaintenanceRoom(null);
  };

  const reopenDoor = (roomId) => {
    if (currentMaintenanceRoom !== roomId) return;
    
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === roomId
          ? { ...room, isInMaintenance: true }
          : room
      )
    );
  };

  const roomsNeedingCleaning = rooms.filter(room => room.needsCleaning && !room.isInMaintenance).length;
  const roomsInMaintenance = rooms.filter(room => room.isInMaintenance).length;
  const roomsCleaned = rooms.filter(room => !room.needsCleaning && room.lastCleaned).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Panel de Mantenimiento</h1>
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
        {/* Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Necesitan Limpieza</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{roomsNeedingCleaning}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">En Mantenimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{roomsInMaintenance}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Limpias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{roomsCleaned}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Habitaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">150</div>
            </CardContent>
          </Card>
        </div>

        {/* Habitación en Mantenimiento Actual */}
        {currentMaintenanceRoom && (
          <Card className="mb-8 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-800">Habitación en Mantenimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800">
                    Habitación #{currentMaintenanceRoom}
                  </h3>
                  <p className="text-yellow-700">Actualmente en proceso de limpieza</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => finishMaintenance(currentMaintenanceRoom)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Terminar Mantenimiento
                  </button>
                  <button
                    onClick={() => reopenDoor(currentMaintenanceRoom)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Volver a Abrir Puerta
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de Habitaciones */}
        <Card>
          <CardHeader>
            <CardTitle>Estado de Habitaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                    room.isInMaintenance
                      ? 'border-yellow-300 bg-yellow-100'
                      : room.needsCleaning
                      ? 'border-red-300 bg-red-100'
                      : 'border-green-300 bg-green-100'
                  }`}
                >
                  <div className="font-semibold text-sm mb-1">#{room.number}</div>
                  
                  {room.isInMaintenance ? (
                    <div className="text-xs text-yellow-700 mb-2">En mantenimiento</div>
                  ) : room.needsCleaning ? (
                    <div className="text-xs text-red-700 mb-2">Necesita limpieza</div>
                  ) : (
                    <div className="text-xs text-green-700 mb-2">Limpia</div>
                  )}
                  
                  {room.needsCleaning && !room.isInMaintenance && (
                    <button
                      onClick={() => openDoor(room.id)}
                      disabled={currentMaintenanceRoom && currentMaintenanceRoom !== room.id}
                      className="text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded transition-colors duration-200"
                    >
                      Abrir
                    </button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MaintenanceDashboard;
