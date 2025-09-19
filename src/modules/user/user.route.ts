import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.get("/all-users", UserController.getAllFromDb);
router.post("/create-user", UserController.createUser);
router.get("/get-user-by-id", UserController.getUserById);
router.delete("/delete-user-by-id", UserController.deleteUserById);
export const UserRouter = router;
