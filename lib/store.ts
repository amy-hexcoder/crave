import { PrismaClient } from '@prisma/client';
import { Plan as AppPlan, Restaurant as AppRestaurant } from "./types";
import { seedPlan } from "./sample";

// Prevent multiple Prisma instances in development (Next.js hot-reloading quirk)
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const PlanStore = {
  async get(id: string): Promise<AppPlan | null> {
    // Demo handling
    if (id === "demo") {
      let demo = await prisma.plan.findUnique({ where: { id: "demo" }, include: { items: true } });
      if (!demo) {
        await this.set(seedPlan());
        demo = await prisma.plan.findUnique({ where: { id: "demo" }, include: { items: true } });
      }
      return demo ? mapToAppPlan(demo) : null;
    }

    // Real database fetch
    const record = await prisma.plan.findUnique({
      where: { id },
      include: { items: true }
    });
    
    return record ? mapToAppPlan(record) : null;
  },
  
  async set(plan: AppPlan): Promise<void> {
    await prisma.plan.create({
      data: {
        id: plan.id,
        title: plan.title,
        originLat: plan.origin?.lat,
        originLng: plan.origin?.lng,
        source: plan.source,
        items: {
          create: plan.items.map(item => ({
            id: item.id,
            name: item.name,
            cuisine: item.cuisine,
            price: item.price,
            address: item.address,
            city: item.city,
            lat: item.coords.lat,
            lng: item.coords.lng,
            openUntil: item.openUntil,
            opentableUrl: item.opentableUrl,
            mapsUrl: item.mapsUrl,
            bib: item.bib || false
          }))
        }
      }
    });
  }
};

// Helper: Transforms Prisma DB models back into our frontend UI types
function mapToAppPlan(dbPlan: any): AppPlan {
  return {
    id: dbPlan.id,
    title: dbPlan.title,
    origin: dbPlan.originLat && dbPlan.originLng 
      ? { lat: dbPlan.originLat, lng: dbPlan.originLng } 
      : undefined,
    createdAt: dbPlan.createdAt.getTime(),
    source: dbPlan.source,
    items: dbPlan.items.map((r: any) => ({
      id: r.id,
      name: r.name,
      cuisine: r.cuisine || undefined,
      price: r.price || undefined,
      address: r.address || undefined,
      city: r.city || undefined,
      coords: { lat: r.lat, lng: r.lng },
      openUntil: r.openUntil || undefined,
      opentableUrl: r.opentableUrl || undefined,
      mapsUrl: r.mapsUrl || undefined,
      bib: r.bib
    }))
  };
}
