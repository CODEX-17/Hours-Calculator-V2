
export default () => {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        const length = 8
        let result = ''
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length)
          result += charset.charAt(randomIndex)
        }
        return result
}