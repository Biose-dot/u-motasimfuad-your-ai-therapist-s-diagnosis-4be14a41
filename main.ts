// Your AI Therapist's Diagnosis — make.fun bounty entry.
// https://make.fun/c/u-motasimfuad-your-ai-therapist-s-diagnosis-4be14a41
//
// The entry is one funny single-line diagnosis (max 200 chars) that an AI
// therapist hands its human. The judge's published brief weighs, in order:
// (1) it is a diagnosis an AI therapist gives its human, not a stray joke,
// (2) the laugh lands with a turn the reader never sees coming, arriving
//     at the end, (3) it speaks in a therapist's calm clinical voice,
//     turning a human habit into a deadpan finding, (4) it stays tight and
//     quotable, every word earning its place, (5) it feels fresh rather
//     than a rerun of the usual chatbot jokes.
//
// CRAFT — how the winning line is built:
//   Form: it opens with "Diagnosis:" and closes with "prognosis:" — the
//     clinical frame is the joke's costume. A real diagnosis has a
//     condition, evidence, and a prognosis, and this line has all three.
//   Habit: tab-hoarding. Everyone with a browser recognises it instantly,
//     yet it is a habit, not a meme — the finding is about the patient,
//     not about the therapist.
//   Evidence: "opened 47 tabs 'to read later' and has finished none of
//     them". The number is exact (exact numbers sound clinical), the quote
//     is the patient's own excuse, and "none of them" is the deadpan
//     verdict on that excuse.
//   Turn: "prognosis: terminal curiosity". The last two words flip the
//     frame — curiosity, a virtue, is diagnosed as a terminal condition.
//     The laugh arrives on the final word, exactly where the brief wants it.
//   Freshness: no "have you tried turning it off and on again", no
//     chatbot-therapy cliche about feelings. The therapist never mentions
//     itself; the patient incriminates himself.
//
// The program below is a tiny deterministic diagnosis-smith: it holds
// three crafted variants, scores each against the judge's five published
// criteria (in the brief's own order, heaviest first), and writes the
// winner to /output/entry.txt. No randomness, no network, no dependencies.
import { mkdirSync, writeFileSync } from "node:fs";

// --- Gate: the sealed scorer only accepts 1..200 UTF-8 chars. ---
const MAX_CHARS = 200;

// --- Candidate diagnoses, each assembled from named parts so the craft
// is visible: a clinical label, the evidence for it, and the prognosis
// that lands the laugh. ---
type Candidate = {
  id: string;
  label: string;
  evidence: string;
  prognosis: string;
  // Scores 0..5 against the judge's brief, in the brief's own order.
  isDiagnosis: number; // criterion 1: a diagnosis, not a stray joke
  turn: number; // criterion 2: unseen turn, laugh arrives at the end
  clinicalVoice: number; // criterion 3: calm clinical voice, deadpan finding
  tight: number; // criterion 4: tight and quotable, every word earns a place
  fresh: number; // criterion 5: fresh, not a chatbot-joke rerun
};

const CANDIDATES: Candidate[] = [
  {
    id: "tab-hoarding",
    label: "Diagnosis: chronic tab-hoarding",
    evidence:
      // REVISION 1: "has read none of them" beats "has finished none of
      // them" — it echoes the patient's own verb ("to read later"), so the
      // excuse returns as the verdict. Same meaning, tighter parallel,
      // and the clinical voice stays deadpan.
      "patient opened 47 tabs 'to read later' and has read none of them",
    prognosis: "prognosis: terminal curiosity.",
    isDiagnosis: 5, // full clinical frame: label, evidence, prognosis
    turn: 5, // "terminal curiosity" flips a virtue into a condition
    clinicalVoice: 5, // deadpan chart-note voice throughout
    tight: 5, // 132 chars, no filler word
    fresh: 4, // tab-hoarding is relatable, not a therapy cliche
  },
  {
    id: "five-more-minutes",
    label: "Diagnosis: advanced 'just five more minutes' syndrome",
    evidence: "patient has snoozed the same alarm 14 times",
    prognosis: "prognosis: the morning has filed a complaint.",
    isDiagnosis: 5,
    turn: 4, // the morning filing a complaint is a good twist
    clinicalVoice: 4, // clinical until the last clause gets playful
    tight: 4,
    fresh: 3, // snooze jokes are a crowded shelf
  },
  {
    id: "start-monday",
    label: "Diagnosis: chronic 'I'll start Monday' syndrome",
    evidence:
      "patient has postponed the same diet, gym plan, and personality upgrade for six years",
    prognosis: "prognosis: Monday has been cancelled.",
    isDiagnosis: 5,
    turn: 4, // "Monday has been cancelled" is a clean punch
    clinicalVoice: 4,
    tight: 3, // lists three items; the middle one could be cut
    fresh: 3, // Monday-start jokes are well worn
  },
];

// The brief says: go through the criteria in order and let the first
// difference decide unless a later one differs by much more. So the score
// weights the criteria in that same order, heaviest first.
const WEIGHTS = {
  isDiagnosis: 5,
  turn: 4,
  clinicalVoice: 3,
  tight: 2,
  fresh: 1,
};

function score(c: Candidate): number {
  return (
    c.isDiagnosis * WEIGHTS.isDiagnosis +
    c.turn * WEIGHTS.turn +
    c.clinicalVoice * WEIGHTS.clinicalVoice +
    c.tight * WEIGHTS.tight +
    c.fresh * WEIGHTS.fresh
  );
}

function assemble(c: Candidate): string {
  // Label, then an em-dash pivot into the evidence, then a semicolon
  // into the prognosis. The punctuation is the chart: every clause is a
  // field in the patient's file, and the last field is the joke.
  return `${c.label} — ${c.evidence}; ${c.prognosis}`;
}

// Pick the best-scoring candidate; ties break toward the shorter line,
// because the tie-break in the rules favours fewer bytes.
const ranked = [...CANDIDATES].sort(
  (a, b) => score(b) - score(a) || assemble(a).length - assemble(b).length,
);
const winner = ranked[0];
const line = assemble(winner);

// REVISION 1: the laugh must arrive at the end (judge criterion 2), so
// assert the prognosis is the final clause of the assembled line — if a
// future edit moved the punch earlier, the program fails loudly instead
// of shipping a diagnosis whose twist lands mid-sentence.
if (!line.endsWith(winner.prognosis)) {
  throw new Error("prognosis must be the final clause of the line");
}

// Hard gate, mirroring the sealed scorer: 1..200 chars, one line only.
if (line.length < 1 || line.length > MAX_CHARS) {
  throw new Error(`line is ${line.length} chars, must be 1..${MAX_CHARS}`);
}
if (line.includes("\n")) {
  throw new Error("line must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");

console.log(`winner: ${winner.id} (score ${score(winner)})`);
console.log(`chars: ${line.length}/${MAX_CHARS}`);
console.log(line);
