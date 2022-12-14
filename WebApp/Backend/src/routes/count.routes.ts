import { Router } from "express";
import { dashboardCounts } from "../controllers/counts.controller";

const router: Router = Router();

/**
 * Get Counts
 * @body
 */
router.get("/", dashboardCounts);

export default router;
