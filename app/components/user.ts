export default interface User {
  id: string
  email: string
  name: string
  elo: number
  avatar: string
  profile: Record<string, any> | null
}