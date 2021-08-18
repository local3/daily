import React from 'react'
import { Moment } from 'moment'
import { Color } from '@material-ui/lab'

// User関連
export type User = {
  id: number
  email: string
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

export type UserEditSession = {
  email: string
  password: string
}

export type UserEditInfo = {
  email: string
  password: string
  passwordConfirmation: string
  languageId?: number
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

export type ToolState = Required< {
  mode: string
  isOpenOption: boolean
  startOffset: number
  endOffset: number
  startLocation: {
    x: number,
    y: number
  }
  endLocation: {
    x: number,
    y: number
  }
}>

export type ToolAction = Partial<ToolState> & { type: string }

// Calendar関連
export type DateContextType = {
  globalDate: string
  updateDate: (date: string) => void
}

// Memo関連
export type Memo = {
  id: number
  content: string
}

export type MemoId = {
  memoId: string
}

// Dictionary関連
export type DictionaryType = {
  id: number
  word: string
  description: string
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
  severity: Color
  color: Color
  alertDispatch: React.Dispatch<any>
}

// Load関連
export type Load = {
  isLoading: boolean
  loadDispatch: React.Dispatch<any>
}