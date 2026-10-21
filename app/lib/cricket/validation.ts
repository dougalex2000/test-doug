import { MENTOR_CAPABILITIES, type CricketContext } from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isPerson(value: unknown): boolean {
  return isRecord(value) && typeof value.label === "string" &&
    typeof value.confidence === "number" && Number.isFinite(value.confidence) &&
    value.confidence >= 0 && value.confidence <= 1 &&
    (value.relationship === undefined || typeof value.relationship === "string") &&
    (value.lastInteraction === undefined || typeof value.lastInteraction === "string");
}

export function isCricketContext(value: unknown): value is CricketContext {
  if (!isRecord(value)) return false;
  const { eu, outros, mundo } = value;
  if (!isRecord(eu) || !isRecord(outros) || !isRecord(mundo)) return false;
  return ["profileId", "preferredName", "currentGoal", "activeTask"].every((key) => typeof eu[key] === "string") &&
    ["leve", "moderado", "intensivo"].includes(String(eu.assistanceLevel)) &&
    isStringList(eu.capabilities) && eu.capabilities.every((item) => MENTOR_CAPABILITIES.some((capability) => capability.id === item)) &&
    isStringList(eu.routine) && isStringList(eu.reminders) &&
    Array.isArray(eu.recentMemory) && eu.recentMemory.every((item) => isRecord(item) && typeof item.at === "string" && typeof item.summary === "string") &&
    Array.isArray(outros.detectedPeople) && outros.detectedPeople.every(isPerson) &&
    Array.isArray(outros.recognizedPeople) && outros.recognizedPeople.every(isPerson) &&
    typeof outros.socialContext === "string" && typeof outros.needsConfirmation === "boolean" &&
    (outros.recognitionConfidence === null || (typeof outros.recognitionConfidence === "number" && Number.isFinite(outros.recognitionConfidence) && outros.recognitionConfidence >= 0 && outros.recognitionConfidence <= 1)) &&
    ["sceneDescription", "locationContext"].every((key) => typeof mundo[key] === "string") &&
    isStringList(mundo.objects) && isStringList(mundo.detectedText) && isStringList(mundo.possibleRisks) &&
    (mundo.lastAnalysisAt === null || typeof mundo.lastAnalysisAt === "string");
}
