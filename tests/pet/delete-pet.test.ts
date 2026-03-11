import { test, expect } from '../../fixtures/api.fixture';
import { buildPetPayload } from '../../factories/pet.factory';

test.describe('Delete pet tests', () => {
  test.afterEach(async ({ cleanupPets }) => {
    await cleanupPets();
  });

  test('Should delete pet and return 404 when fetched again', { tag: ['@smoke'] }, async ({ petApi }) => {
    const newPet = buildPetPayload();
    await petApi.expectJson(await petApi.createPet(newPet), 200);

    const deleteResponse = await petApi.deletePet(newPet.id);
    const deleteBody = await petApi.expectJson(deleteResponse, 200);
    expect(Number(deleteBody.message)).toBe(newPet.id);

    const getDeletedResponse = await petApi.getPetById(newPet.id);
    expect(getDeletedResponse.status()).toBe(404);
  });
});
