import { test as base, expect } from '@playwright/test';
import { PetApi } from '../api-clients/pet.api.ts';

type TestFixtures = {
  petApi: PetApi;
  registerPetForCleanup: (id: number) => void;
  cleanupPets: () => Promise<void>;
};

type InternalFixtures = {
  createdPetIds: Set<number>;
};

export const test = base.extend<TestFixtures & InternalFixtures>({
  createdPetIds: async ({}, use) => {
    const ids = new Set<number>();
    await use(ids);
  },

  registerPetForCleanup: async ({ createdPetIds }, use) => {
    await use((id: number) => {
      createdPetIds.add(id);
    });
  },

  petApi: async ({ request }, use) => {
    await use(new PetApi(request));
  },

  cleanupPets: async ({ createdPetIds, petApi }, use) => {
    await use(async () => {
      for (const id of createdPetIds) {
        const response = await petApi.deletePet(id);
        if (response.status() !== 200 && response.status() !== 404 && response.status() !== 405) {
          throw new Error(`Cleanup failed for pet id ${id}, status: ${response.status()}`);
        }
      }
      createdPetIds.clear();
    });
  },
});

export { expect };
