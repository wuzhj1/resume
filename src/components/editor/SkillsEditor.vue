<template>
  <div class="editor-fields">
    <label class="editor-field">
      <span>标题</span>
      <input :value="data.title" @input="emit('update', { ...data, title: ($event.target as HTMLInputElement).value })" />
    </label>
    <div v-for="(g, i) in groups" :key="i" class="editor-card">
      <div class="editor-card-header">
        <span class="editor-card-title">{{ g.category || '新分类' }}</span>
        <button class="btn-icon danger" @click="removeGroup(i)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <label class="editor-field"><span>分类名</span><input :value="g.category" @input="updateGroup(i, ($event.target as HTMLInputElement).value)" placeholder="如：编程语言" /></label>
      <label class="editor-field">
        <span>技能（逗号分隔）</span>
        <input :value="(g.skills || []).join(', ')" @input="updateSkills(i, ($event.target as HTMLInputElement).value)" placeholder="Java, Python, Go" />
      </label>
    </div>
    <button class="btn-add" @click="addGroup">+ 添加技能分类</button>
  </div>
</template>

<script setup lang="ts">
import type { SectionData } from '../../types/resume'

const props = defineProps<{ data: SectionData }>()
const emit = defineEmits<{ update: [data: SectionData] }>()
const groups = props.data.groups as any[] || []

function commit(next: any[]) {
  emit('update', { ...props.data, groups: next })
}

function updateGroup(i: number, val: string) {
  const next = [...groups]; next[i] = { ...next[i], category: val }; commit(next)
}

function updateSkills(i: number, val: string) {
  const next = [...groups]; next[i] = { ...next[i], skills: val.split(/[，,]\s*/).filter(Boolean) }; commit(next)
}

function removeGroup(i: number) {
  commit(groups.filter((_: any, j: number) => j !== i))
}

function addGroup() {
  commit([...groups, { category: '', skills: [] }])
}
</script>
