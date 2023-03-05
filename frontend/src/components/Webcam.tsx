import { useCallback, useEffect, useRef, useState } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
import styled from "styled-components";
import { NavBarItemButton } from "./layouts/NavBar";
import { imageMap } from "../globals/imageMap";

const Video = styled.video`
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  visibility: hidden;
  position: absolute;
  width: 900px;
  height: 400px;
`;

const Canvas = styled.canvas`
  // 1800px
  // 800px
  width: 900px;
  height: 400px;
`;

const WebCamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

const FadeInLabel = styled.h1<{
  length: string;
}>`
  color: white;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  animation: fadeIn ${(props) => props.length} ease-in-out forwards;
`;

const StyledDropDown = styled.select`
  background-color: #f2f2f2;
  border: none;
  color: black;

  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
  width: 200px;
  height: 50px;
  font-size: 1.5rem;
`;

const BodyText = styled.p`
  color: white;
`;

const FadeInDiv = styled.div<{
  length: string;
}>`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  animation: fadeIn ${(props) => props.length} ease-in-out forwards;
`;

const GuideImage = styled.img`
  height: 400px;
  width: 100%;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  animation: fadeIn 1sec ease-in-out forwards;
`;

const WarningText = styled.p`
  color: red;
`;

export const WebcamStreamCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [model, setModel] = useState<poseDetection.PoseDetector>();
  const [step, setStep] = useState<number>(0);
  const [selectedExercise, setSelectedExercise] = useState<number>(0);

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
              console.log(pose.keypoints)
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

  async function init() {
    await activateVideo();
  }

  async function closeVideo() {
    const video = videoRef.current;
    if (video) {
      const stream = video.srcObject;
      if (stream instanceof MediaStream)
        stream.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
    }
  }

  useEffect(() => {
    if (isVideoActive) init();
    else closeVideo();
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

  const mapExercises = [
    "Bird 1",
    "Bird 2",
    "Bear 1",
    "Deer 1",
    "Monkey 1",
    "Monkey 2",
    "Tiger 1",
  ];

  const [slowDown, setSlowDown] = useState<boolean>(false);

  setTimeout(() => {
    if (step === 2)
      fetch(
        "https://bennycortese--zoom-fastapi-app.modal.run/exceed_threshold",
        {
          method: "GET",
        }
      ).then(async (res) => {
        if (res.status === 200) {
          const body = await res.json();
          setSlowDown(!body["thresh"]);
        } else {
          throw new Error("Something went wrong");
        }
      });
  }, 1000);

  return (
    <WebCamContainer>
      <div style={{ width: "500px", textAlign: "center" }}>
        {step === 0 && selectedExercise !== -1 && (
          <>
            <FadeInLabel length="2s">Hi there!</FadeInLabel>
            <FadeInLabel length="5s">
              Welcome to the Revocare Training Center!
            </FadeInLabel>
            <FadeInLabel length="6s">
              This tool is designed to help you practice exercises that are
              clinically proven to improve your tremors!
            </FadeInLabel>
            <FadeInLabel length="9s">
              First you'll need to select an exercise to practice.
            </FadeInLabel>
            <FadeInDiv length="10s">
              <StyledDropDown
                onChange={(e) => {
                  setSelectedExercise(parseInt(e.target.value));
                  setStep(1);
                }}
              >
                <option value="-1"></option>
                <option value="0">Bird 1</option>
                <option value="1">Bird 2</option>
                <option value="2">Bear 1</option>
                <option value="3">Deer 1</option>
                <option value="4">Monkey 1</option>
                <option value="5">Monkey 2</option>
                <option value="6">Tiger 1</option>
              </StyledDropDown>
            </FadeInDiv>
          </>
        )}

        {step === 1 && selectedExercise !== -1 && (
          <>
            <FadeInLabel length="3s">
              You have selected {mapExercises[selectedExercise]}
            </FadeInLabel>
            <FadeInLabel length="5s">
              To perform each exercise, start from rest and as smooth as you can
              try to hold the position displayed on the screen for 7 seconds
              while breathing in.
            </FadeInLabel>
            <FadeInLabel length="7s">
              Repeat this and rest in between for a second. You can use the
              video feed to help you with your form.
            </FadeInLabel>
            <FadeInDiv
              length="10s"
              style={{
                height: "90px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <NavBarItemButton
                onClick={() => {
                  setStep(2);
                }}
              >
                Click Here to Continue
              </NavBarItemButton>
            </FadeInDiv>
          </>
        )}
        {step === 2 && (
          <>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              <FadeInDiv length="10sec">
                {" "}
                <Video ref={videoRef} autoPlay playsInline muted />
                <Canvas ref={canvasRef} />
                <button onClick={() => setIsVideoActive(!isVideoActive)}>
                  {!isVideoActive ? "Turn on" : "Turn off"}
                </button>
              </FadeInDiv>
              <GuideImage src={imageMap[selectedExercise]} />
            </div>
            <WarningText>{slowDown ? "Slow down!" : ""}</WarningText>
          </>
        )}
      </div>
    </WebCamContainer>
  );
};
