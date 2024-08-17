import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import Header from "@/components/header/Header";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Nillion Passkey Authentication Webapp",
    description: "Nillion Passkey Authentication Webapp",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Head>
                <link rel="icon" href="https://nillion.com/wp-content/themes/nillion/assets/images/favicon.png" />
            </Head>
            <body className={inter.className}>
                <NextUIProvider>
                    <NextThemesProvider attribute="class" defaultTheme="dark">
                        <Header />
                        <ToastContainer
                            position='top-right'
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            draggable
                            pauseOnHover={false}
                            pauseOnFocusLoss={false}
                            theme='light'
                        />
                        {children}
                    </NextThemesProvider>
                </NextUIProvider>
            </body>
        </html>
    );
}
