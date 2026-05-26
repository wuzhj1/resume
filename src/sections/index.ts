import type { Component } from 'vue'
import type { SectionData } from '../types/resume'

const modules = import.meta.glob<{ type: string; default: Component }>('./*.vue', { eager: true })

const registry = new Map<string, Component>()

for (const path in modules) {
  if (path.endsWith('index.vue')) continue
  const mod = modules[path]
  if (mod?.type && mod?.default) {
    registry.set(mod.type, mod.default)
  }
}

export function getSectionComponent(type: string): Component {
  return registry.get(type) ?? fallbackComponent
}

const fallbackComponent: Component = (props: { data: SectionData }) => null

import { h } from 'vue'

;(fallbackComponent as any).props = { data: Object }
;(fallbackComponent as any).render = (ctx: any) => {
  const data = ctx.data as SectionData
  const children: any[] = []

  if (data.title) {
    children.push(h('h2', { class: 'section-title' }, data.title))
  }

  if (data.items) {
    const items = data.items as { label: string; value: string }[]
    children.push(h('div', { class: 'custom-items' }, items.map(item =>
      h('div', { class: 'custom-item' }, [h('strong', item.label + ': '), item.value])
    )))
  }

  if (data.content) {
    const content = data.content
    if (Array.isArray(content)) {
      children.push(h('div', { class: 'custom-content' }, [
        h('ul', content.map((l: string) => h('li', l)))
      ]))
    } else {
      children.push(h('div', { class: 'custom-content' }, h('p', content)))
    }
  }

  return h('section', { class: 'resume-section' }, children)
}
