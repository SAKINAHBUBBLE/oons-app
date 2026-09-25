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

// Petit "clic" de bois doux : bruit filtré + un souffle de sinusoïde grave.
function playTick(ctx: AudioContext, when: number) {
  const duration = 0.02;
  const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const lowpass = ctx.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = 3000;

  const highpass = ctx.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 300;

  source.connect(lowpass);
  lowpass.connect(highpass);
  applyEnvelope(ctx, highpass, when, duration, { gain: 0.22, attack: 0.001, decay: 0.01 });
  source.start(when);
  source.stop(when + duration + 0.02);

  const thump = ctx.createOscillator();
  thump.type = "sine";
  thump.frequency.value = 700;
  applyEnvelope(ctx, thump, when, duration, { gain: 0.16, attack: 0.001, decay: 0.012 });
  thump.start(when);
  thump.stop(when + duration + 0.02);
}

// Carillon fin joué à l'arrêt : une note principale + un léger scintillement.
function playStopChime(ctx: AudioContext, when: number) {
  const duration = 1.1;
  const base = 987.77; // B5

  const partials: Array<{ ratio: number; gain: number }> = [
    { ratio: 1, gain: 0.14 },
    { ratio: 2, gain: 0.028 },
    { ratio: 1.002, gain: 0.032 },
  ];

  for (const partial of partials) {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = base * partial.ratio;
    applyEnvelope(ctx, osc, when, duration, { gain: partial.gain, attack: 0.025, decay: 0.6 });
    osc.start(when);
    osc.stop(when + duration);
  }
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
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  playStopChime(ctx, ctx.currentTime + delayMs / 1000);
}
