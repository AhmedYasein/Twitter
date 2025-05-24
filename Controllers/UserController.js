import UserModel from "../Model/userModel.js";
import ResponseHandler from "../src/utils/ResponseHandler.js";
const userModel = new UserModel(); 

class UserController {

  static async create(req, res) {
    try {
      const user = await userModel.create(req.body);
      return ResponseHandler.success(res, "User created", user, 201);
    } catch (error) {
        if (error.code === 'P2002' && error.meta?.target?.includes('userName')) {
            // Prisma error code P2002 = unique constraint failed
            return ResponseHandler.fail(res, 'Username already exists, please choose another', {}, 400);
          }
      return ResponseHandler.error(res, error, "Failed to create user");
    }
  }

  static async list(req, res) {
    try {
      const users = await userModel.findAll();
      return ResponseHandler.success(res, "Users fetched", users);
    } catch (error) {
      return ResponseHandler.error(res, error, "Failed to fetch users");
    }
  }

  static async getOne(req, res) {
    try {
      const user = await userModel.findById(req.params.id);
      if (!user) return ResponseHandler.fail(res, "User not found", {}, 404);
      return ResponseHandler.success(res, "User fetched", user);
    } catch (error) {
      return ResponseHandler.error(res, error, "Failed to fetch user");
    }
  }

  static async update(req, res) {
    try {
      const user = await userModel.update(req.params.id, req.body);
      if (!user) return ResponseHandler.fail(res, "User not found", {}, 404);
      return ResponseHandler.success(res, "User updated", user);
    } catch (error) {
      return ResponseHandler.error(res, error, "Failed to update user");
    }
  }

  static async remove(req, res) {
    try {
      const user = await userModel.delete(req.params.id);
      if (!user) return ResponseHandler.fail(res, "User not found", {}, 404);
      return ResponseHandler.success(res, "User deleted", user);
    } catch (error) {
      return ResponseHandler.error(res, error, "Failed to delete user");
    }
  }
}

export default UserController;
