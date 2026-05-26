<template>
  <div class="editor-fields">
    <label class="editor-field">
      <span>标题</span>
      <input :value="data.title" @input="emit('update', { ...data, title: ($event.target as HTMLInputElement).value })" />
    </label>
    <div v-for="(item, i) in items" :key="i" class="editor-card">
      <div class="editor-card-header">
        <span class="editor-card-title">{{ item.company || '新公司' }}</span>
        <button class="btn-icon danger" @click="removeItem(i)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <label class="editor-field"><span>公司</span><input :value="item.company" @input="updateItem(i, 'company', ($event.target as HTMLInputElement).value)" placeholder="公司名称" /></label>
      <label class="editor-field"><span>职位</span><input :value="item.position" @input="updateItem(i, 'position', ($event.target as HTMLInputElement).value)" placeholder="职位名称" /></label>
      <div class="editor-row">
        <label class="editor-field"><span>开始</span><input :value="item.startDate" @input="updateItem(i, 'startDate', ($event.target as HTMLInputElement).value)" placeholder="2023-01" /></label>
        <label class="editor-field"><span>结束</span><input :value="item.endDate" @input="updateItem(i, 'endDate', ($event.target as HTMLInputElement).value)" placeholder="至今" /></label>
      </div>
      <label class="editor-field">
        <span>工作描述</span>
        <div class="desc-list">
          <div v-for="(d, j) in item.description" :key="j" class="desc-row">
            <input :value="d" @input="updateDesc(i, j, ($event.target as HTMLInputElement).value)" placeholder="工作内容描述" />
            <button class="btn-icon" @click="removeDesc(i, j)">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <button class="btn-add-sm" @click="addDesc(i)">+ 添加描述</button>
        </div>
      </label>
    </div>
    <button class="btn-add" @click="addItem">+ 添加工作经历</button>
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
  commit([...items, { company: '', position: '', startDate: '', endDate: '', description: [] }])
}

function updateDesc(i: number, j: number, val: string) {
  const next = [...items]; const desc = [...(next[i].description || [])]
  desc[j] = val; next[i] = { ...next[i], description: desc }; commit(next)
}

function removeDesc(i: number, j: number) {
  const next = [...items]; next[i] = { ...next[i], description: next[i].description.filter((_: string, k: number) => k !== j) }; commit(next)
}

function addDesc(i: number) {
  const next = [...items]; next[i] = { ...next[i], description: [...(next[i].description || []), ''] }; commit(next)
}
</script>
