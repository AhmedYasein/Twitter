import UserModel from "../Model/userModel.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import { generateToken } from "../utils/token.js";
const userModel = new UserModel(); 


class UserController {

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userModel.findByEmail(email);
  
      if (!user || user.password !== password) {
        return ResponseHandler.fail(res, 'Invalid credentials', {}, 401);
      }
  
      const token = generateToken({ id: user.id, email: user.email });
  
      return ResponseHandler.success(res, 'Login successful', { user, token });
    } catch (error) {
      return ResponseHandler.error(res, error, 'Login failed');
    }
  }


  static async create(req, res) {
    try {


      const existingUser = await userModel.findByEmail(req.body.email);
      if (existingUser) {
        return ResponseHandler.fail(res, 'Email already exists, please choose another', {}, 400);
      }
      const user = await userModel.create(req.body);
  
      // Generate token payload, typically user ID or any other needed info
      const payload = { id: user.id, userName: user.userName };
      const token = generateToken(payload);
  
      // Return user info + token
      return ResponseHandler.success(res, "User created", { user, token }, 201);
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('userName')) {
        // Prisma unique constraint error
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
