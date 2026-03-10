export type PetStatus = 'available' | 'pending' | 'sold';

export interface PetPayload {
  id: number;
  category: { id: number; name: string };
  name: string;
  photoUrls: string[];
  tags: Array<{ id: number; name: string }>;
  status: PetStatus;
}
