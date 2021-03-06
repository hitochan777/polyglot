import { PrismaClient } from "@prisma/client";

import { ID } from "../../../types";
import { LineMarkerRepository } from "../../../domain/repository";

export class PrismaLineMarkerRepository implements LineMarkerRepository {
  private photon: PrismaClient;
  constructor(driver: PrismaClient) {
    this.photon = driver;
  }
  async generateIds(num: number, postId: ID): Promise<ID[]> {
    const repliableIds = [];
    for (let i = 0; i < num; i++) {
      const createdRepliable = await this.photon.repliable.create({
        data: {},
      });
      repliableIds.push(createdRepliable.id);
    }
    if (repliableIds.length !== num) {
      throw new Error(`Could not generate ${num} repliables`);
    }
    const lineMarkers: { id: ID; postId: ID }[] = repliableIds.map((id) => {
      return {
        id,
        postId,
      };
    });
    const lineMarkerIds = [];
    for (let i = 0; i < num; i++) {
      const createdLineMarker = await this.photon.lineMarker.create({
        data: {
          id: lineMarkers[i].id,
          post: {
            connect: {
              id: lineMarkers[i].postId,
            },
          },
        },
      });

      lineMarkerIds.push(createdLineMarker.id);
    }
    if (lineMarkerIds.length !== num) {
      throw new Error(
        `Could not generate ${num} line markers. generated ${lineMarkerIds.length} line markers`
      );
    }
    return lineMarkerIds;
  }
}
