import { test, expect } from '../../fixtures/api.fixture';
import { buildPetPayload } from '../../factories/pet.factory';

test.describe('Update pet tests', () => {
  test.afterEach(async ({ cleanupPets }) => {
    await cleanupPets();
  });

  test('Should update existing pet details', { tag: ['@smoke'] }, async ({ petApi, registerPetForCleanup }) => {
    const newPet = buildPetPayload({ status: 'pending' });
    registerPetForCleanup(newPet.id);
    await petApi.expectJson(await petApi.createPet(newPet), 200);

    const updatedPetPayload = {
      ...newPet,
      name: `${newPet.name}-updated`,
      status: 'sold' as const,
    };

    const updateResponse = await petApi.updatePet(updatedPetPayload);
    const updatedPet = await petApi.expectJson(updateResponse, 200);

    expect(updatedPet.name).toBe(updatedPetPayload.name);
    expect(updatedPet.status).toBe('sold');

    const getResponse = await petApi.getPetById(newPet.id);
    const fetchedPet = await petApi.expectJson(getResponse, 200);
    expect(fetchedPet.name).toBe(updatedPetPayload.name);
    expect(fetchedPet.status).toBe('sold');
  });
});
