import UserModel from "../Model/userModel.js";
import ResponseHandler from "../utils/ResponseHandler.js";
import { generateToken, decodeToken } from "../utils/token.js";
import { addBlacklistToken } from "../utils/tokenBlackListed.js";

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

      return ResponseHandler.success(res, 'Login successful', {
        user,
        token: "Bearer " + token,
      });
    } catch (error) {
      return ResponseHandler.error(res, error, 'Login failed');
    }
  }

  static async logout(req, res) {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return ResponseHandler.fail(res, 'No token found in headers', {}, 400);
      }

      const token = authHeader.split(' ')[1];
      const decoded = decodeToken(token);

      if (!decoded || !decoded.exp) {
        return ResponseHandler.fail(res, 'Invalid token format', {}, 400);
      }

      const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
      await addBlacklistToken(token, expiresIn);

      return ResponseHandler.success(res, 'Logged out successfully', {}, 200);
    } catch (error) {
      return ResponseHandler.error(res, error, 'Logout failed');
    }
  }

  static async create(req, res) {
    try {
      const existingUser = await userModel.findByEmail(req.body.email);
      if (existingUser) {
        return ResponseHandler.fail(
          res,
          'Email already exists, please choose another',
          {},
          400
        );
      }

      const user = await userModel.create(req.body);
      const payload = { id: user.id, userName: user.userName };
      const token = generateToken(payload);

      return ResponseHandler.success(
        res,
        "User created",
        { user, token: "Bearer " + token },
        201
      );
    } catch (error) {
      const userName = await userModel.findByUserName(req.body.userName);
      if (userName) {
        return ResponseHandler.fail(
          res,
          'Username already exists, please choose another',
          {},
          400
        );
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
      if (!user)
        return ResponseHandler.fail(res, "User not found", {}, 404);
      return ResponseHandler.success(res, "User fetched", user);
    } catch (error) {
      return ResponseHandler.error(res, error, "Failed to fetch user");
    }
  }

  static async update(req, res) {
    try {
      const user = await userModel.update(req.params.id, req.body);
      if (!user)
        return ResponseHandler.fail(res, "User not found", {}, 404);
      return ResponseHandler.success(res, "User updated", user);
    } catch (error) {
      return ResponseHandler.error(res, error, "Failed to update user");
    }
  }

  static async remove(req, res) {
    try {
      const user = await userModel.delete(req.params.id);
      if (!user)
        return ResponseHandler.fail(res, "User not found", {}, 404);
      return ResponseHandler.success(res, "User deleted", user);
    } catch (error) {
      return ResponseHandler.error(res, error, "Failed to delete user");
    }
  }
}

export default UserController;
