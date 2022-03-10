import express, {Response, Request} from "express";
import { currentUser } from "../middelwares/current-user";
import { requireAuth } from "../middelwares/require-auth";
const router = express.Router();

router.get("/api/users/currentuser", currentUser, requireAuth, (req: Request, res: Response) => {
  res.send({currentUser: req.currentUser || null});
});

export { router as currentUserRouter };
