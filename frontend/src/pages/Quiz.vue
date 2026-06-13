<template>
  <section class="space-y-8">
    <div class="max-w-4xl">
      <p class="text-sm font-semibold uppercase tracking-[0.25em] text-clay">Style quiz</p>
      <h1 class="page-title mt-3">把偏好变成可执行的装修方向</h1>
    </div>
    <ProgressBar :value="progress" />
    <QuizCard v-if="currentQuestion && !completed" :question="currentQuestion" @answer="handleAnswer" />
    <div v-else-if="profile" class="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div class="bg-paper p-8 ring-1 ring-ink/10">
        <p class="text-sm text-ink/60">主风格</p>
        <h2 class="font-display text-5xl text-ink">{{ profile.primaryStyle }}</h2>
        <p class="mt-4 text-ink/70">{{ styleDescriptions[profile.primaryStyle] }}</p>
        <div class="mt-6 flex flex-wrap gap-3">
          <RouterLink class="bg-clay px-5 py-3 font-semibold text-paper" to="/gallery">查看匹配图集</RouterLink>
          <button class="bg-ink px-5 py-3 font-semibold text-paper" @click="saveAndCompare">保存为方案并对比</button>
        </div>
      </div>
      <StyleRadarChart :scores="profile.scores" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { styleDescriptions } from '../constants/styleDescriptions';
import ProgressBar from '../components/common/ProgressBar.vue';
import QuizCard from '../components/common/QuizCard.vue';
import StyleRadarChart from '../components/common/StyleRadarChart.vue';
import { useQuiz } from '../hooks/useQuiz';
import { useProfileStore } from '../stores/profileStore';
import { useComparisonStore } from '../stores/comparisonStore';
import { QuizOption } from '../types';

const quiz = useQuiz();
const profileStore = useProfileStore();
const comparisonStore = useComparisonStore();
const router = useRouter();
const completed = ref(false);
const currentQuestion = quiz.currentQuestion;
const progress = computed(() => (completed.value ? 100 : quiz.progress.value));
const profile = computed(() => profileStore.profile);

async function handleAnswer(option: QuizOption) {
  quiz.answer(option);
  if (quiz.answers.value.length === quiz.questions.length) {
    completed.value = true;
    await profileStore.saveProfile(quiz.result());
  }
}

async function saveAndCompare() {
  if (!profile.value) return;
  await comparisonStore.createFromProfile(profile.value);
  router.push('/compare');
}
</script>
