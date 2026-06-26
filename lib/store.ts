import { kv } from '@vercel/kv';
import { Plan } from "./types";
import { seedPlan } from "./sample";

export const PlanStore = {
  async get(id: string): Promise<Plan | null> {
    // Special handling to ensure the demo always works
    if (id === "demo") {
      const existing = await kv.get<Plan>("plan:demo");
      if (existing) return existing;
      
      const demoPlan = seedPlan();
      await this.set(demoPlan);
      return demoPlan;
    }
    
    return await kv.get<Plan>(`plan:${id}`);
  },
  
  async set(plan: Plan): Promise<void> {
    // Store the plan and automatically expire it after 7 days (604800 seconds)
    // This keeps your Vercel KV free tier clean during testing
    await kv.set(`plan:${plan.id}`, plan, { ex: 604800 });
  }
};
