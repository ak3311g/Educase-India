import { Router } from "express";
import * as SchoolController from "../controllers/school.controller.js";

const router = Router();

router.post("/addSchool", SchoolController.addSchool);

/* /api/location?lat=${latitude}&lng=${longitude}&radi=${radius} */
router.get("/listSchools", SchoolController.getSchools);

export default router;