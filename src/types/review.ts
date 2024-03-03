import User from "./user"

interface Review{
    id: number
    user: User
    product: string
    star: number
    message: string
    created_at: string
}

export default Review