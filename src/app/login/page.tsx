'use client';

import { API } from "@/common/APIs";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { startAuthentication } from "@simplewebauthn/browser";
import axios from "@/common/axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/features/authentication/authSlice";
import { RootState } from "@/redux/stores/store";

export default function Login() {

    const [address, setAddress] = useState("");

    const dispath = useDispatch();

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    const onClickLogin = async () => {
        if (address.substring(0, 7) !== 'nillion') {
            toast.error("Invalid Nillion address");
            return
        }
        try {

            let credential;
            try {

                const { challengeOptions } = (await axios.post(API.LOGIN_CHALLENGE, { address })).data;

                credential = await startAuthentication(challengeOptions) as any;

            } catch (error: any) {
                switch (error.name) {
                    case 'InvalidStateError':
                        throw new Error('Error: Authenticator was probably already registered by another user');
                    case 'NotAllowedError':
                        throw new Error('Error: Authenticator is a must for registration');
                    default:
                        throw error;
                }
            }

            if (!credential) {
                throw new Error('Cannot create credential');
            }

            const verifyResponse = (await axios.post(API.LOGIN_VERIFY, { attestationResponse: credential, address })).data;

            if (verifyResponse.success) {
                toast.success('Login successfully!');
                const jwt = _.get(verifyResponse, 'results.jwt', '');
                localStorage.setItem('jwt', jwt);
                dispath(setUser(verifyResponse.results));
            }

        } catch (e: any) {
            console.log(e);
            const message = _.get(e, 'response.data.error', _.get(e, 'response.data', e.message));
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
                                    onClick={onClickLogin}
                                >
                                    Login
                                </Button>
                                <span className="text-lg text-center text-white">
                                    If you have not had an account yet, please <Link className="underline text-primary-800 font-bold" href="/register">Register</Link>
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
