import { TFormData } from "@/components/interface/props";
import { Models, QueryTypes } from "react-native-appwrite";

export type TMediaType = "image" | "video";

export interface IForm {
  thumbnail: string;
  video: string;
  title: string;
  prompt: string;
  userId: string;
}

export interface IAppWrite {
  createUser: ({
    email,
    password,
    username,
  }: TFormData) => Promise<Models.Document>;
  signIn: ({ email, password }: TFormData) => Promise<Models.Session>;
  getAccount: () => Promise<Models.User<Models.Preferences>>;
  getCurrentUser: () => Promise<Models.Document | null>;
  signOut: () => Promise<{}>;
  uploadFile: (file: any, type: TMediaType) => Promise<URL | undefined>;
  getFilePreview: (fileId: string, type: TMediaType) => Promise<URL>;
  createVideoPost: (form: IForm) => Promise<Models.Document>;
  getAllPosts: () => Promise<Models.Document[]>;
  getUserPosts: (userId: QueryTypes) => Promise<Models.Document[]>;
  searchPosts: (query: string) => Promise<Models.Document[]>;
  getLatestPosts: () => Promise<Models.Document[]>;
}

export type TAppWriteEnv = {
  endpoint: string;
  platform: string;
  projectId: string;
  storageId: string;
  databaseId: string;
  userCollectionId: string;
  videoCollectionId: string;
  [k: string]: string;
};
