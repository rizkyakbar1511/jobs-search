import React from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hooks/useFetch";

const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("search", {
    query: "React Developer",
    num_pages: 1,
  });

  const handleCardPress = (id) => {
    router.push(`/job-details/${id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => <PopularJobCard item={item} handleCardPress={() => handleCardPress(item?.job_id)} />}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
