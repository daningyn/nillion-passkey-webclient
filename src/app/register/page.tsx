'use client';

import { API } from "@/common/APIs";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { startRegistration } from '@simplewebauthn/browser';
import _ from "lodash";

export default function RegisterPage() {

    const [address, setAddress] = useState("");

    const onClickRegister = async () => {
        if (address.substring(0, 7) !== 'nillion') {
            toast.error("Invalid Nillion address");
            return
        }
        try {

            const { challengeOptions } = (await axios.post(API.REGISTRATION_CHALLENGE, { address })).data;

            let credential;
            try {
                credential = await startRegistration(challengeOptions) as any;
            } catch (error: any) {
                console.error(error);
                if (error.name === 'InvalidStateError') {
                    throw new Error('Error: Authenticator was probably already registered by user');
                } else {
                    throw new Error(error);
                }
            }

            if (!credential) {
                throw new Error('Cannot create credential');
            }

            console.log(credential);

            const verifyResponse = (await axios.post(API.REGISTRATION_VERIFY, { attestationResponse: credential, address })).data;
            if (verifyResponse.success) {
                toast.success('Register successfully!');
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
                        If you already have an account, please <Link className="underline text-primary-500" href="/login">Login</Link>
                    </span>
                </div>
            </div>
        </div>
    );

}
