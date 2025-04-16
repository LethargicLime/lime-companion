import { authorize, GetToken } from "@/components/Destiny/Fetch";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import GitIcon from "@/public/GitHub-Mark-64px.png";
import { update } from "@react-spring/web";

export default function Page() {
    const images = require.context("@/public/HomeScreenImages", true, /./);
    const imageObject = images.keys().map(image => images(image));
    const [ keys, updateKeys ] = useState<any>([]);

    const handleAuthorize = () => {
        if (typeof window !== "undefined") {
            authorize();
        }
    }

    useEffect(() => {
        let tempKeys = [];

        while (tempKeys.length != 4) {
            let key = Math.floor(Math.random() * imageObject.length);
    
            tempKeys.includes(key) || tempKeys.push(key);
        }

        console.log(imageObject);

        updateKeys(tempKeys);
    }, []);

    return (
        <>
            <div className={"flex flex-col justify-center items-center bg-[#363636] h-screen"} style={{
            }}>
                {<Image className="top-left" src={imageObject[keys[0]]} alt="blurredBackground" />}
                {<Image className="bottom-left" src={imageObject[keys[1]]} alt="blurredBackground" />}
                {<Image className="top-right" src={imageObject[keys[2]]} alt="blurredBackground" />}
                {<Image className="bottom-right" src={imageObject[keys[3]]} alt="blurredBackground" />}

                <div className="bg-[#808080] p-5 rounded-md content-center text-center w-96" style={{ marginLeft: "850px" }}>
                    <div className="font-bold text-xl">
                        Lime Companion
                    </div>
                    <div className="mt-4">
                        The Bungie API requires authorization for transacts outside of basic
                        information; because of this, I require that you authorize your
                        account. No account information is collected or stored, but login is
                        required to allow me to collect your character&apos;s information with OAuth
                        access.
                        <br />
                        <br />
                    </div>

                    <button className="w-60 py-2 rounded-md font-bold bg-gray-500" style={{
                    }} onClick={handleAuthorize}>Authorize</button>
                </div>
                <div className={"absolute bottom-0 right-0 bg-[#363636] p-1"}>
                    <a href="https://github.com/LethargicLime/lime-companion?tab=readme-ov-file">
                        <Image src={GitIcon} alt="GitHub" width={32} height={32} />
                    </a>
                </div>
            </div>
        </>
    )
}