// src/navigation/AppStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EnvironmentsScreen from "../screens/app/EnvironmentsScreen";
import ServicesScreen from "../screens/app/ServicesScreen";
import ServiceDetailsScreen from "../screens/app/ServiceDetailsScreen";

export type AppStackParamList = {
    Environments: undefined;
    Services: { environmentId: string; environmentName: string };
    ServiceDetails: { serviceId: string };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const EnvironmentsRouteScreen: React.FC<any> = (props) => {
    return (
        <EnvironmentsScreen
            {...props}
            onSelectEnvironment={(env: { id: string; name: string }) =>
                props.navigation.navigate("Services", {
                    environmentId: env.id,
                    environmentName: env.name,
                })
            }
        />
    );
};

const ServicesRouteScreen: React.FC<any> = (props) => {
    const { environmentId, environmentName } = props.route.params;
    return (
        <ServicesScreen
            {...props}
            environmentId={environmentId}
            environmentName={environmentName}
            onOpenService={(serviceId: string) =>
                props.navigation.navigate("ServiceDetails", { serviceId })
            }
        />
    );
};

const ServiceDetailsRouteScreen: React.FC<any> = (props) => {
    const { serviceId } = props.route.params;
    return <ServiceDetailsScreen {...props} serviceId={serviceId} />;
};

const AppStack: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Environments"
                component={EnvironmentsRouteScreen}
                options={{ title: "OpsVista" }}
            />

            <Stack.Screen
                name="Services"
                component={ServicesRouteScreen}
                options={({ route }) => ({ title: route.params.environmentName })}
            />

            <Stack.Screen
                name="ServiceDetails"
                component={ServiceDetailsRouteScreen}
                options={{ title: "Service details" }}
            />
        </Stack.Navigator>
    );
};

export default AppStack;
