import { createNewAccount, getUserForLogin } from "../db/user";
import { createSession } from "../sessions/sessions";
import { compareHashes } from "../utils/hash";
import { DB_LoginCheckResponse, LoginCredentials, LoginRegistrationResponse, DB_RegisterResponse, RegistrationCredentials, SessionData } from "../utils/interfaces";


export const login = async (loginCredentials : LoginCredentials) : Promise<LoginRegistrationResponse> => {
    const queriedUser : DB_LoginCheckResponse = await getUserForLogin(loginCredentials);
    if (queriedUser.success && await compareHashes(queriedUser.hashedPassword!, loginCredentials.password)) {
        const sessionData : SessionData = queriedUser.sessionData!;
        const sessionID : string = createSession(sessionData);
        return {success : true, sessionData : sessionData, sessionID : sessionID };
    } else {
        return { success : false };
    }
}

export const register = async (registrationCredentials : RegistrationCredentials) : Promise<LoginRegistrationResponse> => {
    let registrationResponse : DB_RegisterResponse = await createNewAccount(registrationCredentials);
    if (registrationResponse.success) {
        const sessionID = createSession(registrationResponse.sessionData!);
        return {success : true, sessionID : sessionID, sessionData : registrationResponse.sessionData!};
    } else {
        return {success : false};
    }   
}