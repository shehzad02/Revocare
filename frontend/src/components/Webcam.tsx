import { useCallback, useEffect, useRef, useState } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
import styled from "styled-components";

const Video = styled.video`
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  visibility: hidden;
  position: absolute;
  width: 1800px;
  height: 800px;
`;

const Canvas = styled.canvas`
  width: 1800px;
  height: 800px;
`;

const WebCamContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
`;

export const WebcamStreamCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [model, setModel] = useState<poseDetection.PoseDetector>();

  const loadModel = useCallback(async () => {
    const model = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
      }
    );
    setModel(model);
  }, []);

  useEffect(() => {
    loadModel();
  }, []);

  function drawKeypoints(
    keypoints: poseDetection.Keypoint[],
    ctx: CanvasRenderingContext2D
  ) {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "White";
    ctx.lineWidth = 2;
    for (let i = 0; i < keypoints.length; i++) {
      drawKeypoint(keypoints[i], ctx);
    }
  }

  function drawKeypoint(
    keypoint: poseDetection.Keypoint,
    ctx: CanvasRenderingContext2D,
    scoreThreshold = 0.4
  ) {
    const radius = 4;
    if (keypoint.score && keypoint.score && keypoint.score >= scoreThreshold) {
      const circle = new Path2D();
      circle.arc(keypoint.x, keypoint.y, radius, 0, 2 * Math.PI);
      ctx.fill(circle);
      ctx.stroke(circle);
    }
  }

  function drawSkeleton(
    keypoints: poseDetection.Keypoint[],
    ctx: CanvasRenderingContext2D
  ) {
    const color = "#fff";
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    poseDetection.util
      .getAdjacentPairs(poseDetection.SupportedModels.MoveNet)
      .forEach(([i, j]) => {
        const kp1 = keypoints[i];
        const kp2 = keypoints[j];
        if (kp1.score && kp2.score && kp1.score > 0.4 && kp2.score > 0.4) {
          ctx.beginPath();
          ctx.moveTo(kp1.x, kp1.y);
          ctx.lineTo(kp2.x, kp2.y);
          ctx.stroke();
        }
      });
  }

  async function predictPoses() {
    if (model) {
      const video = videoRef.current;
      if (video) {
        const poses = await model.estimatePoses(video, {
          flipHorizontal: false,
        });
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        if (poses && poses.length > 0) {
          for (const pose of poses) {
            if (pose.keypoints != null) {
              drawKeypoints(pose.keypoints, ctx);
              drawSkeleton(pose.keypoints, ctx);
            }
          }
        }
        requestAnimationFrame(predictPoses);
      }
    }
  }


  const [isVideoActive, setIsVideoActive] = useState(false);

  async function init(){
    await activateVideo();
  };

  async function closeVideo() {
    const video = videoRef.current;
        if (video) {
            const stream = video.srcObject;
            if(stream instanceof MediaStream)
            stream.getTracks().forEach(track => track.stop());
            video.srcObject = null;
        }
    }


  useEffect(() => {
    if(isVideoActive)
        init();
    else
        closeVideo();
  }, [isVideoActive]);




  async function activateVideo() {
    const video = videoRef.current;
    if (video) {
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({
            video: {
              facingMode: "user",
              width: 1200,
              height: 400,
            },
          })
          .then(function (stream) {
            const video = videoRef.current;
            if (video) {
              video.srcObject = stream;
            }
          })
          .catch(function (error) {
            console.log("Something went wrong!");
          });

        video.onloadedmetadata = () => {
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;

          video.width = videoWidth;
          video.height = videoHeight;

          const canvas = canvasRef.current;

          if (canvas) {
            canvas.width = videoWidth;
            canvas.height = videoHeight;

            const ctx = canvas.getContext("2d");
            // Because the image from camera is mirrored, need to flip horizontally.
            if (ctx) {
              ctx.translate(videoWidth, 0);
              ctx.scale(-1, 1);
            }
          }
        };

        video.addEventListener("loadeddata", predictPoses);
      }
    }
  }

  return (
    <WebCamContainer>
      <Video ref={videoRef} autoPlay playsInline muted />
      <Canvas ref={canvasRef} />
      <button onClick={() => setIsVideoActive(!isVideoActive)}>{!isVideoActive? "Turn on" : "Turn off"}</button>
    </WebCamContainer>
  );
};
