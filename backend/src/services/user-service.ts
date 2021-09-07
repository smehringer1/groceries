import { UserDAO } from "../db/user-dao";
import { createSession } from "../sessions/sessions";
import { compareHashes } from "../utils/hash";
import { DB_LoginCheckResponse, LoginCredentials, LoginRegistrationResponse, DB_RegisterResponse, RegistrationCredentials, SessionData } from "../utils/interfaces";

// Provides a service abstraction for actions for users

export namespace UserService {

    // logs user in based on credentials
     
    export const login = async (loginCredentials : LoginCredentials) : Promise<LoginRegistrationResponse> => {
        const queriedUser : DB_LoginCheckResponse = await UserDAO.getUserForLogin(loginCredentials);
        if (queriedUser.success && await compareHashes(queriedUser.hashedPassword!, loginCredentials.password)) {
            const sessionData : SessionData = queriedUser.sessionData!;
            const sessionID : string = createSession(sessionData);
            return {success : true, sessionData : sessionData, sessionID : sessionID };
        } else {
            return { success : false };
        }
    }

    // registers user based on credentials

    export const register = async (registrationCredentials : RegistrationCredentials) : Promise<LoginRegistrationResponse> => {
        let registrationResponse : DB_RegisterResponse = await UserDAO.createNewAccount(registrationCredentials);
        if (registrationResponse.success) {
            const sessionID = createSession(registrationResponse.sessionData!);
            return {success : true, sessionID : sessionID, sessionData : registrationResponse.sessionData!};
        } else {
            return {success : false};
        }   
    }

}