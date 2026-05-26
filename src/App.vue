<template>
  <div class="app-layout">
    <div class="panel-left">
      <EditorPanel />
    </div>
    <div class="panel-center">
      <ResumePreview />
    </div>
    <div class="panel-right">
      <div class="panel-right-header">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
        样式设置
      </div>
      <div class="panel-right-body">
        <StyleEditor />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import EditorPanel from './components/editor/EditorPanel.vue'
import ResumePreview from './components/preview/ResumePreview.vue'
import StyleEditor from './components/editor/StyleEditor.vue'
import { applyStyles, styles } from './store/styleStore'

onMounted(() => applyStyles(styles.value))
</script>
