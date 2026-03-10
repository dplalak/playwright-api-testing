import { uniqueId, uniqueName } from '../utils/data-generator.ts';
import type { PetPayload } from '../types/pet.types';

export const buildPetPayload = (
  overrides: Partial<PetPayload> = {},
): PetPayload => {
  const id = overrides.id ?? uniqueId();

  return {
    id,
    category: overrides.category ?? { id: 1, name: 'dogs' },
    name: overrides.name ?? uniqueName(`api-pet-${id}`),
    photoUrls: overrides.photoUrls ?? ['https://example.com/pet.png'],
    tags: overrides.tags ?? [{ id: 1, name: 'smoke' }],
    status: overrides.status ?? 'available',
  };
};
