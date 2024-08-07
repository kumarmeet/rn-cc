import { KeyboardTypeOptions } from "react-native";

export interface ICustomButtons {
  title: string;
  handlerPress: (e?: any) => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

export interface IFormField {
  title?: string;
  value: string;
  placeholder: string;
  handleChangeText: (e?: any) => void;
  keyboardType?: KeyboardTypeOptions;
  [key: string]: any;
}

interface IUserData {
  username: string;
  email: string;
  password: string;
}

export type TFormData = {
  [T in keyof IUserData]?: IUserData[T];
} & { email: string; password: string };
