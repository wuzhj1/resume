<template>
  <section class="resume-section">
    <h2 class="section-title">{{ data.title }}</h2>
    <div class="skills-grid">
      <div v-for="g in groups" :key="g.category" class="skill-group">
        <h3 class="skill-category">{{ g.category }}</h3>
        <div class="skill-tags">
          <span v-for="s in g.skills" :key="s" class="skill-tag">{{ s }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SectionData } from '../types/resume'

const props = defineProps<{ data: SectionData }>()
const groups = props.data.groups as any[]
</script>

<script lang="ts">
export const type = 'skills'
</script>
