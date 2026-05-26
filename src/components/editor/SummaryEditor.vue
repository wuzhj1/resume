<template>
  <div class="editor-fields">
    <label class="editor-field">
      <span>标题</span>
      <input :value="data.title" @input="emitUpdate({ ...data, title: ($event.target as HTMLInputElement).value })" placeholder="板块标题" />
    </label>
    <label class="editor-field">
      <span>内容</span>
      <textarea rows="4" :value="data.content as string" @input="emitUpdate({ ...data, content: ($event.target as HTMLTextAreaElement).value })" placeholder="输入个人简介..."></textarea>
    </label>
  </div>
</template>

<script setup lang="ts">
import type { SectionData } from '../../types/resume'

const props = defineProps<{ data: SectionData }>()
const emit = defineEmits<{ update: [data: SectionData] }>()
const emitUpdate = (d: SectionData) => emit('update', d)
</script>
