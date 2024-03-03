import connection from '../db-config'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import Review from '../types/review'

export const createReview = (userId: number, productId: string, star: number, message: string, callback: Function ) => {
    const queryString = 'INSERT INTO likes (user_id, product_id, star, message) VALUES (?, ?, ?, ?)'

    connection.query(queryString, [userId, productId, star, message], (err, result) => {
        if (err) {
            callback(err)
        }

        if (!result) {
            return callback(new Error('Failed to create Like'));
          }

        const { insertId } = <ResultSetHeader>result
        callback(null, insertId)

    })


}



export const findAllReviews = ( callback: Function ) => {
    const queryString = 'SELECT * FROM review '

    connection.query(queryString, (err, result) => {
        if (err) {
            callback(err)
        }

        const rows = <RowDataPacket[]> result
        const reviews: Review[] = []

        rows.forEach( row =>{
        const review : Review = {
            id: row.id,
            user: row.user_id,
            product: row.product_id,
            star: row.star,
            message: row.message,
            created_at: row.created_at
        }
        reviews.push(review)
    })
        callback(null, reviews)

    })


}

export const findReviewsByProduct = (productId: string, callback: Function) => {
    const queryString = `SELECT * FROM review WHERE product_id = ? `
  
    connection.query(queryString, [productId],  (error, result) => {
        if (error) {
            callback(error)
        }
  
        const rows = <RowDataPacket[]>result
        const reviews: Review[] = []
  
        rows.forEach((row) => {
            const review: Review = {
              id: row.id,
              user: row.user_id,
              product: row.product_id,
              star: row.star,
              message: row.message,
              created_at: row.created_at,
            };
            reviews.push(review)
        })
  
        callback(null, reviews)
    })
  }


  export const deleteReview = (reviewId: number, callback: Function) => {
    
  
    const deleteQuery = 'DELETE FROM review WHERE id = ?';
  
    connection.query(deleteQuery, [reviewId], (err) => {
      if (err) {
        callback(err);
        return;
      }

      

      callback(null);
    });
  };