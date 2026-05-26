<template>
  <div class="editor-panel">
    <div class="editor-header">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
      <span>简历编辑</span>
      <div class="header-actions">
        <button class="btn-header" title="导出数据" @click="onExport">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          导出
        </button>
        <button class="btn-header" title="导入数据" @click="onImport">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          导入
        </button>
      </div>
    </div>
    <div class="editor-body">
      <div class="editor-left">
        <SectionManager :selected="selectedModule" @select="onSelect" />
      </div>
      <div class="editor-right">
        <template v-if="selectedModule === 'basics'">
          <div class="editor-right-header">基本信息</div>
          <div class="editor-right-body">
            <BasicsEditor />
          </div>
        </template>
        <template v-else-if="typeof selectedModule === 'number' && selectedModule >= 0 && selectedModule < sections.length">
          <div class="editor-right-header">{{ sections[selectedModule].title }}</div>
          <div class="editor-right-body">
            <component :is="editorComponent(sections[selectedModule].type)" :data="sections[selectedModule]" @update="onUpdate" />
          </div>
        </template>
        <div v-else class="editor-placeholder">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          <p>选择一个板块进行编辑</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { resume, updateSection } from '../../store/resumeStore'
import BasicsEditor from './BasicsEditor.vue'
import SectionManager from './SectionManager.vue'
import SummaryEditor from './SummaryEditor.vue'
import ExperienceEditor from './ExperienceEditor.vue'
import EducationEditor from './EducationEditor.vue'
import SkillsEditor from './SkillsEditor.vue'
import GenericEditor from './GenericEditor.vue'
import { exportResume, importResume } from '../../store/resumeStore'
import { exportStyles, importStyles } from '../../store/styleStore'

const sections = computed(() => resume.value.sections)
const selectedModule = ref<string | number | null>(null)

const editorMap: Record<string, any> = {
  summary: SummaryEditor, experience: ExperienceEditor, education: EducationEditor, skills: SkillsEditor,
}

function editorComponent(type: string) {
  return editorMap[type] || GenericEditor
}

function onSelect(id: string | number) {
  selectedModule.value = id
}

function onUpdate(data: any) {
  if (typeof selectedModule.value === 'number') {
    updateSection(selectedModule.value, data)
  }
}

watch(sections, (val, oldVal) => {
  if (typeof selectedModule.value === 'number') {
    if (selectedModule.value >= val.length) {
      selectedModule.value = val.length > 0 ? val.length - 1 : 'basics'
    }
  }
})

function download(filename: string, content: string) {
  const blob = new Blob([content], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}

function upload(): Promise<string> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = () => {
      const file = input.files?.[0]
      if (!file) { reject(); return }
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsText(file)
    }
    input.click()
  })
}

async function onExport() {
  const data = exportResume()
  const st = exportStyles()
  download('resume-backup.json', JSON.stringify({ resume: JSON.parse(data), styles: JSON.parse(st) }, null, 2))
}

async function onImport() {
  try {
    const text = await upload()
    const data = JSON.parse(text)
    if (data.resume) importResume(JSON.stringify(data.resume))
    if (data.styles) importStyles(JSON.stringify(data.styles))
  } catch {}
}
</script>
