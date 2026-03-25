<!-- src/views/Exam.vue -->
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

function isTextChoice(choice) {
  return typeof choice === "string";
}

function isImageChoice(choice) {
  return (
    typeof choice === "object" &&
    choice !== null &&
    typeof choice.image === "string" &&
    choice.image.trim() !== ""
  );
}

function getImageSrc(path) {
  if (!path) return "";

  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}
</script>

<template>
  <div v-if="current" class="exam-wrap">
    <div class="exam-header">
      <div>
        <h3>{{ examState.currentIndex + 1 }} / {{ examState.selectedQuestions.length }}</h3>
        <p class="progress">
          응답 완료: {{ answeredCount }} / {{ examState.selectedQuestions.length }}
        </p>
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
        type="button"
        class="choice-btn"
        :class="{ selected: selectedAnswer === i }"
        @click="selectAnswer(current.id, i)"
      >
        <span class="choice-number">{{ i + 1 }}.</span>

        <div class="choice-content">
          <span v-if="isTextChoice(choice)" class="choice-text">
            {{ choice }}
          </span>

          <img
            v-else-if="isImageChoice(choice)"
            :src="getImageSrc(choice.image)"
            :alt="`보기 ${i + 1} 이미지`"
            class="choice-image"
          />

          <span v-else class="choice-text">
            보기를 불러오지 못했습니다.
          </span>
        </div>
      </button>
    </div>

    <div class="nav-buttons">
      <button type="button" @click="goPrevQuestion" :disabled="isFirstQuestion">
        이전
      </button>

      <button v-if="!isLastQuestion" type="button" @click="goNextQuestion">
        다음
      </button>

      <button v-else type="button" class="submit-btn" @click="handleSubmit">
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

/* 모바일 대응 */
@media (max-width: 768px) {
  .exam-wrap {
    padding: 16px;
  }
}

.exam-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
}

/* 모바일에서 줄바꿈 */
@media (max-width: 480px) {
  .exam-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .subject {
    white-space: normal;
  }
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
  word-break: keep-all;
}

/* 모바일 글자 크기 */
@media (max-width: 480px) {
  .question {
    font-size: 18px;
  }
}

.choice-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.choice-btn {
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  text-align: left;
  padding: 14px 16px;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  font-size: 16px;
}

/* 모바일 터치 영역 확대 */
@media (max-width: 480px) {
  .choice-btn {
    padding: 16px;
    font-size: 15px;
  }
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
  flex-shrink: 0;
  width: 24px;
  margin-top: 2px;
}

.choice-content {
  flex: 1;
  min-width: 0;
}

.choice-text {
  display: block;
  line-height: 1.6;
  word-break: keep-all;
}

.choice-image {
  display: block;
  width: 100%;
  max-width: 420px;
  max-height: 260px;
  margin: 0;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  background: #fff;
}

/* 태블릿 */
@media (max-width: 768px) {
  .choice-image {
    max-width: 100%;
    max-height: 220px;
  }
}

/* 모바일 */
@media (max-width: 480px) {
  .choice-image {
    max-width: 100%;
    max-height: 180px;
  }
}

.nav-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  gap: 12px;
}

/* 모바일 버튼 고정 느낌 */
@media (max-width: 480px) {
  .nav-buttons {
    position: sticky;
    bottom: 0;
    background: #f7f7f7;
    padding-top: 12px;
  }
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
  flex: 1;
}

/* 모바일 버튼 균등 분배 */
@media (max-width: 480px) {
  .nav-buttons button,
  .submit-btn {
    min-width: auto;
  }
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