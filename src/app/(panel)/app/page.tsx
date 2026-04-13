'use client';

import { useState } from 'react';
import { useShipments } from '@/hooks/useShipments';
import { ShipmentFilters } from '@/components/shipments/ShipmentFilters';
import { ShipmentsTable } from '@/components/shipments/ShipmentsTable';
import { ShipmentForm } from '@/components/shipments/ShipmentForm';
import type { ShipmentStatus, Shipment } from '@/types';
import type { ShipmentInput } from '@/lib/validations';

export default function ShipmentsPage() {
  const [status, setStatus] = useState<ShipmentStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);

  const {
    shipments,
    loading,
    error,
    totalCount,
    createShipment,
    updateShipment,
    deleteShipment,
  } = useShipments({ status, search, page });

  // For MVP, assume admin role - in production this comes from session
  const isAdmin = true; // TODO: Get from session

  async function handleCreate(data: ShipmentInput) {
    const success = await createShipment(data);
    return success;
  }

  return (
    <div className="space-y-4">
      <ShipmentFilters
        onSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        onStatusChange={(newStatus) => {
          setStatus(newStatus);
          setPage(1);
        }}
        onAdd={() => setFormOpen(true)}
        isAdmin={isAdmin}
      />

      <ShipmentsTable
        shipments={shipments}
        loading={loading}
        error={error}
        isAdmin={isAdmin}
        onCreate={handleCreate}
        onUpdate={updateShipment}
        onDelete={deleteShipment}
      />

      <ShipmentForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleCreate}
        initialData={null}
      />
    </div>
  );
}
