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

// Cliquetis de roue (type molette/cliquet) : un bruit très bref, filtré en
// bande étroite vers l'aigu, avec l'enveloppe de décroissance appliquée
// directement dans le buffer pour un transitoire net et sec — pas de souffle
// grave, qui donnait un son mou plutôt qu'un vrai "tic" mécanique.
function playTick(ctx: AudioContext, when: number) {
  const duration = 0.014;
  const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    const decay = 1 - i / bufferSize;
    data[i] = (Math.random() * 2 - 1) * decay * decay;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const highpass = ctx.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 1500;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.value = 3200;
  bandpass.Q.value = 1.1;

  source.connect(highpass);
  highpass.connect(bandpass);
  applyEnvelope(ctx, bandpass, when, duration, { gain: 0.4, attack: 0.0005, decay: duration - 0.0005 });
  source.start(when);
  source.stop(when + duration + 0.01);
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
