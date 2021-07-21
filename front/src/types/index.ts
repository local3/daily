import React from 'react'

// User関連
export type User = {
  id: number
  name: string
}

export type Auth = {
  currentUser: User | null
  isLoggedIn: boolean
  isFetchingAuth: boolean
  login?: void
  logout?: void
  signup?: void
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

export type ExistDate = {
  date: string
  classNames: string[]
} | []

// Calendar関連
export type DateContextType = {
  date: string
  updateDate: React.Dispatch<React.SetStateAction<any>>
} | null

// Memo関連

// Language関連
export type Language = {
  id: number
  name: string
}

// Alert関連

// Load関連
export type Load = {
  isLoading: boolean
  loadDispatch?: boolean
}