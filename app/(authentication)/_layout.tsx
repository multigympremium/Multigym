import { Redirect, Slot, Stack } from "expo-router";
import { useSession } from "../ctx";

export default function Layout() {
  const { session, isLoading } = useSession();
  if (isLoading) {
    return null;
  }
  if (session) {
    return <Redirect href="/inside" />;
  }
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    ></Stack>
  );
}
