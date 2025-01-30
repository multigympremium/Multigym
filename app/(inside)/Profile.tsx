import {
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useClerk } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-react";

export default function Profile() {
  const { signOut }: any = useClerk();
  const { isSignedIn }: any = useAuth();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      {!isSignedIn ? (
        <>
          <View className="flex-row justify-center gap-8 mb-20 bg-red-500">
            <TouchableOpacity className="px-6 py-3 bg-black rounded-full">
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 10,
                  backgroundColor: "#bcf3f1",
                  width: "90%",
                  height: 50,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Text style={{ textAlign: "center", backgroundColor: "" }}>
                  Profile
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <TouchableOpacity
            className="px-6 py-3 bg-black rounded-full"
            onPress={signOut}
          >
            <Text
              className="text-lg text-white rounded-full "
              style={{
                fontSize: 15,
                textAlign: "center",
                lineHeight: 50,
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
