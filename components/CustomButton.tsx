import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ICustomButtons } from './interface/props'

const CustomButton = ({ title, handlerPress, containerStyles, isLoading, textStyles }: ICustomButtons) => {
  return (
    <TouchableOpacity
      onPress={handlerPress}
      activeOpacity={0.7}
      className={`bg-secondary-200 rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton