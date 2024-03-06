import express, {NextFunction, Request, Response} from "express"
import * as favoriteModel from '../models/favorite'
import Favorite from "../types/favorite"


const favoriteRouter = express.Router()

favoriteRouter.get('/', async (req:Request, res: Response) => {
    favoriteModel.findAllFavorites((error: Error, favorites: Favorite[]) => {
        if (error) {
            res.status(500).json({ errorMessage: error.message})
        }

        return res.status(200).json(favorites)
    })
})

favoriteRouter.post('/', async (req:Request, res: Response, next: NextFunction) => {
    try{
    const newFavoriteUserId: number = Number(req.body.user_id);
    const newFavoriteProductId: string = req.body.product_id;
    
    favoriteModel.createFavorite(newFavoriteUserId, newFavoriteProductId, (error: Error, favoriteId: number) => {
        if (error) {
            return next(error);
        }

        return res.status(201).json({ favoriteId })
    });
} catch (error) {
        // Handle any uncaught error here
        return next(error);
      }
})


favoriteRouter.delete('/:id', async (req:Request, res: Response) => {
    const favoriteId: number = Number(req.params.id)
    favoriteModel.deleteFavorite(favoriteId, (error: Error) => {
        if (error) {
            return res.status(500).json({ message: error.message})
        }

        return res.status(200).send()
    })
})





favoriteRouter.get('/favoritesByProduct/:id', async (req:Request, res: Response) => {
    const productId: string = req.params.id
    favoriteModel.findFavoritesByProduct(productId, (error: Error, favorites: Favorite[]) => {
        if (error) {
            return res.status(500).json({ message: error.message})
        }

        return res.status(200).json(favorites)
    })
})


export default favoriteRouter
