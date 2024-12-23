import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import PagerView from "react-native-pager-view";

const { width, height } = Dimensions.get("window");

export default function InitialPageSlider({ data }) {
  const pagerRef = useRef(null); // Reference for PagerView
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length); // Cycle through indices
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [data.length]);

  useEffect(() => {
    if (pagerRef.current) {
      pagerRef.current.setPage(currentIndex); // Update PagerView to the new index
    }
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={(e) => setCurrentIndex(e.nativeEvent.position)} // Sync current index on manual swipe
      >
        {data.map((item, index) => (
          <View style={styles.page} key={index}>
            <Text style={styles.title}>{item.title}</Text>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    resizeMode: "cover",
    borderRadius: 10,
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
