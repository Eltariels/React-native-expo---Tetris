import { useState, useEffect } from "react";
import { Slot, useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TetrisProvider } from "@/context/TetrisContext";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Layout() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const currentUser = await AsyncStorage.getItem("currentUser");
            setIsAuthenticated(!!currentUser);
        };

        checkAuth();
    }, []);

    useEffect(() => {
        if (isAuthenticated === false) {
            router.replace("/auth");
        }
    }, [isAuthenticated]);

    if (isAuthenticated === null) return null;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <TetrisProvider>
                <View style={{ flex: 1, backgroundColor: "#000" }}>
                    <Slot />
                </View>
            </TetrisProvider>
        </GestureHandlerRootView>
    );
}
