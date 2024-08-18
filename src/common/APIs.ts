
export const API = {
    REGISTRATION_CHALLENGE: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/generate-register-challenge`,
    REGISTRATION_VERIFY: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`,
    LOGIN_CHALLENGE: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/generate-authentication-challenge`,
    LOGIN_VERIFY: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/authenticate`,
}

