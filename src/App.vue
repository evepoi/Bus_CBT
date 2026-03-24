<!-- src/App.vue -->
<template>
  <router-view />
</template>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  min-height: 100%;
  width: 100%;
}

body {
  background: #f7f7f7;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow-x: hidden;
}

.app-wrap {
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
}

/* 모바일 기본 대응 */
* {
  box-sizing: border-box;
}

img,
video,
canvas,
svg {
  max-width: 100%;
  height: auto;
}

button,
input,
select,
textarea {
  font: inherit;
}

/* 작은 화면 대응 */
@media (max-width: 768px) {
  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    overflow-x: hidden;
  }
}
</style>