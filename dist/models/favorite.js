"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFavorite = exports.findFavoritesByProduct = exports.findAllFavorites = exports.createFavorite = void 0;
const db_config_1 = __importDefault(require("../db-config"));
const createFavorite = (userId, productId, callback) => {
    const queryString = 'INSERT INTO likes (user_id, product_id) VALUES (?, ?)';
    db_config_1.default.query(queryString, [userId, productId], (err, result) => {
        if (err) {
            callback(err);
        }
        if (!result) {
            return callback(new Error('Failed to create Like'));
        }
        const { insertId } = result;
        callback(null, insertId);
    });
};
exports.createFavorite = createFavorite;
const findAllFavorites = (callback) => {
    const queryString = 'SELECT * FROM favorite ';
    db_config_1.default.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const favorites = [];
        rows.forEach(row => {
            const favorite = {
                id: row.id,
                user: row.user_id,
                product: row.product_id,
                created_at: row.created_at
            };
            favorites.push(favorite);
        });
        callback(null, favorites);
    });
};
exports.findAllFavorites = findAllFavorites;
const findFavoritesByProduct = (productId, callback) => {
    const queryString = `SELECT * FROM favorite WHERE product_id = ? `;
    db_config_1.default.query(queryString, [productId], (error, result) => {
        if (error) {
            callback(error);
        }
        const rows = result;
        const favorites = [];
        rows.forEach((row) => {
            const favorite = {
                id: row.id,
                user: row.user_id,
                product: row.product_id,
                created_at: row.created_at
            };
            favorites.push(favorite);
        });
        callback(null, favorites);
    });
};
exports.findFavoritesByProduct = findFavoritesByProduct;
const deleteFavorite = (favoriteId, callback) => {
    const deleteQuery = 'DELETE FROM favorite WHERE id = ?';
    db_config_1.default.query(deleteQuery, [favoriteId], (err) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null);
    });
};
exports.deleteFavorite = deleteFavorite;
