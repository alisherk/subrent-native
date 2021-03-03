export interface Rental {
  [index: number]: { id: string };
  id: string;
  name: string;
  image: string;
  category: string;
  full_day_price: string;
  half_day_price: string;
  description: string;
  region: string;
  delivery: string;
  ownerImage: string;
  ownerUid: string;
  displayName: string;
  instructions: string;
  confirmation_required: string;
  g: { geopoint: { U: number; k: number } };
  expoToken: string;
}

export type Message = {
  id?: string;
  author: string;
  authorUid: string;
  authorImage: string | null;
  rentalId: string;
  rentalName: string;
  expoToken: string | null; 
  text: string;
  date: any;
};


