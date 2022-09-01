import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class PrismaClientManager implements OnModuleDestroy {
  private clients: { [key: string]: PrismaClient } = {};

  getTenantId(request: Request): string {
    return request.headers['x-tenant-id'] as string;
  }

  getClient(request: Request): PrismaClient {
    const tenantId = this.getTenantId(request);
    const databaseUrl = process.env.DATABASE_URL?.replace('public', tenantId);

    const client = this.clients[tenantId]
      ? this.clients[tenantId]
      : new PrismaClient({
          datasources: {
            db: {
              url: databaseUrl,
            },
          },
        });

    if (!this.clients[tenantId]) {
      this.clients[tenantId] = client;
    }

    return client;
  }

  async onModuleDestroy() {
    await Promise.all(
      Object.values(this.clients).map((client) => client.$disconnect()),
    );
  }
}
