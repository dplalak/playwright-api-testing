import { expect, APIResponse, APIRequestContext } from '@playwright/test';
import type { PetPayload, PetStatus } from '../types/pet.types';

export class PetApi {
  constructor(private readonly request: APIRequestContext) {}

  async createPet(payload: PetPayload): Promise<APIResponse> {
    return this.request.post('pet', { data: payload });
  }

  async getPetById(id: number): Promise<APIResponse> {
    return this.request.get(`pet/${id}`);
  }

  async updatePet(payload: PetPayload): Promise<APIResponse> {
    return this.request.put('pet', { data: payload });
  }

  async updatePetWithFormData(petId: number,
    data: { name?: string; status?: PetStatus }): Promise<APIResponse> {
    return this.request.post(`pet/${petId}`, { form: data });
  }

  async uploadPetImage(
    petId: number,
    options: {
      additionalMetadata?: string;
      fileName?: string;
      contentType?: string;
      fileContent?: string;
    } = {},
  ): Promise<APIResponse> {
    const {
      additionalMetadata = 'api-test-image',
      fileName = 'pet-image.txt',
      contentType = 'text/plain',
      fileContent = 'fake image payload for api test',
    } = options;

    return this.request.post(`pet/${petId}/uploadImage`, {
      multipart: {
        additionalMetadata,
        file: {
          name: fileName,
          mimeType: contentType,
          buffer: Buffer.from(fileContent),
        },
      },
    });
  }

  async deletePet(id: number): Promise<APIResponse> {
    return this.request.delete(`pet/${id}`);
  }

  async findPetsByStatus(status: PetStatus): Promise<APIResponse> {
    return this.request.get('pet/findByStatus', { params: { status } });
  }

  async expectJson(response: APIResponse, statusCode: number): Promise<any> {
    expect(response.status()).toBe(statusCode);
    expect(response.headers()['content-type']).toContain('application/json');
    return response.json();
  }
}
