import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../globals/firebase";

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
        <div>
            <h1>Top Secret</h1>
        </div>
    )
}