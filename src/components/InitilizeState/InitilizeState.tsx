'use client';

import { useAuth } from "@/redux/features/authentication/authService";
import { useEffect } from "react";

export default function InitilizeState() {

    const { getAuthentication } = useAuth();

    useEffect(() => {
        getAuthentication();
    }, []);

    return (
       <></>
    );
}
