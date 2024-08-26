import { View, Text } from 'react-native'

const InfoBox = ({ title, subtitle, containerStyles, titleStyle }: { title: string | number, subtitle?: string, containerStyles?: string, titleStyle?: string }) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyle}`}>{title}</Text>
      <Text className={`text-sm text-gray-100 text-center font-pregular`}>{subtitle}</Text>
    </View>
  )
}

export default InfoBox