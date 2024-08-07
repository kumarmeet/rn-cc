import { View, Text, FlatList } from "react-native";
import React from "react";

const Trending = ({ posts }: { posts: any[] }) => {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <Text className="text-3xl text-white">{item.$id}</Text>
      )}
      keyExtractor={(item) => item.id}
      horizontal
    />
  );
};

export default Trending;
