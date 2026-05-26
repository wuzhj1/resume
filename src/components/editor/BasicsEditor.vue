<template>
  <div class="editor-section">
    <div class="editor-section-title">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      基本信息
    </div>
    <div class="editor-grid">
      <label class="editor-field">
        <span>姓名</span>
        <input :value="data.name" @input="onUpdate('name', ($event.target as HTMLInputElement).value)" placeholder="你的姓名" />
      </label>
      <label class="editor-field">
        <span>职位</span>
        <input :value="data.title" @input="onUpdate('title', ($event.target as HTMLInputElement).value)" placeholder="求职意向 / 职位" />
      </label>
      <label class="editor-field">
        <span>期望城市</span>
        <input :value="data.city || ''" @input="onUpdate('city', ($event.target as HTMLInputElement).value)" placeholder="如：上海" />
      </label>
      <label class="editor-field">
        <span>期望岗位</span>
        <input :value="data.target || ''" @input="onUpdate('target', ($event.target as HTMLInputElement).value)" placeholder="如：Java 后端工程师" />
      </label>
    </div>
    <div class="editor-field">
      <span>联系方式</span>
      <div class="contacts-list">
        <div v-for="(c, i) in data.contacts" :key="i" class="contact-row">
          <select :value="c.label" @change="updateContact(i, 'label', ($event.target as HTMLSelectElement).value)">
            <option>电话</option><option>邮箱</option><option>GitHub</option><option>博客</option><option>LinkedIn</option><option>微信</option>
          </select>
          <input :value="c.value" placeholder="值" @input="updateContact(i, 'value', ($event.target as HTMLInputElement).value)" />
          <button class="btn-icon danger" title="删除" @click="removeContact(i)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <button class="btn-add" @click="addContact">+ 添加联系方式</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { resume, updateBasics } from '../../store/resumeStore'
import type { Contact } from '../../types/resume'

const data = computed(() => resume.value.basics)

function onUpdate(key: 'name' | 'title' | 'city' | 'target', val: string) {
  updateBasics({ ...data.value, [key]: val })
}

function updateContact(i: number, key: keyof Contact, val: any) {
  const arr = [...data.value.contacts]
  arr[i] = { ...arr[i], [key]: val }
  updateBasics({ ...data.value, contacts: arr })
}

function removeContact(i: number) {
  updateBasics({ ...data.value, contacts: data.value.contacts.filter((_, j) => j !== i) })
}

function addContact() {
  const c: Contact = { label: '电话', value: '' }
  updateBasics({ ...data.value, contacts: [...data.value.contacts, c] })
}
</script>
