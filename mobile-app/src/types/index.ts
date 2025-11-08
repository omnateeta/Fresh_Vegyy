export type Product = {
  id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  freshnessScore: number;
  imageUrl?: string;
  seasonal?: boolean;
  tags?: string[];
};

export type Order = {
  id: string;
  status: string;
  deliveryEta: string;
  liveLocation?: {
    lat: number;
    lng: number;
  };
};


