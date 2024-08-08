import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import { useAppwrite } from "@/hooks/useAppwrite";
import VideoCard from "@/components/VideoCard";

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const { data: posts, isLoading, reFetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const onRefresh = async () => {
    setRefresh(true);

    await reFetch();

    setRefresh(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        ListHeaderComponent={() => {
          return (
            <View className="my-6 px-4 space-y-6">
              <View className="flex-row justify-between items-start mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Welcome Back
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">
                    React Native
                  </Text>
                </View>

                <View className="mt-1.5">
                  <Image
                    source={images.logoSmall}
                    className="w-9 h-10"
                    resizeMode="contain"
                  />
                </View>
              </View>

              <SearchInput
                placeholder="Search for a video topic"
                value=""
                handleChangeText={() => { }}
                keyboardType="default"
              />

              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-gray-100 text-lg font-pregular mb-3">
                  Latest Videos
                </Text>

                <Trending posts={latestPosts} />
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard video={item} posts={posts} />;
        }}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => {
          return (
            <EmptyState
              title="No Video Found"
              subtitle="Be the first one to upload a video!"
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
