export type ShipmentStatus = 'pending' | 'in_transit' | 'delivered' | 'failed';

export type Role = 'admin' | 'user';

export interface Shipment {
  id: string;
  tracking_number: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  role: Role;
  avatar_url: string | null;
  company: string | null;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[] | null;
  count: number;
  error: string | null;
}

export interface SessionUser {
  id: string;
  email: string;
  role: Role;
  full_name: string | null;
  avatar_url: string | null;
}

export interface ExtendedSession {
  user: SessionUser;
  expires: string;
}
