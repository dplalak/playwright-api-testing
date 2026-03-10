import { test, expect } from '../../fixtures/api.fixture';
import { buildPetPayload } from '../../factories/pet.factory';

test.describe('Get pet by status tests', () => {
  test.afterEach(async ({ cleanupPets }) => {
    await cleanupPets();
  });

  test('Should find a pet by status', { tag: ['@smoke'] }, async ({ petApi, registerPetForCleanup }) => {
    const newPet = buildPetPayload({ status: 'available' });
    registerPetForCleanup(newPet.id);
    await petApi.expectJson(await petApi.createPet(newPet), 200);

    const searchResponse = await petApi.findPetsByStatus('available');
    const pets = await petApi.expectJson(searchResponse, 200);
    expect(pets.some((pet: { id: number }) => pet.id === newPet.id)).toBeTruthy();
  });
});
