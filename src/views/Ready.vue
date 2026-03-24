<script setup>
import { useRouter } from "vue-router";
import { startExam } from "../store/exam";

const router = useRouter();

function handleStart() {
  startExam();
  router.push("/exam");
}

function goBack() {
  router.push("/");
}
</script>

<template>
  <div class="ready-wrap">
    <div class="ready-card">
      <h2 class="title">시험 준비 완료</h2>

      <div class="info-box">
        <p><strong>총 문항:</strong> 80문제</p>
        <p><strong>출제 구성:</strong> 법 25 / 차량 15 / 안전 25 / 운수 15</p>
        <p><strong>진행 방식:</strong> 모든 문제를 풀고 제출 시 채점됩니다.</p>
      </div>

      <div class="notice-box">
        <p>• 답안은 시험 종료 전까지 수정 가능합니다.</p>
        <p>• 제출 후에는 수정할 수 없습니다.</p>
        <p>• 틀린 문제는 시험 종료 후 확인할 수 있습니다.</p>
      </div>

      <div class="button-group">
        <button class="back-btn" @click="goBack">
          이전으로
        </button>

        <button class="start-btn" @click="handleStart">
          시험 시작
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ready-wrap {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f7f7f7;
  padding: 24px;
}

.ready-card {
  width: 100%;
  max-width: 600px;
  background: #fff;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.title {
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: 700;
}

.info-box {
  text-align: left;
  background: #f9f9f9;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  line-height: 1.7;
}

.notice-box {
  text-align: left;
  font-size: 14px;
  color: #555;
  margin-bottom: 24px;
  line-height: 1.6;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.back-btn {
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
}

.start-btn {
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: none;
  background: #222;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.start-btn:hover {
  opacity: 0.92;
}
</style>