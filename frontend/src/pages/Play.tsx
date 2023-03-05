import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../globals/firebase";
import { WebcamStreamCapture } from "../components/Webcam";
import FrontPageLayout from "../components/layouts/FrontPageLayout";

export function Play(){

    const nav = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
              nav("/login");
            }
          });
    }, [])
    
    return (
        <FrontPageLayout>
            <WebcamStreamCapture />
        </FrontPageLayout>
    )
}