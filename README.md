# Nillion Passkey Integration

## Introduction

Passkey is a new authentication method based on the WebAuthn and FIDO2 standards. It allows users to register and log in to systems without needing a password. Instead, users utilize biometric data or a PIN on their device to create and use a private key stored securely on the device.

In this project, we'll guide you through integrating passkey authentication into a Next.js application. The goal is to build a secure, passwordless authentication system compatible with both mobile devices and desktop computers in Nillion Network

## Example Live

You can check out the live example at [Live example](https://nillion-passkey-demo.daningyn.xyz/)

## Features

- **Passwordless Authentication**
- **Strong Security**
- **Anti-Phishing**
- **Biometric Integration**
- **Privacy-Focused**
- **Easy Recovery Options**

## Local Client Setup

### System Requirements

- Node.js (version 14.x or later)
- npm (version 6.x or later) or Yarn
- A modern web browser with WebAuthn support

### Installation

1. **Clone the repo**

```bash
git clone https://github.com/daningyn/nillion-passkey-webclient.git
cd nillion-passkey-webclient
```

2. **Setup environment variables in `.env`**

```bash
NEXT_PUBLIC_BACKEND_URL="http://localhost:3000"
```

3. **Install Dependencies**

```bash
npm install
```
4. **Run the Application**

```bash
npm run dev
```

## License

This project is licensed under the MIT License - see the [MIT](https://choosealicense.com/licenses/mit/) file for details.

MIT License

Copyright (c) 2024 daningyn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Contact

For any questions or issues, please open an issue on the GitHub repository or contact us via email at `daningyn@t4e.xyz`.

Thank you for using and contributing to the Nillion Passkey Webclient!