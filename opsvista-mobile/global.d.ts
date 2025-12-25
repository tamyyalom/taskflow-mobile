// global.d.ts
import * as React from "react";

declare module "react-native" {
    // Loosen typings for core components to avoid bogus
    // "cannot be used as a JSX component" TS errors.

    export const View: React.ComponentType<any>;
    export const Text: React.ComponentType<any>;
    export const ActivityIndicator: React.ComponentType<any>;
    export const FlatList: React.ComponentType<any>;
    export const TouchableOpacity: React.ComponentType<any>;
    export const SafeAreaView: React.ComponentType<any>;
    export const StatusBar: React.ComponentType<any>;
    export const TextInput: React.ComponentType<any>;
    export const ScrollView: React.ComponentType<any>;
}
