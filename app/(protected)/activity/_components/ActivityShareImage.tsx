'use client'
import { useState } from "react";
import { ShareImageServerAction } from "@/server-actions/ShareImageServerAction";
import { Button } from "@nextui-org/react";

export default function ActivityShareImage() {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const downloadImage = async () => {
        const base64 = await ShareImageServerAction();

        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/png' });

        const url = URL.createObjectURL(blob);

        setImageSrc(url);
    };

    return (
        <div>
            <Button onClick={downloadImage}>Download Image</Button>
            {imageSrc && <img src={imageSrc} alt="Workout" />}
        </div>
    )
}