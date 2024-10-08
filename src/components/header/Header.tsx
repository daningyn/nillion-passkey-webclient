'use client';

import Image from "next/image";
import Link from "next/link";
import { ThemeSwitcher } from "../ThemesSwitcher/ThemesSwitcher";
import { Button } from "@nextui-org/button";
import { useSelector } from "react-redux";
import { useAuth } from "@/redux/features/authentication/authService";

export default function Header() {

    const { isAuthenticated } = useSelector((state: any) => state.auth);

    const { logoutUser } = useAuth();

    return (
        <div className="header flex flex-col w-full bg-transparent py-8 px-2">
            <div className="header__content flex flex-row justify-between items-center w-full bg-transparent max-w-[1280px] m-auto">
                <Link href="/">
                    <Image
                        src="https://nillion.com/wp-content/uploads/2024/02/logo.svg"
                        alt="Nillion"
                        width={100}
                        height={30}
                    />
                </Link>
                <div className="header__nav flex flex-row justify-between gap-x-4 items-center">
                    {
                        !isAuthenticated ?
                            <>
                                <Link href="/register">
                                    <Button className="px-12 font-bold" color="primary" >
                                        Register
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button className="px-12 font-bold" color="secondary">
                                        Login
                                    </Button>
                                </Link>
                            </>
                            :
                            <Button className="px-12 font-bold" color="primary"
                                onClick={logoutUser}
                            >
                                Logout
                            </Button>
                    }
                    {/* <ThemeSwitcher /> */}
                </div>
            </div>
        </div>
    );
}
