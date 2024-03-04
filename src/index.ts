import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import reviewRouter from './routes/reviewRouter'
import userRouter from './routes/userRouter'

import favoriteRouter from './routes/favoriteRouter'

const app = express()

app.use(express.json())

app.use(cors())



app.use('/reviews', reviewRouter)
app.use('/users', userRouter)
app.use('/favorites', favoriteRouter)

// Custom error class
class MyCustomError extends Error {
    constructor(public message: string, public statusCode: number) {
      super(message);
    }
  }
  
  // Error handling middleware
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack); // Log the error to the console
  
    // Set a default status code and error message
    let statusCode = 500;
    let errorMessage = 'An internal server error occurred.';
  
    // Customize error handling based on the error type
    if (err instanceof MyCustomError) {
      statusCode = err.statusCode;
      errorMessage = err.message;
    }
  
    // Send the error response to the client
    res.status(statusCode).json({ errorMessage });
  });
  
  // Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on port ${process.env.PORT || 3000}`)
})


process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });