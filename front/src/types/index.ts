import React from 'react'

// User関連
export type User = {
  id: number
  name: string
  languageId: number
}

export type SignupForm = {
  email: string
  password: string
  passwordConfirmation: string
  languageId: number
}

export type Auth = {
  currentUser: User | null
  isLoggedIn: boolean
  isFetchingAuth: boolean
  login: (session: Session) => void
  logout: () => void
  signup: (user: SignupForm) => void
}

export type Session = {
  email: string
  password: string
  rememberMe: boolean
}

// Diary関連
export type DiaryFormContent = {
  diary: DiaryForm
  diaryContent: DiaryContentForm
}

export type DiaryForm = {
  jaContent: string
  date: string
}

export type DiaryContentForm = {
  languageId: number
  content: string
}

export type SubmitFlagState = {
  submitFlag: boolean
  changeSubmitFlag: (flag: boolean) => void
}

export type ExistDate = {
  date: string
  classNames: string[]
}

// Calendar関連
export type DateContextType = {
  globalDate: string
  updateDate: (date: string) => void
} | null

// Memo関連
export type Memo = {
  id: number
  content: string
}

// Language関連
export type Language = {
  id: number
  name: string
}

// Alert関連
export type AlertState = {
  msg: string
  status: number
  severity: string
  color: string
  alertDispatch: React.Dispatch<any>
}

// Load関連
export type Load = {
  isLoading: boolean
  loadDispatch: React.Dispatch<any>
}