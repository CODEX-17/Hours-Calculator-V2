import { create } from 'zustand'

const stateStores = create((set) => ({
    notification: false,
    good: true,
    message: '',
    selectedID: null,
    updateNotification: (data) => set(() => ({ notification: data })),
    updateMessage: (data) => set(() => ({ message: data })),
    updateGood: (data) => set(() => ({ good: data })),
    updateSelectedID: (data) => set(() => ({ selectedID: data })),
}))

export default stateStores