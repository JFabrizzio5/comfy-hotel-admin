
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RelayStatusPanel = () => {
  // Generar 30 relevadores (150 habitaciones / 5 puertas por relevador)
  const [relays, setRelays] = useState(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const relayNumber = i + 1;
      const roomsStart = i * 5 + 1;
      const roomsEnd = Math.min((i + 1) * 5, 150);
      const rooms = Array.from({ length: roomsEnd - roomsStart + 1 }, (_, j) => roomsStart + j);
      
      // Simular algunos relevadores con problemas
      const isWorking = Math.random() > 0.1; // 90% funcionando
      
      return {
        id: relayNumber,
        name: `Relevador ${relayNumber}`,
        rooms,
        isWorking,
        lastChecked: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000)
      };
    });
  });

  const toggleRelayStatus = (relayId) => {
    setRelays(prevRelays =>
      prevRelays.map(relay =>
        relay.id === relayId
          ? { ...relay, isWorking: !relay.isWorking, lastChecked: new Date() }
          : relay
      )
    );
  };

  const workingRelays = relays.filter(relay => relay.isWorking).length;
  const totalRelays = relays.length;

  return (
    <div className="space-y-6">
      {/* Resumen General */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Relevadores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRelays}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Funcionando</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{workingRelays}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Con Problemas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalRelays - workingRelays}</div>
          </CardContent>
        </Card>
      </div>

      {/* Estado de Relevadores */}
      <Card>
        <CardHeader>
          <CardTitle>Estado de Relevadores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relays.map((relay) => (
              <div
                key={relay.id}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  relay.isWorking
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm">{relay.name}</h3>
                  <button
                    onClick={() => toggleRelayStatus(relay.id)}
                    className={`w-3 h-3 rounded-full ${
                      relay.isWorking ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                </div>
                
                <div className="text-xs text-gray-600 mb-2">
                  Habitaciones: {relay.rooms.join(', ')}
                </div>
                
                <div className="text-xs text-gray-500">
                  Última verificación: {relay.lastChecked.toLocaleDateString()} {relay.lastChecked.toLocaleTimeString()}
                </div>
                
                <div className={`mt-2 text-xs font-medium ${
                  relay.isWorking ? 'text-green-700' : 'text-red-700'
                }`}>
                  {relay.isWorking ? '✓ Funcionando' : '✗ Con problemas'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RelayStatusPanel;
