import TweetModel from '../Model/TweetModel.js';
import ResponseHandler from '../utils/ResponseHandler.js';

const tweetModel = new TweetModel();



class TweetController {

  static async create(req, res) {
    try {
      const tweet = await tweetModel.create(req.body);
      return ResponseHandler.success(res, 'Tweet created', tweet, 201);
    } catch (error) {
      return ResponseHandler.error(res, error, 'Failed to create tweet');
    }
  }

  static async list(req, res) {
    try {
      const tweets = await tweetModel.findAll({
        include: {
          author: true
        }
      });
      return ResponseHandler.success(res, 'Tweets fetched', tweets);
    } catch (error) {
      return ResponseHandler.error(res, error, 'Failed to fetch tweets');
    }
  }
  

  static async getOne(req, res) {
    try {
      const tweet = await tweetModel.findById(req.params.id);
      if (!tweet) {
        return ResponseHandler.fail(res, 'Tweet not found', null, 404);
      }
      return ResponseHandler.success(res, 'Tweet fetched', tweet);
    } catch (error) {
      return ResponseHandler.error(res, error, 'Failed to fetch tweet');
    }
  }

  static async update(req, res) {
    try {
      const tweet = await tweetModel.update(req.params.id, req.body);
      return ResponseHandler.success(res, 'Tweet updated', tweet);
    } catch (error) {
      return ResponseHandler.error(res, error, 'Failed to update tweet');
    }
  }

  static async remove(req, res) {
    try {
      await tweetModel.delete(req.params.id);
      return ResponseHandler.success(res, 'Tweet deleted');
    } catch (error) {
      return ResponseHandler.error(res, error, 'Failed to delete tweet');
    }
  }
}

export default TweetController;
