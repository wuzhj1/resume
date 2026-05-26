<template>
  <div class="style-group">
    <h4>主题配色</h4>
    <div class="theme-grid">
      <button v-for="t in themes" :key="t.name" :class="['theme-btn', { active: currentTheme === t.name }]" @click="applyTheme(t.name)">
        <div class="theme-swatches">
          <span :style="{ background: t.colors.colorPrimary }" />
          <span :style="{ background: t.colors.colorText }" />
          <span :style="{ background: t.colors.colorMuted }" />
          <span :style="{ background: t.colors.borderColor }" />
        </div>
        <span class="theme-label">{{ t.label }}</span>
      </button>
    </div>
  </div>

  <div class="style-group">
    <h4>页面布局</h4>
    <label class="editor-field"><span>页边距</span><input :value="s.pagePadding" @change="set('pagePadding', ($event.target as HTMLInputElement).value)" /></label>
    <label class="editor-field"><span>板块间距</span><input :value="s.sectionGap" @change="set('sectionGap', ($event.target as HTMLInputElement).value)" /></label>
  </div>

  <div class="style-group">
    <h4>字体大小</h4>
    <label class="editor-field" v-for="f in fontFields" :key="f.key"><span>{{ f.label }}</span><input :value="s[f.key]" @change="set(f.key, ($event.target as HTMLInputElement).value)" /></label>
  </div>

  <div class="style-group">
    <h4>间距</h4>
    <label class="editor-field"><span>姓名间距</span><input :value="s.nameLetterSpacing" @change="set('nameLetterSpacing', ($event.target as HTMLInputElement).value)" /></label>
    <label class="editor-field"><span>行高</span><input :value="s.lineHeight" @change="set('lineHeight', ($event.target as HTMLInputElement).value)" /></label>
  </div>

  <div class="style-group">
    <h4>自定义颜色<button class="btn-reset" @click="resetStyles">重置</button></h4>
    <label class="editor-field" v-for="c in colorFields" :key="c.key">
      <span>{{ c.label }}</span>
      <div class="color-row">
        <input type="color" :value="s[c.key]" @change="set(c.key, ($event.target as HTMLInputElement).value)" />
        <input type="text" :value="s[c.key]" @change="set(c.key, ($event.target as HTMLInputElement).value)" />
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { styles, activeTheme, themes, type StyleSettings, applyStyles, applyTheme, setStylesValue, resetStyles } from '../../store/styleStore'

const s = computed(() => styles.value)
const currentTheme = computed(() => activeTheme.value)

const fontFields: { label: string; key: keyof StyleSettings }[] = [
  { label: '姓名', key: 'fontSizeName' },
  { label: '职位', key: 'fontSizeTitle' },
  { label: '板块标题', key: 'fontSizeSectionTitle' },
  { label: '正文', key: 'fontSizeBody' },
  { label: '小字', key: 'fontSizeSmall' },
]

const colorFields: { label: string; key: keyof StyleSettings }[] = [
  { label: '主色', key: 'colorPrimary' },
  { label: '文字色', key: 'colorText' },
  { label: '弱色', key: 'colorMuted' },
  { label: '边框色', key: 'borderColor' },
]

function set(key: keyof StyleSettings, val: string) {
  setStylesValue(key, val)
}
</script>
