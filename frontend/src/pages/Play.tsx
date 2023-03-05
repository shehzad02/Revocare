import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../globals/firebase";

import { WebcamStreamCapture } from "../components/Webcam";

import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
// Register one of the TF.js backends.
import '@tensorflow/tfjs-backend-webgl';
import FrontPageLayout from "../components/layouts/FrontPageLayout";
// import '@tensorflow/tfjs-backend-wasm';

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