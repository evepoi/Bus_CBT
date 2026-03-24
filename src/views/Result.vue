<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { examState, resetExam } from "../store/exam";

const router = useRouter();

const wrongQuestions = computed(() => examState.result.wrongQuestions || []);
const wrongCount = computed(() => wrongQuestions.value.length);

function getUserAnswerText(question) {
  const userAnswer = examState.answers[question.id];

  if (userAnswer === undefined || userAnswer === null) {
    return "미응답";
  }

  return `${userAnswer + 1}. ${question.choices[userAnswer]}`;
}

function getCorrectAnswerText(question) {
  return `${question.answer + 1}. ${question.choices[question.answer]}`;
}

function handleReset() {
  resetExam();
  router.push("/");
}
</script>

<template>
  <div class="result-wrap">
    <div class="result-card">
      <h2 class="title">시험 결과</h2>

      <div class="summary-box">
        <p><strong>정답:</strong> {{ examState.result.correct }}</p>
        <p><strong>오답:</strong> {{ wrongCount }}</p>
        <p><strong>총문제:</strong> {{ examState.result.total }}</p>
      </div>

      <div
        class="status-box"
        :class="examState.result.passed ? 'pass' : 'fail'"
      >
        {{ examState.result.passed ? "합격" : "불합격" }}
      </div>

      <div class="wrong-section" v-if="wrongQuestions.length > 0">
        <h3 class="wrong-title">틀린 문제</h3>

        <div
          v-for="question in wrongQuestions"
          :key="question.id"
          class="wrong-card"
        >
          <div class="wrong-header">
            <span class="subject">{{ question.subject }}</span>
            <span class="question-id">문항 ID: {{ question.id }}</span>
          </div>

          <p class="question-text">{{ question.question }}</p>

          <ul class="choice-list">
            <li
              v-for="(choice, i) in question.choices"
              :key="i"
              :class="{
                correct: i === question.answer,
                wrong: i === examState.answers[question.id] && i !== question.answer
              }"
            >
              {{ i + 1 }}. {{ choice }}
            </li>
          </ul>

          <div class="answer-box">
            <p><strong>내 답:</strong> {{ getUserAnswerText(question) }}</p>
            <p><strong>정답:</strong> {{ getCorrectAnswerText(question) }}</p>
          </div>
        </div>
      </div>

      <div v-else class="perfect-box">
        모든 문제를 맞혔습니다.
      </div>

      <div class="button-group">
        <button class="retry-btn" @click="handleReset">
          다시하기
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.result-wrap {
  min-height: 100vh;
  background: #f7f7f7;
  padding: 24px;
}

.result-card {
  max-width: 760px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  padding: 28px 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.title {
  margin: 0 0 20px;
  text-align: center;
  font-size: 28px;
  font-weight: 700;
}

.summary-box {
  background: #f9f9f9;
  border: 1px solid #e4e4e4;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  line-height: 1.8;
}

.status-box {
  text-align: center;
  padding: 14px;
  border-radius: 12px;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 24px;
}

.status-box.pass {
  background: #eef7ee;
  color: #1f7a1f;
}

.status-box.fail {
  background: #fff0f0;
  color: #c62828;
}

.wrong-section {
  margin-top: 8px;
}

.wrong-title {
  margin-bottom: 16px;
  font-size: 22px;
}

.wrong-card {
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  background: #fcfcfc;
}

.wrong-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.subject {
  font-weight: 600;
}

.question-id {
  color: #888;
}

.question-text {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 12px;
}

.choice-list {
  list-style: none;
  padding: 0;
  margin: 0 0 14px;
}

.choice-list li {
  padding: 8px 10px;
  border-radius: 8px;
  margin-bottom: 6px;
  background: #fff;
  border: 1px solid #eee;
}

.choice-list li.correct {
  border-color: #1f7a1f;
  background: #eef7ee;
  font-weight: 600;
}

.choice-list li.wrong {
  border-color: #c62828;
  background: #fff0f0;
  font-weight: 600;
}

.answer-box {
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  border: 1px solid #eee;
  line-height: 1.7;
}

.perfect-box {
  text-align: center;
  padding: 20px;
  border-radius: 12px;
  background: #eef7ee;
  color: #1f7a1f;
  font-weight: 700;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.retry-btn {
  min-width: 160px;
  padding: 14px 20px;
  border: none;
  border-radius: 10px;
  background: #222;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.retry-btn:hover {
  opacity: 0.92;
}
</style>