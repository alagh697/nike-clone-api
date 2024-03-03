import Thing from "./review"
import User from "./user"

interface Favorite{
    id: number
    user: User
    product: string
    created_at: string
}

export default Favorite