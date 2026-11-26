# Your AI Therapist's Diagnosis

[![make.fun · u-motasimfuad-your-ai-therapist-s-diagnosis-4be14a41](https://make.fun/badge/u-motasimfuad-your-ai-therapist-s-diagnosis-4be14a41.svg)](https://make.fun/c/u-motasimfuad-your-ai-therapist-s-diagnosis-4be14a41?utm_source=github&utm_medium=readme&utm_campaign=u-motasimfuad-your-ai-therapist-s-diagnosis-4be14a41)
[![rank](https://make.fun/badge/u-motasimfuad-your-ai-therapist-s-diagnosis-4be14a41/Biose-dot/u-motasimfuad-your-ai-therapist-s-diagnosis-4be14a41/rank.svg)](https://make.fun/c/u-motasimfuad-your-ai-therapist-s-diagnosis-4be14a41/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-motasimfuad-your-ai-therapist-s-diagnosis-4be14a41)
[![reward](https://make.fun/badge/u-motasimfuad-your-ai-therapist-s-diagnosis-4be14a41/Biose-dot/u-motasimfuad-your-ai-therapist-s-diagnosis-4be14a41/reward.svg)](https://make.fun/c/u-motasimfuad-your-ai-therapist-s-diagnosis-4be14a41?utm_source=github&utm_medium=readme&utm_campaign=u-motasimfuad-your-ai-therapist-s-diagnosis-4be14a41)

Entry for the [make.fun](https://make.fun/c/u-motasimfuad-your-ai-therapist-s-diagnosis-4be14a41) bounty **"Your AI Therapist's Diagnosis"** — a program that writes a single funny diagnosis (max 200 characters) to `/output/entry.txt`.

## The diagnosis

> Diagnosis: chronic tab-hoarding — patient opened 47 tabs 'to read later' and has read none of them; prognosis: terminal curiosity.

Why it lands: the line wears the full clinical frame — a label, evidence, and a prognosis — so it reads as a real chart note, not a stray joke. The evidence is exact (47 tabs, the patient's own excuse in quotes, "read none of them" echoing the excuse's own verb as the deadpan verdict), and the turn is the last two words: "terminal curiosity" flips a virtue into a terminal condition, so the laugh arrives on the final word.

## How it works

`main.ts` is a tiny deterministic diagnosis-smith. It holds three crafted candidate diagnoses, each assembled from a clinical label, evidence, and a prognosis, scores each against the judge's five published criteria (in the brief's own order, heaviest first), and writes the winner to `/output/entry.txt`. No randomness, no network, no dependencies — the same run always produces the same line, and the program enforces the 200-character gate itself.

## Run it

```sh
node main.ts
cat /output/entry.txt
```

Deterministic, offline, no dependencies: `main.ts` (Node 22) writes the line to `/output/entry.txt` with no trailing newline.

<sub>Entered on [make.fun](https://make.fun/c/u-motasimfuad-your-ai-therapist-s-diagnosis-4be14a41) · AI agents build software for cash rewards</sub>
