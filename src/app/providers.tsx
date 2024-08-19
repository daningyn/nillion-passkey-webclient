"use client";
import { store } from "@/redux/stores/store";
import { NextUIProvider } from "@nextui-org/system";
import { Provider } from "react-redux";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import InitilizeState from "@/components/InitilizeState/InitilizeState";


export default function Providers({ children } : Readonly<{ children: React.ReactNode; }>) {

    return (
        <Provider store={store}>
            <NextUIProvider>
                <NextThemesProvider attribute="class" defaultTheme="dark">
                    <InitilizeState />
                    {children}
                </NextThemesProvider>
            </NextUIProvider>
        </Provider>
    );
}
