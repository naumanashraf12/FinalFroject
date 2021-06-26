import React from "react";
import "./hero.css";
import { Button } from "../layout/Button";
import "./HeroSection.css";

function HeroSection() {
  return (
    <div className="hero-container">
      <h1>Mechanic At ur Door Step</h1>
      <p>Save ur precise time</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          path="/login"
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
