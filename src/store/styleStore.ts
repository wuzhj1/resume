import { ref } from 'vue'

export interface StyleSettings {
  pagePadding: string
  fontSizeName: string
  fontSizeTitle: string
  fontSizeSectionTitle: string
  fontSizeBody: string
  fontSizeSmall: string
  lineHeight: string
  sectionGap: string
  nameLetterSpacing: string
  colorPrimary: string
  colorText: string
  colorMuted: string
  borderColor: string
}

const defaults: StyleSettings = {
  pagePadding: '20mm 25mm',
  fontSizeName: '28px',
  fontSizeTitle: '16px',
  fontSizeSectionTitle: '16px',
  fontSizeBody: '14px',
  fontSizeSmall: '13px',
  lineHeight: '1.8',
  sectionGap: '7mm',
  nameLetterSpacing: '4px',
  colorPrimary: '#222',
  colorText: '#444',
  colorMuted: '#888',
  borderColor: '#ddd',
}

export const themes: { name: string; label: string; colors: Partial<StyleSettings> }[] = [
  { name: 'default', label: '经典黑', colors: { colorPrimary: '#222', colorText: '#444', colorMuted: '#888', borderColor: '#ddd' } },
  { name: 'navy', label: '深海蓝', colors: { colorPrimary: '#1a365d', colorText: '#2d3748', colorMuted: '#718096', borderColor: '#cbd5e0' } },
  { name: 'teal', label: '青绿', colors: { colorPrimary: '#234e52', colorText: '#2d3748', colorMuted: '#687a7c', borderColor: '#b2d5d8' } },
  { name: 'slate', label: '石板灰', colors: { colorPrimary: '#1e293b', colorText: '#334155', colorMuted: '#64748b', borderColor: '#cbd5e1' } },
  { name: 'warm', label: '暖棕', colors: { colorPrimary: '#3d2e1e', colorText: '#4a3f35', colorMuted: '#8c7b6b', borderColor: '#d4c9bc' } },
]

const STORAGE_KEY = 'resume-styles'
const THEME_KEY = 'resume-theme'

function loadSaved(): StyleSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return defaults
}

function persist(s: StyleSettings, theme: string) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  localStorage.setItem(THEME_KEY, theme)
}

const styles = ref<StyleSettings>(loadSaved())
const activeTheme = ref(localStorage.getItem(THEME_KEY) || 'default')

export { styles, activeTheme }

let styleTag: HTMLStyleElement | null = null

function updatePrintMargin(padding: string) {
  if (!styleTag) {
    styleTag = document.createElement('style')
    styleTag.id = 'dynamic-print-margin'
    document.head.appendChild(styleTag)
  }
  styleTag.textContent = `@page:first { margin: 0; } @page { margin: ${padding}; }`
}

export function applyStyles(s: StyleSettings) {
  const r = document.documentElement
  for (const [key, val] of Object.entries(s)) {
    const name = '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase()
    r.style.setProperty(name, val)
  }
  updatePrintMargin(s.pagePadding)
  persist(s, activeTheme.value)
}

export function applyTheme(name: string) {
  const theme = themes.find(t => t.name === name)
  if (!theme) return
  activeTheme.value = name
  const next = { ...styles.value, ...theme.colors }
  styles.value = next
  applyStyles(next)
}

export function setStylesValue(key: keyof StyleSettings, val: string) {
  const next = { ...styles.value, [key]: val }
  styles.value = next
  applyStyles(next)
}

export function resetStyles() {
  activeTheme.value = 'default'
  styles.value = defaults
  applyStyles(defaults)
}

export function exportStyles(): string {
  return JSON.stringify(styles.value, null, 2)
}

export function importStyles(json: string): boolean {
  try {
    const data = JSON.parse(json)
    styles.value = data
    applyStyles(data)
    return true
  } catch {
    return false
  }
}
