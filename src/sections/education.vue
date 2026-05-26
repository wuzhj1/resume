<template>
  <section class="resume-section">
    <h2 class="section-title">{{ data.title }}</h2>
    <div v-for="item in items" :key="item.school + item.startDate" class="education-item">
      <div class="education-header">
        <div class="education-left">
          <span class="education-school">{{ item.school }}</span>
          <span class="education-degree">{{ item.degree }} · {{ item.major }}</span>
        </div>
        <span class="education-date">{{ item.startDate }} — {{ item.endDate }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SectionData } from '../types/resume'

const props = defineProps<{ data: SectionData }>()
const items = props.data.items as any[]
</script>

<script lang="ts">
export const type = 'education'
</script>
