import connection from '../db-config'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import Favorite from '../types/favorite'

export const createFavorite = (userId: number, productId: string, callback: Function ) => {
    const queryString = 'INSERT INTO likes (user_id, product_id) VALUES (?, ?)'

    connection.query(queryString, [userId, productId], (err, result) => {
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



export const findAllFavorites = ( callback: Function ) => {
    const queryString = 'SELECT * FROM favorite '

    connection.query(queryString, (err, result) => {
        if (err) {
            callback(err)
        }

        const rows = <RowDataPacket[]> result
        const favorites: Favorite[] = []

        rows.forEach( row =>{
        const favorite : Favorite = {
            id: row.id,
            user: row.user_id,
            product: row.product_id,
            created_at: row.created_at
        }
        favorites.push(favorite)
    })
        callback(null, favorites)

    })


}

export const findFavoritesByProduct = (productId: string, callback: Function) => {
    const queryString = `SELECT * FROM favorite WHERE product_id = ? `
  
    connection.query(queryString, [productId],  (error, result) => {
        if (error) {
            callback(error)
        }
  
        const rows = <RowDataPacket[]>result
        const favorites: Favorite[] = []
  
        rows.forEach((row) => {
            const favorite: Favorite = {
                id: row.id,
                user: row.user_id,
                product: row.product_id,
                created_at: row.created_at
            }
            favorites.push(favorite)
        })
  
        callback(null, favorites)
    })
  }


  export const deleteFavorite = (favoriteId: number, callback: Function) => {
    
  
    const deleteQuery = 'DELETE FROM favorite WHERE id = ?';
  
    connection.query(deleteQuery, [favoriteId], (err) => {
      if (err) {
        callback(err);
        return;
      }

      

      callback(null);
    });
  };