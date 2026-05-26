import { ref } from 'vue'
import type { Resume, SectionData, ResumeBasics } from '../types/resume'
import { resumeData as initial } from '../data/resumeData'

const STORAGE_KEY = 'resume-data'

function loadSaved(): Resume {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return initial
}

function persist(data: Resume) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

const resume = ref<Resume>(loadSaved())

export { resume }

export function updateBasics(basics: ResumeBasics) {
  resume.value = { ...resume.value, basics }
  persist(resume.value)
}

export function updateSection(index: number, data: SectionData) {
  const sections = [...resume.value.sections]
  sections[index] = data
  resume.value = { ...resume.value, sections }
  persist(resume.value)
}

export function removeSection(index: number) {
  resume.value = {
    ...resume.value,
    sections: resume.value.sections.filter((_, i) => i !== index),
  }
  persist(resume.value)
}

export function addSection(type: string) {
  const blank: SectionData = { type, title: '新板块', content: '' }
  resume.value = { ...resume.value, sections: [...resume.value.sections, blank] }
  persist(resume.value)
}

export function moveSection(from: number, to: number) {
  const s = [...resume.value.sections]
  const [m] = s.splice(from, 1)
  s.splice(to, 0, m)
  resume.value = { ...resume.value, sections: s }
  persist(resume.value)
}

export function exportResume(): string {
  return JSON.stringify(resume.value, null, 2)
}

export function importResume(json: string): boolean {
  try {
    const data = JSON.parse(json)
    if (!data.basics || !data.sections) return false
    resume.value = data
    persist(data)
    return true
  } catch {
    return false
  }
}
