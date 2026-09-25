"use client";

import { useEffect, useState } from "react";
import styles from "./QuestionTimer.module.css";

interface QuestionTimerProps {
  seconds: number;
}

type TimerStatus = "idle" | "running" | "done";

// Remonté avec une `key` par question (voir QuestionScreen) : chaque instance
// démarre donc déjà avec le bon `seconds`, pas besoin de le resynchroniser.
export function QuestionTimer({ seconds }: QuestionTimerProps) {
  const [remaining, setRemaining] = useState(seconds);
  const [status, setStatus] = useState<TimerStatus>("idle");

  useEffect(() => {
    if (status !== "running") return;

    const interval = setInterval(() => {
      setRemaining((previous) => {
        if (previous <= 1) {
          clearInterval(interval);
          setStatus("done");
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  function handleClick() {
    setRemaining(seconds);
    setStatus("running");
  }

  return (
    <div className={styles.timer}>
      <span className={`${styles.display} ${status === "done" ? styles.done : ""}`}>
        {status === "done" ? "Temps écoulé !" : `${remaining}s`}
      </span>
      <button type="button" className={styles.button} onClick={handleClick}>
        {status === "idle" ? "Démarrer le chrono" : "Relancer le chrono"}
      </button>
    </div>
  );
}
