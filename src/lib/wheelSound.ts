"use client";

// Sons de la roue synthétisés en direct (Web Audio API) — aucun fichier audio
// à charger, et surtout un timing parfaitement calé sur le ralentissement
// réel de la roue (voir computeTickDelaysMs dans Wheel.tsx).

const STORAGE_KEY = "oons-sound-enabled";

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext;
  if (!Ctor) return null;
  if (!audioContext) {
    audioContext = new Ctor();
  }
  if (audioContext.state === "suspended") {
    void audioContext.resume();
  }
  return audioContext;
}

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw === null ? true : raw === "1";
  } catch {
    return true;
  }
}

export function setSoundEnabled(enabled: boolean) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
  } catch {
    // localStorage indisponible (navigation privée, quota...) : on continue sans persister.
  }
}

interface EnvelopeOptions {
  gain: number;
  attack: number;
  decay: number;
}

function applyEnvelope(ctx: AudioContext, node: AudioNode, when: number, duration: number, env: EnvelopeOptions) {
  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0, when);
  gainNode.gain.linearRampToValueAtTime(env.gain, when + env.attack);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, when + env.attack + env.decay);
  node.connect(gainNode);
  gainNode.connect(ctx.destination);
  return gainNode;
}

// Cliquetis de roue façon cliquet/ressort (type "wheel of fortune") : un
// petit "tock" tonal et amorti (une brève note qui chute légèrement en
// hauteur) combiné à un souffle de bruit très court pour l'attaque du choc —
// plus rond et moins perçant qu'un simple bruit filtré en aigu.
function playTick(ctx: AudioContext, when: number) {
  const toneDuration = 0.03;
  const tone = ctx.createOscillator();
  tone.type = "triangle";
  tone.frequency.setValueAtTime(1300, when);
  tone.frequency.exponentialRampToValueAtTime(850, when + 0.02);
  applyEnvelope(ctx, tone, when, toneDuration, { gain: 0.28, attack: 0.001, decay: 0.026 });
  tone.start(when);
  tone.stop(when + toneDuration + 0.01);

  const noiseDuration = 0.006;
  const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * noiseDuration));
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    const decay = 1 - i / bufferSize;
    data[i] = (Math.random() * 2 - 1) * decay;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.value = 1700;
  bandpass.Q.value = 0.8;

  source.connect(bandpass);
  applyEnvelope(ctx, bandpass, when, noiseDuration, { gain: 0.16, attack: 0.0003, decay: noiseDuration - 0.0003 });
  source.start(when);
  source.stop(when + noiseDuration + 0.005);
}

// Son d'arrêt : fichier fourni par l'utilisateur, joué via un simple élément
// <audio> (pas besoin de décodage Web Audio pour un son déclenché une fois).
let stopAudio: HTMLAudioElement | null = null;

function getStopAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!stopAudio) {
    stopAudio = new Audio("/sounds/wheel-stop.mp3");
    stopAudio.preload = "auto";
  }
  return stopAudio;
}

export function scheduleWheelTicks(delaysMs: number[]) {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  for (const delayMs of delaysMs) {
    playTick(ctx, now + delayMs / 1000);
  }
}

export function scheduleWheelStop(delayMs: number) {
  const audio = getStopAudio();
  if (!audio) return;
  window.setTimeout(() => {
    if (!isSoundEnabled()) return;
    audio.currentTime = 0;
    void audio.play().catch(() => {
      // Lecture bloquée (politique navigateur) : sans impact critique.
    });
  }, delayMs);
}
