const argon2 = require('argon2');

export const hash = async (input : string) => {
    try {
        return await argon2.hash(input);
    } catch (error){
        return "";
    }
}

export const compareHashes = async (hash : string, rawString : string) => {
    try{
        if (await argon2.verify(hash, rawString)){
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}