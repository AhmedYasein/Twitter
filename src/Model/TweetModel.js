import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class TweetModel {

  // Create a new tweet
  async create({ content, authorId }) {
    return await prisma.tweet.create({
      data: {
        content,
        author: {
          connect: { id: authorId },
        },
      },
    });
  }
  

  // Find all tweets
  async findAll(options = {}) {
    return prisma.tweet.findMany(options);
  }


  // Find a tweet by ID
  async findById(id) {
    return await prisma.tweet.findUnique({
      where: { id: Number(id) },
    });
  }

  // Update a tweet by ID
  async update(id, data) {
    return await prisma.tweet.update({
      where: { id: Number(id) },
      data,
    });
  }

  // Delete a tweet by ID
  async delete(id) {
    return await prisma.tweet.delete({
      where: { id: Number(id) },
    });
  }
}

export default TweetModel;
