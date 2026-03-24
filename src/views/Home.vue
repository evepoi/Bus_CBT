<!-- src/views/Home.vue -->
<script setup>
import { useRouter } from "vue-router";
import { prepareExam } from "../store/exam";

const router = useRouter();

function goReady() {
  prepareExam();
  router.push("/ready");
}
</script>

<template>
  <div class="home-wrap">
    <div class="home-card">
      <h1 class="title">Bus CBT</h1>
      <p class="description">
        버스 운전자격 CBT 모의시험입니다.
      </p>

      <div class="info-box">
        <p><strong>총 문항:</strong> 80문제</p>
        <p><strong>출제 구성:</strong> 법 25 / 차량 15 / 안전 25 / 운수 15</p>
        <p>
          <strong>진행 방식:</strong>
          답안은 시험 완료 전까지 유지되며, 제출 후 결과와 오답이 표시됩니다.
        </p>
      </div>

      <button class="start-btn" @click="goReady">
        시험 준비
      </button>
    </div>
  </div>
</template>

<style scoped>
.home-wrap {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background: #f7f7f7;
}

.home-card {
  width: 100%;
  max-width: 640px;
  background: #fff;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.title {
  margin: 0 0 12px;
  font-size: 32px;
  font-weight: 700;
}

.description {
  margin: 0 0 24px;
  font-size: 16px;
  color: #666;
}

.info-box {
  text-align: left;
  background: #f9f9f9;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  line-height: 1.7;
  color: #333;
}

.start-btn {
  min-width: 180px;
  padding: 14px 20px;
  border: none;
  border-radius: 10px;
  background: #222;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.start-btn:hover {
  opacity: 0.92;
}

/* 모바일 대응 */
@media (max-width: 768px) {
  .home-wrap {
    align-items: flex-start;
    padding: 16px;
    padding-top: 24px;
  }

  .home-card {
    border-radius: 14px;
    padding: 24px 18px;
  }

  .title {
    font-size: 28px;
  }

  .description {
    margin-bottom: 20px;
    font-size: 15px;
  }

  .info-box {
    padding: 14px;
    margin-bottom: 20px;
    line-height: 1.6;
    font-size: 15px;
  }

  .start-btn {
    width: 100%;
    min-width: 0;
    padding: 15px 20px;
  }
}

@media (max-width: 480px) {
  .home-wrap {
    padding: 12px;
    padding-top: 16px;
  }

  .home-card {
    padding: 20px 16px;
    border-radius: 12px;
  }

  .title {
    font-size: 24px;
  }

  .description {
    font-size: 14px;
  }

  .info-box {
    font-size: 14px;
  }

  .start-btn {
    font-size: 15px;
  }
}
</style>