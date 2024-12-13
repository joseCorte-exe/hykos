import { create } from 'zustand'

export type UseUserRegisteringType = {
  name: string
  email: string
  password: string
  confirmPassword: string
  institution: string
  startDate: string
  state: string
  city: string
  degree: string

  institutionSearch: string

  setUser: ([key]: string) => void
  setEmail: ([key]: string) => void
  setName: ([key]: string) => void
  setPassword: ([key]: string) => void
  setConfirmPassword: ([key]: string) => void
  setInstitution: ([key]: string) => void
  setInstitutionSearch: ([key]: string) => void
  setStartDate: ([key]: string) => void
  setState: ([key]: string) => void
  setCity: ([key]: string) => void
  setDegree: ([key]: string) => void
}

export const useUserRegistering = create<UseUserRegisteringType>((set) => ({
  // name: 'José Corte',
  // email: 'josecorte-corte@hotmail.com',
  // password: 'Molthypick34',
  // confirmPassword: 'Molthypick34',
  // institution: 'Unasp',
  // startDate: '16/07/2003',
  // state: 'São Paulo',
  // city: 'São Paulo',
  // degree: 'Graduação - cursando',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  institution: '',
  startDate: '',
  state: '',
  city: '',
  degree: '',

  institutionSearch: '',

  setUser: () => set((state: any) => state),
  setEmail: (email) => set((state: any) => ({...state, email})),
  setName: (name) => set((state: any) => ({...state, name})),
  setPassword: (password) => set((state: any) => ({ ...state, password })),
  setConfirmPassword: (confirmPassword) => set((state: any) => ({ ...state, confirmPassword })),
  setInstitution: (institution) => set((state: any) => ({ ...state, institution })),
  setInstitutionSearch: (institutionSearch) => set((state: any) => ({ ...state, institutionSearch })),
  setStartDate: (startDate) => set((state: any) => ({ ...state, startDate })),
  setState: (newState) => set((state: any) => ({ ...state, state: newState })),
  setCity: (city) => set((state: any) => ({ ...state, city })),
  setDegree: (degree) => set((state: any) => ({ ...state, degree })),
}))
