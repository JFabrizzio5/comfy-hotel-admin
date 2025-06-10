
import React, { useState } from 'react';
import UserModal from './UserModal';
import RoomSearch from './RoomSearch';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('users');
  const [showUserModal, setShowUserModal] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan@hotel.com', active: true, room: '101' },
    { id: 2, name: 'María García', email: 'maria@hotel.com', active: true, room: '205' },
    { id: 3, name: 'Carlos López', email: 'carlos@hotel.com', active: false, room: '301' },
  ]);

  // Generar 150 habitaciones
  const [rooms, setRooms] = useState(() => {
    return Array.from({ length: 150 }, (_, i) => {
      const roomNumber = 100 + i + 1;
      const type = roomNumber < 130 ? 'Individual' : roomNumber < 145 ? 'Doble' : 'Suite';
      
      // Asignar algunos huéspedes aleatoriamente
      let status = 'disponible';
      let guest = null;
      
      if (roomNumber === 101) {
        status = 'ocupada';
        guest = 'Juan Pérez';
      } else if (roomNumber === 205) {
        status = 'ocupada';
        guest = 'María García';
      } else if (roomNumber === 301) {
        status = 'reservada';
        guest = 'Carlos López';
      } else if (roomNumber % 10 === 0) {
        status = 'mantenimiento';
      } else if (roomNumber % 7 === 0) {
        status = 'ocupada';
        guest = `Huésped ${Math.floor(Math.random() * 100)}`;
      }
      
      return {
        id: roomNumber,
        status,
        guest,
        type
      };
    });
  });

  const toggleUserStatus = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, active: !u.active } : u));
  };

  const addUser = (newUser) => {
    setUsers([...users, { ...newUser, id: Date.now() }]);
  };

  const unlinkRoom = (roomId) => {
    setRooms(prevRooms => 
      prevRooms.map(room => 
        room.id === roomId 
          ? { ...room, status: 'disponible', guest: null }
          : room
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ocupada': return 'bg-red-100 text-red-800';
      case 'disponible': return 'bg-green-100 text-green-800';
      case 'mantenimiento': return 'bg-yellow-100 text-yellow-800';
      case 'reservada': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Panel Administrador</h1>
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

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Gestión de Usuarios
            </button>
            <button
              onClick={() => setActiveTab('rooms')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rooms'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Gestión de Habitaciones
            </button>
          </nav>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'users' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <h2 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
              <button
                onClick={() => setShowUserModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Nuevo Usuario
              </button>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Habitación
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.room}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.active ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => toggleUserStatus(user.id)}
                            className={`inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md ${
                              user.active
                                ? 'text-red-700 bg-red-100 hover:bg-red-200'
                                : 'text-green-700 bg-green-100 hover:bg-green-200'
                            } transition-colors duration-200`}
                          >
                            {user.active ? 'Desactivar' : 'Activar'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rooms' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestión de Habitaciones</h2>
            <RoomSearch rooms={rooms} onUnlinkRoom={unlinkRoom} />
          </div>
        )}
      </div>

      {showUserModal && (
        <UserModal
          onClose={() => setShowUserModal(false)}
          onSave={addUser}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
