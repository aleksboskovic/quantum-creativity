import { systemRouter } from "./_core/systemRouter";
import { router } from "./_core/trpc";
import { contactRouter } from "./contactRouter";

export const appRouter = router({
  system: systemRouter,
  contact: contactRouter,
});

export type AppRouter = typeof appRouter;
