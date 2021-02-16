import {PrismaClient} from '@prisma/client';
import { NewAccountCredentials, LoginCredentials, RegisterResponse, LoginCheckResponse } from '../utils/interfaces'
import { hash } from '../utils/hash';

const prisma = new PrismaClient();

export const getUserForLogin = async (submittedCredentials : LoginCredentials) : Promise<LoginCheckResponse> => {
    const locatedAccount = await prisma.account.findFirst({
        where: {
            username : submittedCredentials.username
        }
    })
    if (!locatedAccount) {
        return { success : false, message : "Error" }
    }
    return {success : true, message : "Success retrieving user", hashedPassword : locatedAccount.password}
}

export const getAllUsers = async () => {
    console.log("Fetching all users....")
    let users = await prisma.account.findMany({
        include: {
            user : true
        }
    })
    return users;
}


export const createNewAccountAndUser = async (newAccountData : NewAccountCredentials) : Promise<RegisterResponse> => {
    // Verify login name does not exist
    const loginExistenceCheck = await prisma.account.findFirst({
        where: {
            username: newAccountData.username
        }
    })

    if (loginExistenceCheck != null){
        return {
            success : false,
            message : "User with login already exists"
        }
    }

    // Tranform raw password to hashed
    let hashedPassword = await hash(newAccountData.password);
    if (hashedPassword !== ""){
        newAccountData.password = hashedPassword;
    } else {
        return {
            success: false,
            message: "Failure in password hashing"
        }
    }
    let createdUser;
    try {
        createdUser = await prisma.account.create({
            data: {
                username : newAccountData.username,
                password: newAccountData.password,
                user: {
                    create: {
                        name: newAccountData.name
                    }
                }
            }
        })
    } catch (error){
        return {
            success: false,
            message: "Error: " + error
        }
    }
    
    return {
        success: true,
        message: "User successfully created",
        userid: createdUser.userid
    }
}