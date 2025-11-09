export default interface User {
  id: string
  email: string
  name: string
  elo: number
  profile: Record<string, any> | null
}