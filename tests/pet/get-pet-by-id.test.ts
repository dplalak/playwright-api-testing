import { test, expect } from '../../fixtures/api.fixture';
import { buildPetPayload } from '../../factories/pet.factory';

test.describe('Get pet by id tests', () => {
  test.afterEach(async ({ cleanupPets }) => {
    await cleanupPets();
  });

  test('Should return existing pet by id', { tag: ['@smoke'] }, async ({ petApi, registerPetForCleanup }) => {
    const newPet = buildPetPayload();
    registerPetForCleanup(newPet.id);
    await petApi.expectJson(await petApi.createPet(newPet), 200);

    const getResponse = await petApi.getPetById(newPet.id);
    const fetchedPet = await petApi.expectJson(getResponse, 200);

    expect(fetchedPet.id).toBe(newPet.id);
    expect(fetchedPet.name).toBe(newPet.name);
    expect(fetchedPet.status).toBe('available');
  });

  test('Should return 404 for non-existing pet id', async ({ petApi }) => {
    const nonExistingPetId = 999999999;
    const response = await petApi.getPetById(nonExistingPetId);

    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body.message).toContain('Pet not found');
  });
});
