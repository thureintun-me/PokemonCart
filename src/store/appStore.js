

import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAppStore = create(
    persist(
        (set, get) => ({
            isLoading: false,
            token: 0,
            selectedCard : [],
            setToken: (val) => set({ token: val }),
            setIsLoading: (val) => set({ isLoading: val }),
            setSelectedCard: (val) => set({ selectedCard: val }),
        }),
        {
            name: 'app-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
            partialize: (state) => ({ token: state.token }),
            onRehydrateStorage: (state) => {
                console.log('hydration starts')

                // optional
                return (state, error) => {
                    if (error) {
                        console.log('an error happened during hydration', error)
                    } else {
                        console.log('hydration finished')
                    }
                }
            },
        },
    ),
)