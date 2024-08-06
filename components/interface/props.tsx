export interface ICustomButtons {
  title: string;
  handlerPress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean
}

export interface IFormField {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: () => void;
  [key: string]: any
}