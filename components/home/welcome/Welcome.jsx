import React from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const jobTypes = ["Full-time", "Part-time", "Contractor"];
const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = React.useState("Full-time");

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Akbar</Text>
        <Text style={styles.welcomeMessage}>Find your suitable job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            style={styles.searchInput}
            placeholder="What are you looking for?"
          />
        </View>
        <TouchableOpacity onPress={handleClick} style={styles.searchBtn}>
          <Image source={icons.search} resizeMode="contain" style={styles.searchBtnImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
