import { create } from 'zustand'

export const useUserRegistering = create((set) => ({
  name: '',
  email: 'josecorte-corte@hotmail.com',
  password: 'Molthypick34',
  confirmPassword: '',
  institution: '',
  startDate: '',
  state: '',
  city: '',
  degree: '',

  setUser: () => set((state: any) => state),
  setEmail: (email: string) => set((state: any) => ({...state, email})),
  setName: (name: string) => set((state: any) => ({...state, name})),
  setPassword: (password: string) => set(password),
  setConfirmPassword: (confirmPassword: string) => set(confirmPassword),
  setInstitution: (institution: string) => set(institution),
  setStartDate: (startDate: string) => set(startDate),
  setState: (newState: string) => set((state: any) => ({ ...state, state: newState })),
  setCity: (city: string) => set((state: any) => ({ ...state, city })),
  setDegree: (degree: string) => set((state: any) => ({ ...state, degree })),
}))
