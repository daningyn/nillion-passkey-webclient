import Image from "next/image";

export default function Home() {

    return (
        <div className="main flex flex-col min-h-[calc(100vh_-_208px)] w-full justify-center items-center">
            <div className="main__content flex flex-col justify-center items-start w-full bg-transparent max-w-[1280px] m-auto px-4 gap-y-[100px]">
                <h1 className="text-[60px] font-bold text-center text-white">
                    Nillion decentralizes trust for sensitive data in the same way that blockchains decentralized transactions.
                </h1>
                <div className="main__content_description flex flex-col gap-y-[20px]">
                    <span className="text-[20px] text-white text-center">
                        We&apos;re in the midst of a data renaissance. Emerging ecosystems like personalized AI, decentralized trading and identity risk the safety, power and control of important data by entrusting it to one entity.
                    </span>
                    <span className="text-[20px] text-white text-center">
                        The Nillion thesis: Decentralized, private data will be the backbone of tomorrow&apos;s biggest industries - opening up a vast white space of web3 use cases and verticals.
                    </span>
                </div>
            </div>
        </div>
    );

}
