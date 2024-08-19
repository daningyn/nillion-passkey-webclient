'use client';

import { API } from "@/common/APIs";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import axios from "@/common/axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { startRegistration } from '@simplewebauthn/browser';
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/stores/store";
import { setUser } from "@/redux/features/authentication/authSlice";

export default function RegisterPage() {

    const [address, setAddress] = useState("");

    const dispath = useDispatch();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    const onClickRegister = async () => {
        if (address.substring(0, 7) !== 'nillion') {
            toast.error("Invalid Nillion address");
            return
        }
        try {

            let credential;
            try {

                const { challengeOptions } = (await axios.post(API.REGISTRATION_CHALLENGE, { address })).data;

                credential = await startRegistration(challengeOptions) as any;

            } catch (error: any) {
                switch (error.name) {
                    case 'InvalidStateError':
                        throw new Error('Error: Authenticator was probably already registered by user');
                    case 'NotAllowedError':
                        throw new Error('Error: Authenticator is a must for registration');
                    default:
                        throw error;
                }
            }

            if (!credential) {
                throw new Error('Cannot create credential');
            }

            const verifyResponse = (await axios.post(API.REGISTRATION_VERIFY, { attestationResponse: credential, address })).data;
            if (verifyResponse.success) {
                toast.success('Register successfully!');
                const jwt = _.get(verifyResponse, 'results.jwt', '');
                localStorage.setItem('jwt', jwt);
                dispath(setUser(verifyResponse.results));
            }

        } catch (e: any) {
            console.log(e);
            const message = _.get(e, 'response.data.error', e.message);
            toast.error(message);
        }
    }

    return (
        <div className="main flex flex-col min-h-[calc(100vh_-_208px)] w-full justify-center items-center">
            <div className="form flex flex-col w-[50%] bg-blue-600 p-12 rounded-lg shadow-lg gap-y-12">
                {
                    !isAuthenticated ?
                        <>
                            <Input
                                isRequired
                                size="lg"
                                key={"outside"}
                                type="text"
                                label="Your Nillion Address"
                                labelPlacement={"outside"}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                classNames={{
                                    input: [
                                        "dark:text-white"
                                    ],
                                    label: [
                                        "text-white"
                                    ]
                                }}
                            />
                            <div className="nav flex flex-col gap-y-4">
                                <Button className="w-full rounded-lg p-[26px] text-xl bg-white text-blue-700"
                                    onClick={onClickRegister}
                                >
                                    Register
                                </Button>
                                <span className="text-lg text-center text-white">
                                    If you already have an account, please <Link className="underline text-primary-800 font-bold" href="/login">Login</Link>
                                </span>
                            </div>
                        </>
                        :
                        <>
                            <h1 className="text-4xl text-white font-semibold text-center">Welcome to Nillion</h1>
                        </>
                }
            </div>
        </div>
    );

}
