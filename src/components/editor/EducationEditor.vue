<template>
  <div class="editor-fields">
    <label class="editor-field">
      <span>标题</span>
      <input :value="data.title" @input="emit('update', { ...data, title: ($event.target as HTMLInputElement).value })" />
    </label>
    <div v-for="(item, i) in items" :key="i" class="editor-card">
      <div class="editor-card-header">
        <span class="editor-card-title">{{ item.school || '新学校' }}</span>
        <button class="btn-icon danger" @click="removeItem(i)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <label class="editor-field"><span>学校</span><input :value="item.school" @input="updateItem(i, 'school', ($event.target as HTMLInputElement).value)" placeholder="学校名称" /></label>
      <div class="editor-row">
        <label class="editor-field"><span>学历</span><input :value="item.degree" @input="updateItem(i, 'degree', ($event.target as HTMLInputElement).value)" placeholder="本科" /></label>
        <label class="editor-field"><span>专业</span><input :value="item.major" @input="updateItem(i, 'major', ($event.target as HTMLInputElement).value)" placeholder="计算机科学与技术" /></label>
      </div>
      <div class="editor-row">
        <label class="editor-field"><span>开始</span><input :value="item.startDate" @input="updateItem(i, 'startDate', ($event.target as HTMLInputElement).value)" placeholder="2014-09" /></label>
        <label class="editor-field"><span>结束</span><input :value="item.endDate" @input="updateItem(i, 'endDate', ($event.target as HTMLInputElement).value)" placeholder="2018-06" /></label>
      </div>
    </div>
    <button class="btn-add" @click="addItem">+ 添加教育经历</button>
  </div>
</template>

<script setup lang="ts">
import type { SectionData } from '../../types/resume'

const props = defineProps<{ data: SectionData }>()
const emit = defineEmits<{ update: [data: SectionData] }>()
const items = props.data.items as any[] || []

function commit(next: any[]) {
  emit('update', { ...props.data, items: next })
}

function updateItem(i: number, key: string, val: string) {
  const next = [...items]; next[i] = { ...next[i], [key]: val }; commit(next)
}

function removeItem(i: number) {
  commit(items.filter((_: any, j: number) => j !== i))
}

function addItem() {
  commit([...items, { school: '', degree: '', major: '', startDate: '', endDate: '' }])
}
</script>
