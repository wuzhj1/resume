<template>
  <section class="resume-section">
    <h2 class="section-title">{{ data.title }}</h2>
    <div v-for="item in items" :key="item.company + item.startDate" class="experience-item">
      <div class="experience-header">
        <div class="experience-left">
          <h3 class="experience-position">{{ item.position }}</h3>
          <span class="experience-company">{{ item.company }}</span>
        </div>
        <span class="experience-date">{{ item.startDate }} — {{ item.endDate }}</span>
      </div>
      <ul class="experience-description">
        <li v-for="(desc, i) in item.description" :key="i">{{ desc }}</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SectionData } from '../types/resume'

const props = defineProps<{ data: SectionData }>()
const items = props.data.items as any[]
</script>

<script lang="ts">
export const type = 'experience'
</script>
