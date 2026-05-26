<template>
  <div class="section-manager">
    <div class="module-item basics-item"
      :class="{ selected: selected === 'basics' }"
      @click="$emit('select', 'basics')">
      <div class="module-item-info">
        <span class="module-item-icon">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </span>
        <span class="module-item-label">基本信息</span>
      </div>
    </div>

    <div class="module-divider"></div>

    <div class="module-list">
      <div v-for="(sec, i) in sections" :key="i"
        :class="['module-item', { selected: selected === i }]"
        @click="$emit('select', i)">
        <div class="module-item-info">
          <span class="module-item-icon">{{ typeIcons[sec.type as keyof typeof typeIcons] || '📄' }}</span>
          <div class="module-item-text">
            <span class="module-item-label">{{ sec.title || '无标题' }}</span>
            <span class="module-item-type">{{ sec.type }}</span>
          </div>
        </div>
        <div class="module-item-actions" @click.stop>
          <button class="btn-icon" :disabled="i === 0" @click="moveUp(i)" title="上移">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>
          </button>
          <button class="btn-icon" :disabled="i === sections.length - 1" @click="moveDown(i)" title="下移">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <button class="btn-icon danger" @click="remove(i)" title="删除">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      </div>
    </div>

    <div class="add-section">
      <select v-model="newType">
        <option v-for="t in knownTypes" :key="t" :value="t">{{ typeIcons[t as keyof typeof typeIcons] || '📄' }} {{ t }}</option>
        <option value="custom">📄 自定义</option>
      </select>
      <button class="btn-add" @click="add">+ 添加</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { resume, moveSection, removeSection, addSection } from '../../store/resumeStore'

defineProps<{ selected: string | number | null }>()
defineEmits<{ select: [id: string | number] }>()

const newType = ref('summary')
const sections = computed(() => resume.value.sections)

const typeIcons: Record<string, string> = {
  summary: '📋', experience: '💼', education: '🎓', skills: '🛠',
  projects: '🚀', certifications: '📜', languages: '🌐', references: '👥',
}

const knownTypes = ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'references']

function moveUp(i: number) { moveSection(i, i - 1) }
function moveDown(i: number) { moveSection(i, i + 1) }
function remove(i: number) { removeSection(i) }
function add() { addSection(newType.value) }
</script>
