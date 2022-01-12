import React from 'react';

export default function Video({setvideo_status}) {
    React.useEffect(() => {
       setvideo_status(true);
    }, [setvideo_status]);

    return (
        <div className="">
            <iframe
                title="video-kyc"
                src="https://whereby.com/moyyn"
                allow="camera; microphone; fullscreen; speaker; display-capture"
                className="w-100"
                style={{minHeight:"86.35vh"}}
            ></iframe>
        </div>
    )
}
