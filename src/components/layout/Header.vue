<template>
  <header class="resume-header">
    <h1 class="resume-name">{{ basics.name }}</h1>
    <p class="resume-title">{{ basics.title }}</p>
    <p v-if="basics.city || basics.target" class="resume-target">
      <span v-if="basics.city">{{ basics.city }}</span>
      <span v-if="basics.city && basics.target"> · </span>
      <span v-if="basics.target">{{ basics.target }}</span>
    </p>
    <div class="resume-contacts">
      <a
        v-for="c in basics.contacts"
        :key="c.label + c.value"
        class="contact-item"
        :href="contactHref(c)"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ c.value }}
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { ResumeBasics, Contact } from '../../types/resume'

defineProps<{ basics: ResumeBasics }>()

function contactHref(c: Contact): string | undefined {
  if (c.href) return c.href
  if (c.label === '邮箱') return `mailto:${c.value}`
  if (c.label === '电话') return `tel:${c.value}`
  return undefined
}
</script>
