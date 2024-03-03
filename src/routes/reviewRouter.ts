import express, {NextFunction, Request, Response} from "express"
import Review from "../types/review"
import * as reviewModel from '../models/review'



const reviewRouter = express.Router()

reviewRouter.get('/', async (req:Request, res: Response) => {
    reviewModel.findAllReviews((error: Error, reviews: Review[]) => {
        if (error) {
            res.status(500).json({ errorMessage: error.message})
        }

        return res.status(200).json(reviews)
    })
})

reviewRouter.post('/', async (req:Request, res: Response, next: NextFunction) => {
    try{
    const newReviewUserId: number = Number(req.body.user_id);
    const newReviewProductId: string = req.body.product_id;
    const newReviewStar: number = Number(req.body.star);
    const newReviewMessage: string = req.body.message;
    
    reviewModel.createReview(newReviewUserId, newReviewProductId, newReviewStar, newReviewMessage, (error: Error, reviewId: number) => {
        if (error) {
            return next(error);
        }

        return res.status(201).json({ reviewId });
    });
} catch (error) {
        // Handle any uncaught error here
        return next(error);
      }
})


reviewRouter.delete('/:id', async (req:Request, res: Response) => {
    const reviewId: number = Number(req.params.id)
    reviewModel.deleteReview(reviewId, (error: Error) => {
        if (error) {
            return res.status(500).json({ message: error.message})
        }

        return res.status(200).send()
    })
})





reviewRouter.get('/reviewsByProduct/:id', async (req:Request, res: Response) => {
    const productId: string = req.params.id
    reviewModel.findReviewsByProduct(productId, (error: Error, reviews: Review[]) => {
        if (error) {
            return res.status(500).json({ message: error.message})
        }

        return res.status(200).json(reviews)
    })
})


export default reviewRouter
