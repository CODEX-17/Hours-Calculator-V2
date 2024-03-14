import { create } from 'zustand'

const stateStores = create((set) => ({
    notification: false,
    good: true,
    message: '',
    updateNotification: (data) => set(() => ({ notification: data })),
    updateMessage: (data) => set(() => ({ message: data })),
    updateGood: (data) => set(() => ({ good: data })),
}))

export default stateStores