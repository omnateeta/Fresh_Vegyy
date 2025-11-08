export type Rider = {
  id: string;
  name: string;
  phone: string;
  isOnline: boolean;
};

export type DeliveryOrder = {
  id: string;
  address: string;
  status: string;
  eta: string;
  lat?: number;
  lng?: number;
};


