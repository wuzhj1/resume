export interface Contact {
  label: string
  value: string
  href?: string
}

export interface ResumeBasics {
  name: string
  title: string
  city?: string
  target?: string
  contacts: Contact[]
}

export interface SectionData {
  type: string
  title: string
  [key: string]: unknown
}

export interface Resume {
  basics: ResumeBasics
  sections: SectionData[]
}
