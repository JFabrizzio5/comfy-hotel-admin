
import React, { useState } from 'react';

const LinkGuestModal = ({ room, users, onClose, onLink }) => {
  const [selectedUserId, setSelectedUserId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUserId) {
      const selectedUser = users.find(u => u.id.toString() === selectedUserId);
      if (selectedUser) {
        onLink(room.id, selectedUser);
        onClose();
      }
    }
  };

  // Filtrar usuarios activos que no tienen habitación asignada
  const availableUsers = users.filter(user => 
    user.active && (!user.room || user.room === '')
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Vincular Huésped - Habitación #{room.id}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-4">
              Tipo de habitación: <span className="font-medium">{room.type}</span>
            </p>
            
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar Huésped
            </label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              required
            >
              <option value="">Seleccionar huésped disponible</option>
              {availableUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} - {user.email}
                </option>
              ))}
            </select>
            
            {availableUsers.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">
                No hay huéspedes disponibles sin habitación asignada.
              </p>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!selectedUserId}
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Vincular Huésped
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkGuestModal;
