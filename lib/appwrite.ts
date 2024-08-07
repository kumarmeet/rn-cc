import { TFormData } from "@/components/interface/props";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  ImageGravity,
  Query,
  QueryTypes,
  Storage,
} from "react-native-appwrite";
import {
  IAppWrite,
  IForm,
  TAppWriteEnv,
  TMediaType,
} from "./interface/appwrite";

export const appwriteConfig: TAppWriteEnv = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_URL!,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFROM!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
  videoCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEO_COLLECTION_ID!,
};

class AppWrite implements IAppWrite {
  private client: Client;
  private account: Account;
  private storage: Storage;
  private avatars: Avatars;
  private databases: Databases;

  constructor() {
    this.client = new Client();

    this.client
      .setEndpoint(appwriteConfig.endpoint)
      .setProject(appwriteConfig.projectId)
      .setPlatform(appwriteConfig.platform);

    this.account = new Account(this.client);
    this.storage = new Storage(this.client);
    this.avatars = new Avatars(this.client);
    this.databases = new Databases(this.client);
  }

  // Register user
  async createUser({ email, password, username }: TFormData) {
    try {
      console.log(email, password, username);

      const newAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        username
      );

      if (!newAccount) throw Error;

      const avatarUrl = this.avatars.getInitials(username);

      await this.signIn({ email, password });

      const newUser = await this.databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email: email,
          username: username,
          avatar: avatarUrl,
        }
      );

      return newUser;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  // Sign In
  async signIn({ email, password }: TFormData) {
    try {
      const session = await this.account.createSession(email, password);

      return session;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  // Get Account
  async getAccount() {
    try {
      const currentAccount = await this.account.get();

      return currentAccount;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  // Get Current User
  async getCurrentUser() {
    try {
      const currentAccount = await this.getAccount();
      if (!currentAccount) throw Error;

      const currentUser = await this.databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );

      if (!currentUser) throw Error;

      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Sign Out
  async signOut() {
    try {
      const session = await this.account.deleteSession("current");

      return session;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  // Upload File
  async uploadFile(file: any, type: TMediaType) {
    if (!file) return;

    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };

    try {
      const uploadedFile = await this.storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        asset
      );

      const fileUrl = await this.getFilePreview(uploadedFile.$id, type);
      return fileUrl;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  // Get File Preview
  async getFilePreview(fileId: string, type: TMediaType) {
    let fileUrl;

    try {
      if (type === "video") {
        fileUrl = this.storage.getFileView(appwriteConfig.storageId, fileId);
      } else if (type === "image") {
        fileUrl = this.storage.getFilePreview(
          appwriteConfig.storageId,
          fileId,
          2000,
          2000,
          ImageGravity.Top,
          100
        );
      } else {
        throw new Error("Invalid file type");
      }

      if (!fileUrl) throw Error;

      return fileUrl;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  // Create Video Post
  async createVideoPost(form: IForm) {
    try {
      const [thumbnailUrl, videoUrl] = await Promise.all([
        this.uploadFile(form.thumbnail, "image"),
        this.uploadFile(form.video, "video"),
      ]);

      const newPost = await this.databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.videoCollectionId,
        ID.unique(),
        {
          title: form.title,
          thumbnail: thumbnailUrl,
          video: videoUrl,
          prompt: form.prompt,
          creator: form.userId,
        }
      );

      return newPost;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  // Get all video Posts
  async getAllPosts() {
    try {
      const posts = await this.databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videoCollectionId
      );

      return posts.documents;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  // Get video posts created by user
  async getUserPosts(userId: QueryTypes) {
    try {
      const posts = await this.databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videoCollectionId,
        [Query.equal("creator", userId)]
      );

      return posts.documents;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  // Get video posts that matches search query
  async searchPosts(query: string) {
    try {
      const posts = await this.databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videoCollectionId,
        [Query.search("title", query)]
      );

      if (!posts) throw new Error("Something went wrong");

      return posts.documents;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  // Get latest created video posts
  async getLatestPosts() {
    try {
      const posts = await this.databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.videoCollectionId,
        [Query.orderDesc("$createdAt"), Query.limit(7)]
      );

      return posts.documents;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

const appWriteInstance = new AppWrite();

export const createUser = appWriteInstance.createUser.bind(appWriteInstance);
export const signIn = appWriteInstance.signIn.bind(appWriteInstance);
export const getAccount = appWriteInstance.getAccount.bind(appWriteInstance);
export const getCurrentUser =
  appWriteInstance.getCurrentUser.bind(appWriteInstance);
export const signOut = appWriteInstance.signOut.bind(appWriteInstance);
export const uploadFile = appWriteInstance.uploadFile.bind(appWriteInstance);
export const getFilePreview =
  appWriteInstance.getFilePreview.bind(appWriteInstance);
export const createVideoPost =
  appWriteInstance.createVideoPost.bind(appWriteInstance);
export const getAllPosts = appWriteInstance.getAllPosts.bind(appWriteInstance);
export const getUserPosts =
  appWriteInstance.getUserPosts.bind(appWriteInstance);
export const searchPosts = appWriteInstance.searchPosts.bind(appWriteInstance);
export const getLatestPosts =
  appWriteInstance.getLatestPosts.bind(appWriteInstance);
