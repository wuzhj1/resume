<template>
  <div class="editor-fields">
    <label class="editor-field">
      <span>标题</span>
      <input :value="data.title" @input="emit('update', { ...data, title: ($event.target as HTMLInputElement).value })" />
    </label>
    <label class="editor-field">
      <span>内容（JSON）</span>
      <textarea rows="6" :value="json" @input="onJsonInput"></textarea>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { SectionData } from '../../types/resume'

const props = defineProps<{ data: SectionData }>()
const emit = defineEmits<{ update: [data: SectionData] }>()
const json = ref(JSON.stringify(props.data, null, 2))

watch(() => props.data, (d) => { json.value = JSON.stringify(d, null, 2) }, { deep: true })

function onJsonInput(e: Event) {
  const val = (e.target as HTMLTextAreaElement).value
  json.value = val
  try { emit('update', JSON.parse(val)) } catch {}
}
</script>
