import { test, expect } from '../../fixtures/api.fixture';
import { buildPetPayload } from '../../factories/pet.factory';

test.describe('Upload pet image tests', () => {
  test.afterEach(async ({ cleanupPets }) => {
    await cleanupPets();
  });

  test('Should upload pet image', { tag: ['@smoke'] }, async ({ petApi, registerPetForCleanup }) => {
    const newPet = buildPetPayload();
    registerPetForCleanup(newPet.id);

    await petApi.expectJson(await petApi.createPet(newPet), 200);

    const uploadResponse = await petApi.uploadPetImage(newPet.id, {
      additionalMetadata: 'smoke-upload',
      fileName: 'pet-image.txt',
      contentType: 'text/plain',
      fileContent: 'pet image bytes',
    });
    const uploadBody = await petApi.expectJson(uploadResponse, 200);

    expect(uploadBody.code).toBe(200);
    expect(uploadBody.message).toContain('additionalMetadata: smoke-upload');
    expect(uploadBody.message).toContain('pet-image.txt');
  });
});
