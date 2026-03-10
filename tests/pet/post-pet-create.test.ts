import { test, expect } from '../../fixtures/api.fixture';
import { buildPetPayload } from '../../factories/pet.factory';

test.describe('Create pet tests', () => {
  test.afterEach(async ({ cleanupPets }) => {
    await cleanupPets();
  });

  test('Should create a new pet', { tag: ['@smoke'] }, async ({ petApi, registerPetForCleanup }) => {
    const newPet = buildPetPayload({ status: 'available' });
    registerPetForCleanup(newPet.id);

    const createResponse = await petApi.createPet(newPet);
    const createdPet = await petApi.expectJson(createResponse, 200);

    expect(createdPet.id).toBe(newPet.id);
    expect(createdPet.name).toBe(newPet.name);
    expect(createdPet.status).toBe('available');
  });
});
