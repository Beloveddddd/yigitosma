export const LEAD_STATUSES = [
  'Yeni',
  'İletişime geçildi',
  'Görüşme',
  'Kazanıldı',
  'Kaybedildi',
] as const

export type LeadStatus = (typeof LEAD_STATUSES)[number]

export interface ILead {
  id: string
  company: string
  contact: string
  email: string
  status: LeadStatus
  note: string
  createdAt: string
}

export type LeadInput = Omit<ILead, 'id' | 'createdAt'>
