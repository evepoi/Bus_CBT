<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import {
  examState,
  selectAnswer,
  goPrevQuestion,
  goNextQuestion,
  submitExam,
} from "../store/exam";

const router = useRouter();

const current = computed(() => {
  return examState.selectedQuestions[examState.currentIndex] || null;
});

const selectedAnswer = computed(() => {
  if (!current.value) return null;
  return examState.answers[current.value.id] ?? null;
});

const isFirstQuestion = computed(() => examState.currentIndex === 0);

const isLastQuestion = computed(() => {
  return examState.currentIndex === examState.selectedQuestions.length - 1;
});

const answeredCount = computed(() => {
  return examState.selectedQuestions.filter(
    (q) => examState.answers[q.id] !== undefined
  ).length;
});

function handleSubmit() {
  submitExam();
  router.push("/result");
}
</script>

<template>
  <div v-if="current" class="exam-wrap">
    <div class="exam-header">
      <div>
        <h3>{{ examState.currentIndex + 1 }} / {{ examState.selectedQuestions.length }}</h3>
        <p class="progress">응답 완료: {{ answeredCount }} / {{ examState.selectedQuestions.length }}</p>
      </div>
      <p class="subject">{{ current.subject }}</p>
    </div>

    <div class="question-box">
      <p class="question">{{ current.question }}</p>
    </div>

    <div class="choice-list">
      <button
        v-for="(choice, i) in current.choices"
        :key="i"
        class="choice-btn"
        :class="{ selected: selectedAnswer === i }"
        @click="selectAnswer(current.id, i)"
      >
        <span class="choice-number">{{ i + 1 }}.</span>
        <span>{{ choice }}</span>
      </button>
    </div>

    <div class="nav-buttons">
      <button @click="goPrevQuestion" :disabled="isFirstQuestion">
        이전
      </button>

      <button v-if="!isLastQuestion" @click="goNextQuestion">
        다음
      </button>

      <button v-else class="submit-btn" @click="handleSubmit">
        시험 완료
      </button>
    </div>
  </div>

  <div v-else class="empty-state">
    문제를 불러오지 못했습니다.
  </div>
</template>

<style scoped>
.exam-wrap {
  max-width: 720px;
  margin: 0 auto;
  padding: 20px;
}

.exam-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
}

.subject {
  font-size: 14px;
  color: #666;
  white-space: nowrap;
}

.progress {
  margin-top: 6px;
  font-size: 14px;
  color: #666;
}

.question-box {
  margin-bottom: 20px;
}

.question {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
}

.choice-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.choice-btn {
  width: 100%;
  text-align: left;
  padding: 14px 16px;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  font-size: 16px;
}

.choice-btn:hover {
  background: #f8f8f8;
}

.choice-btn.selected {
  border-color: #222;
  background: #f1f1f1;
  font-weight: 600;
}

.choice-number {
  margin-right: 8px;
}

.nav-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  gap: 12px;
}

.nav-buttons button,
.submit-btn {
  min-width: 100px;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background: #222;
  color: white;
  cursor: pointer;
}

.nav-buttons button:disabled {
  background: #bbb;
  cursor: not-allowed;
}

.empty-state {
  padding: 20px;
  text-align: center;
  color: #666;
}
</style>