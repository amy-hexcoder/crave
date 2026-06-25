import { Plan } from "./types";
import { seedPlan } from "./sample";

const memory = new Map<string, Plan>();
memory.set("demo", seedPlan());

export const PlanStore = {
  get(id: string) {
    return memory.get(id);
  },
  set(plan: Plan) {
    memory.set(plan.id, plan);
  }
};