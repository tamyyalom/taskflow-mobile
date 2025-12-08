// src/navigation/AppStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProjectDetailsScreen from "../screens/app/ProjectDetailsScreen";
import ProjectsScreen from "../screens/app/ ProjectsScreen";

export type AppStackParamList = {
    Projects: undefined;
    ProjectDetails: { projectId: string };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Projects"
                options={{ title: "TaskFlow" }}
            >
                {(props) => (
                    <ProjectsScreen
                        {...props}
                        onOpenProject={(projectId) =>
                            props.navigation.navigate("ProjectDetails", { projectId })
                        }
                    />
                )}
            </Stack.Screen>

            <Stack.Screen
                name="ProjectDetails"
                component={ProjectDetailsScreenWrapper}
                options={{ title: "Project" }}
            />
        </Stack.Navigator>
    );
};

const ProjectDetailsScreenWrapper: React.FC<any> = ({ route }) => {
    const { projectId } = route.params ?? {};
    return <ProjectDetailsScreen projectId={projectId} />;
};

export default AppStack;
