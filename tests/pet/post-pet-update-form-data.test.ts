import { test, expect } from '../../fixtures/api.fixture';
import { buildPetPayload } from '../../factories/pet.factory';

test.describe('Update pet by form data tests', () => {
  test.afterEach(async ({ cleanupPets }) => {
    await cleanupPets();
  });

  test('Should update pet with form data', { tag: ['@smoke'] }, async ({ petApi, registerPetForCleanup }) => {
    const newPet = buildPetPayload();
    registerPetForCleanup(newPet.id);

    await petApi.expectJson(await petApi.createPet(newPet), 200);

    const updatedName = `${newPet.name}-form-updated`;
    const updatedStatus = 'sold';
    const formUpdateResponse = await petApi.updatePetWithFormData(newPet.id, {
      name: updatedName,
      status: updatedStatus,
    });
    expect(formUpdateResponse.ok()).toBeTruthy();

    const getResponse = await petApi.getPetById(newPet.id);
    const updatedPet = await petApi.expectJson(getResponse, 200);
    expect(updatedPet.id).toBe(newPet.id);
    expect(updatedPet.name).toBe(updatedName);
    expect(updatedPet.status).toBe(updatedStatus);
  });
});
