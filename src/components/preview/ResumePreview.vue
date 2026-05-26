<template>
  <div class="preview-panel">
    <A4Container>
      <Header :basics="data.basics" />
      <component :is="sec.component" v-for="sec in sections" :key="sec._key" :data="sec" />
    </A4Container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { resume } from '../../store/resumeStore'
import { getSectionComponent } from '../../sections/index'
import A4Container from '../layout/A4Container.vue'
import Header from '../layout/Header.vue'

const data = computed(() => resume.value)

const sections = computed(() =>
  resume.value.sections.map((sec) => ({
    ...sec,
    _key: Math.random().toString(36).slice(2),
    component: getSectionComponent(sec.type),
  }))
)
</script>
