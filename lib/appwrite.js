
import { Account, Avatars, Client, Databases, ID,Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.michael.trainingapp',
    projectId: '66dffd32001b5cf58dc4',
    databaseId: '66dffed0000284897bcb',
    userCollectionId: '66dffef200245c88d6b5',
    videoCollectionId: '66dfff1e00225f4370cf',
    storageId: '66e0004b0003d06f5f86'

}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
export const signIn = async (email, password) => {
    try {
        await account.deleteSession('current');
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (retryError) {
        console.error('Retry error during sign-in:', retryError.message);
        throw new Error(retryError);
    }
};


export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error

        const  currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId',currentAccount.$id)]
        )

        if(!currentAccount) throw Error;

        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
        
    }
}

