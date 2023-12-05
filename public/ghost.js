import React from "react";

const Ghost = ({ w="200", h="200" }) => {
    return (
        <svg height={h} viewBox="-300 -300 1624 1624" width={w} xmlns="http://www.w3.org/2000/svg" fill="white">
                <path className="-x-y" d="m506.056 733.874v264.813l-51.241 25.211-176.269-265.428 139.375-139.375 88.134 114.78z"/>
                <path className="-x-y" d="m291.254 519.482h-266.043l-25.211 49.191 265.633 177.908 138.35-138.965-112.73-88.134z"/>
                <path className="-xy" d="m506.056 291.151v-265.838l-51.241-25.211-176.269 266.454 139.375 139.375 88.134-114.78z"/>
                <path className="-xy" d="m292.484 504.723h-266.454l-25.416-49.191 265.223-177.908 139.375 138.965-112.73 88.134z"/>
                <path className="x-y" d="m518.765 733.874v264.813l50.216 25.211 177.089-265.428-139.17-139.375-88.134 114.78z"/>
                <path className="x-y" d="m732.747 517.842h266.043l25.211 51.241-265.633 176.884-138.35-139.99 112.73-88.134z"/>
                <path className="xy" d="m518.765 291.151v-265.838l50.216-25.211 177.089 266.454-139.17 139.375-88.134-114.78z"/>
                <path className="xy" d="m731.517 506.363h266.454l25.416-51.241-265.223-176.884-139.375 139.99 112.73 88.134z"/>
                <path d="m512.411 630.571c-61.58 0-111.501-49.92-111.501-111.501s49.92-111.501 111.501-111.501c61.58 0 111.501 49.92 111.501 111.501-.116 61.533-49.967 111.384-111.489 111.501h-.011zm0-202.504c-50.26 0-91.004 40.744-91.004 91.004s40.744 91.004 91.004 91.004 91.004-40.744 91.004-91.004c0-50.26-40.744-91.004-91.004-91.004z"/>
                <path className="spin" d="m501.547 481.153v20.086l-16.192 15.987h-20.702v-7.993z"/>
                <path className="spin" d="m501.547 553.301v-20.086l-16.192-15.987h-20.702v7.993z"/>
                <path className="spin" d="m521.634 481.153v20.086l16.192 15.987h20.702v-7.993z"/>
                <path className="spin" d="m521.634 553.301v-20.086l16.192-15.987h20.702v7.993z"/>
                <path d="m521.634 519.277c0 5.547-4.496 10.043-10.043 10.043s-10.043-4.496-10.043-10.043 4.496-10.043 10.043-10.043 10.043 4.496 10.043 10.043z"/>
            </svg>
    )
}

export default Ghost;