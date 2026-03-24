/**
 * 📁 파일 위치: src/store/exam.js
 * 버스 CBT 시험 상태 및 로직 관리
 *
 * 사용 데이터 파일
 * - src/data/law.js
 * - src/data/vehicle.js
 * - src/data/safety.js
 * - src/data/service.js
 */

import { reactive } from "vue";

import { lawQuestions } from "../data/law.js";
import { vehicleQuestions } from "../data/vehicle.js";
import { safetyQuestions } from "../data/safety.js";
import { serviceQuestions } from "../data/service.js";

export const examState = reactive({
  currentIndex: 0,
  selectedQuestions: [],
  answers: {},
  result: {
    correct: 0,
    total: 0,
    passed: false,
    wrongQuestions: [],
  },
});

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function getRandomQuestions(array, count) {
  return shuffleArray(array).slice(0, count);
}

export function prepareExam() {
  const selected = [
    ...getRandomQuestions(lawQuestions, 25),
    ...getRandomQuestions(vehicleQuestions, 15),
    ...getRandomQuestions(safetyQuestions, 25),
    ...getRandomQuestions(serviceQuestions, 15),
  ];

  examState.selectedQuestions = shuffleArray(selected);
  examState.currentIndex = 0;
  examState.answers = {};
  examState.result = {
    correct: 0,
    total: examState.selectedQuestions.length,
    passed: false,
    wrongQuestions: [],
  };
}

export function startExam() {
  if (!examState.selectedQuestions.length) {
    prepareExam();
  }
}

export function goPrevQuestion() {
  if (examState.currentIndex > 0) {
    examState.currentIndex--;
  }
}

export function goNextQuestion() {
  if (examState.currentIndex < examState.selectedQuestions.length - 1) {
    examState.currentIndex++;
  }
}

export function selectAnswer(questionId, choiceIndex) {
  examState.answers[questionId] = choiceIndex;
}

export function submitExam() {
  let correct = 0;
  const wrongQuestions = [];

  examState.selectedQuestions.forEach((question) => {
    const userAnswer = examState.answers[question.id];

    if (userAnswer === question.answer) {
      correct++;
    } else {
      wrongQuestions.push(question);
    }
  });

  examState.result = {
    correct,
    total: examState.selectedQuestions.length,
    passed: correct >= 48,
    wrongQuestions,
  };
}

export function resetExam() {
  examState.currentIndex = 0;
  examState.selectedQuestions = [];
  examState.answers = {};
  examState.result = {
    correct: 0,
    total: 0,
    passed: false,
    wrongQuestions: [],
  };
}