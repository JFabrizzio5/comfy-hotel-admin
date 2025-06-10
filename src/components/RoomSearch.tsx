
import React, { useState, useMemo } from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const RoomSearch = ({ rooms, onUnlinkRoom }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 12;

  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      const matchesSearch = room.id.toString().includes(searchTerm) || 
                           (room.guest && room.guest.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [rooms, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);
  const startIndex = (currentPage - 1) * roomsPerPage;
  const currentRooms = filteredRooms.slice(startIndex, startIndex + roomsPerPage);

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
    <div>
      {/* Filtros de búsqueda */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por número de habitación o huésped..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="all">Todos los estados</option>
              <option value="ocupada">Ocupada</option>
              <option value="disponible">Disponible</option>
              <option value="mantenimiento">Mantenimiento</option>
              <option value="reservada">Reservada</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de habitaciones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {currentRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">#{room.id}</h3>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(room.status)}`}>
                {room.status}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Tipo:</span> {room.type}
              </p>
              {room.guest && (
                <>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Huésped:</span> {room.guest}
                  </p>
                  <button
                    onClick={() => onUnlinkRoom(room.id)}
                    className="w-full mt-2 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200 text-sm font-medium"
                  >
                    Desvincular Huésped
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              if (totalPages <= 5) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              // Para más de 5 páginas, mostrar lógica más compleja
              return null;
            })}
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Información de resultados */}
      <div className="mt-4 text-sm text-gray-600 text-center">
        Mostrando {startIndex + 1}-{Math.min(startIndex + roomsPerPage, filteredRooms.length)} de {filteredRooms.length} habitaciones
      </div>
    </div>
  );
};

export default RoomSearch;
