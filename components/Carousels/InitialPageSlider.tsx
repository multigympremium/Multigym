// import React, { useEffect, useRef, useState } from "react";
// import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
// import PagerView from "react-native-pager-view";

// const { width, height } = Dimensions.get("window");

// export default function InitialPageSlider({ data }) {
//   const pagerRef = useRef(null); // Reference for PagerView
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length); // Cycle through indices
//     }, 3000); // Change slide every 3 seconds

//     return () => clearInterval(interval); // Cleanup interval on component unmount
//   }, [data.length]);

//   useEffect(() => {
//     if (pagerRef.current) {
//       pagerRef.current.setPage(currentIndex); // Update PagerView to the new index
//     }
//   }, [currentIndex]);

//   return (
//     <View style={styles.container}>
//       <PagerView
//         style={styles.pagerView}
//         initialPage={0}
//         ref={pagerRef}
//         onPageSelected={(e) => setCurrentIndex(e.nativeEvent.position)} // Sync current index on manual swipe
//       >
//         {data.map((item, index) => (
//           <View style={styles.page} key={index}>
//             <Text style={styles.title}>{item.title}</Text>
//             <Image source={{ uri: item.image }} style={styles.image} />
//             <Text style={styles.description}>{item.description}</Text>
//           </View>
//         ))}
//       </PagerView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   pagerView: {
//     flex: 1,
//   },
//   page: {
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   image: {
//     width: width * 0.8,
//     height: height * 0.4,
//     resizeMode: "cover",
//     borderRadius: 10,
//     marginVertical: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//   },
// });import React, { useRef, useState, useEffect } from "react";
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

// const data = [
//   {
//     id: "1",
//     image: "https://via.placeholder.com/300/09f/fff",
//     title: "Slide 1",
//     description: "This is the first slide.",
//   },
//   {
//     id: "2",
//     image: "https://via.placeholder.com/300/f90/000",
//     title: "Slide 2",
//     description: "This is the second slide.",
//   },
//   {
//     id: "3",
//     image: "https://via.placeholder.com/300/333/fff",
//     title: "Slide 3",
//     description: "This is the third slide.",
//   },
// ];

export default function InitialPageSlider({ data }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  // Autoplay effect
  useEffect(() => {
    if (flatListRef.current || intervalRef.current) {
      startAutoplay();
    }

    return () => stopAutoplay();
  }, [currentIndex, flatListRef, intervalRef]);

  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
      setCurrentIndex(nextIndex);
    }, 3000); // Slide every 3 seconds
  };

  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const onScrollEnd = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  const handleDotPress = (index) => {
    setCurrentIndex(index);
    flatListRef.current.scrollToIndex({ animated: true, index });
  };

  const renderPagination = () => (
    <View style={styles.pagination}>
      {data.map((_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleDotPress(index)}
          style={[
            styles.dot,
            index === currentIndex ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={{ backgroundColor: "#fff", marginBottom: 80, marginTop: -25 }}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={onScrollEnd} // Sync current index
        onScrollBeginDrag={stopAutoplay} // Stop autoplay on drag
        onScrollEndDrag={startAutoplay} // Resume autoplay after drag
      />
      {renderPagination()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    marginBottom: 50,
    height: "72%",
  },
  slide: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 430,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
    textAlign: "center",
    lineHeight: 25,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "107%",
    width: "100%",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#bcf3f1",
  },
  inactiveDot: {
    backgroundColor: "#ccc",
  },
});
