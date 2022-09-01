import { Injectable } from '@nestjs/common';
import { User, PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaClient) {}

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getAllTenantsUsers(): Promise<User[]> {
    return this.prisma.$queryRaw`
    SELECT * FROM teste."User"
    UNION ALL
    SELECT * FROM testee."User"
    `;
  }
}
