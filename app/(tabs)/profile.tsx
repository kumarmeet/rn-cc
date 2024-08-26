import { View, FlatList, StatusBar, TouchableOpacity, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import { getUserPosts, signOut } from "@/lib/appwrite";
import { useAppwrite } from "@/hooks/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/global-provider";
import { icons } from "@/constants";
import { router } from "expo-router";
import InfoBox from "@/components/InfoBox";

const Profile = () => {
  const [refresh, setRefresh] = useState(false);
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const { data: posts, reFetch } = useAppwrite(getUserPosts.bind(null, user?.$id) as any);

  const onRefresh = async () => {
    setRefresh(true);

    await reFetch();

    setRefresh(false);
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
        data={posts}
        ListHeaderComponent={() => {
          return (
            <View className="w-full justify-center items-center mt-6 mb-12 px-4">
              <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
                <Image source={icons.logout} resizeMode="contain" className="w-6 h-6" />
              </TouchableOpacity>

              <View className="w-16 h-16 border border-secondary-100 rounded-lg justify-center items-center">
                <Image source={{ uri: user?.avatar }} resizeMode="cover" className="w-[90%] h-[90%] rounded-lg" />
              </View>


              <InfoBox title={user?.username} containerStyles="mt-5" titleStyle="text-lg" />

              <View className="mt-5 flex flex-row">
                <InfoBox title={posts?.length || 0} subtitle="Posts" containerStyles="mr-10" titleStyle="text-xl" />
                <InfoBox title="1.4k" subtitle="Followers" titleStyle="text-lg" />
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard
            video={item}
          />;
        }}
        ListEmptyComponent={() => {
          return (
            <EmptyState
              title="No Video Found"
              subtitle="No video found for this search query!"
            />
          );
        }}
      />
      <StatusBar backgroundColor="#161622" barStyle="light-content" />
    </SafeAreaView>
  );
};

export default Profile;
