import { RegistrationCredentials, LoginCredentials, DB_RegisterResponse, DB_LoginCheckResponse } from '../utils/interfaces'
import { hash } from '../utils/hash';

import prisma from '../utils/prisma-client';

export namespace UserDAO {

    const getUserForLogin = async (submittedCredentials : LoginCredentials) : Promise<DB_LoginCheckResponse> => {
        const locatedAccount = await prisma.account.findFirst({
            where: {
                username : submittedCredentials.username
            },
            select: {
                user : true,
                password : true
            }
        })
        if (!locatedAccount) {
            return { success : false, message : "Error" }
        }
        return {success : true, message : "Success retrieving user", sessionData : {user : locatedAccount.user} , hashedPassword : locatedAccount.password}
    }

    const getAllUsers = async () => {
        console.log("Fetching all users....")
        let users = await prisma.account.findMany({
            include: {
                user : true
            }
        })
        return users;
    }


    const createNewAccount = async (newAccountData : RegistrationCredentials) : Promise<DB_RegisterResponse> => {
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
        let createdAccount;
        try {
            createdAccount = await prisma.account.create({
                data: {
                    username : newAccountData.username,
                    password: newAccountData.password,
                    user: {
                        create: {
                            name: newAccountData.name
                        }
                    }
                },
                select: {
                    user : true
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
            sessionData: { user : createdAccount.user }
        }
    }

}