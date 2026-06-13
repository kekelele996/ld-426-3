<template>
  <article class="bg-paper p-6 ring-1 ring-ink/10">
    <div class="flex items-center gap-3">
      <h3 class="font-display text-3xl text-ink">{{ plan.name }}</h3>
      <span v-if="plan.source === 'quiz'" class="rounded-sm bg-clay/15 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-clay">测试</span>
      <span v-else class="rounded-sm bg-ink/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-ink/60">灵感板</span>
    </div>
    <div class="mt-4 flex gap-2">
      <StyleTag v-for="style in plan.styleTags" :key="style" :style-name="style" />
    </div>
    <div class="mt-6 flex gap-3">
      <ColorSwatch v-for="color in plan.colors" :key="color" :color="color" />
    </div>
    <StyleRadarChart v-if="plan.profileScores" class="mt-5" :scores="plan.profileScores" />
  </article>
</template>

<script setup lang="ts">
import { ComparisonPlan } from '../../types';
import ColorSwatch from './ColorSwatch.vue';
import StyleRadarChart from './StyleRadarChart.vue';
import StyleTag from './StyleTag.vue';
defineProps<{ plan: ComparisonPlan }>();
</script>
