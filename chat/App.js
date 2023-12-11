import {AppState} from "react-native";
import {Provider} from "react-redux";
import {persistor, store} from "./store";
import {PersistGate} from "redux-persist/integration/react";
import {Provider as PaperProvider} from "react-native-paper";
import Navigation from "./components/navigation";
import {SWRConfig} from "swr";

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SWRConfig
                    value={{
                        provider: () => new Map(),
                        isVisible: () => { return true },
                        initFocus(callback) {
                            let appState = AppState.currentState

                            const onAppStateChange = (nextAppState) => {
                                /* If it's resuming from background or inactive mode to active one */
                                if (appState.match(/inactive|background/) && nextAppState === 'active') {
                                    callback()
                                }
                                appState = nextAppState
                            }

                            // Subscribe to the app state change events
                            const subscription = AppState.addEventListener('change', onAppStateChange)

                            return () => {
                                subscription.remove()
                            }
                        }
                    }}
                >
                <PaperProvider>
                    <Navigation />
                </PaperProvider>
                </SWRConfig>
            </PersistGate>
        </Provider>
    );
}
