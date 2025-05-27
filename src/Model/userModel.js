import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


class UserModel {

    // Create user
    async create(data) {
        return await prisma.user.create({data});
    }

    // List all users
    async findAll() {
        return await prisma.user.findMany();
    }

    async findByEmail(email) {
        return await prisma.user.findUnique({
            where: {email: email}
        })
    }


    async findByUserName(userName) {
        return await prisma.user.findUnique({
            where: {userName: userName}
        })
    }
    async findById(id) {

         return await prisma.user.findUnique({
            where: {id: Number(id)},
         });
    }
    async update(id, data) {
        return await prisma.user.update({
            where: {id: Number(id)},
             data
        });
    }


    async delete(id) {
        return await prisma.user.delete({
            where: {id: Number(id)}
        });
    }


}
export default UserModel;