<template>
  <section class="resume-section">
    <h2 class="section-title">{{ data.title }}</h2>
    <p class="summary-content">{{ data.content }}</p>
  </section>
</template>

<script setup lang="ts">
import type { SectionData } from '../types/resume'

defineProps<{ data: SectionData }>()
</script>

<script lang="ts">
export const type = 'summary'
</script>
