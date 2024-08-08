import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable"
import { icons } from "@/constants";
import { Video, ResizeMode } from "expo-av"

const zoomIn = {
  from: {
    transform: [{ scale: 0.9 }],
  },
  to: {
    transform: [{ scale: 1.1 }],
  },
};

const zoomOut = {
  from: {
    transform: [{ scale: 1 }],
  },
  to: {
    transform: [{ scale: 0.9 }],
  },
};


const TrendingItem = ({ activeItem, item }: any) => {
  const [play, setplay] = useState(false)

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}>
      {play ?
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10 border border-red-400"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
        // onPlaybackStatusUpdate={status => setplay(() => status.isLoaded)}
        />
        : <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7} onPress={() => setplay(true)}>
          <ImageBackground
            className="my-5 w-52 h-72 overflow-hidden shadow-lg shadow-black/40 rounded-[34px]"
            source={{ uri: item.thumbnail }}
            resizeMode="cover" />

          <Image source={icons.play} className='w-12 h-12 absolute' resizeMode='contain' />
        </TouchableOpacity>}
    </Animatable.View>
  )
}

const Trending = ({ posts }: { posts: any[] }) => {
  const [activeItem, setActiveItem] = useState(posts[0])

  const viewableItemsChange = ({ viewableItems, changed }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      keyExtractor={(item) => item.$id}
      horizontal
      onViewableItemsChanged={viewableItemsChange}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70
      }}
      contentOffset={{ x: 156, y: 0 }}
    />
  );
};

export default Trending;
