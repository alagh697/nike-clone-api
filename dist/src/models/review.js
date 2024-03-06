"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.findReviewsByProduct = exports.findAllReviews = exports.createReview = void 0;
const db_config_1 = __importDefault(require("../db-config"));
const createReview = (userId, productId, star, message, callback) => {
    const queryString = 'INSERT INTO review (user_id, product_id, star, message) VALUES (?, ?, ?, ?)';
    db_config_1.default.query(queryString, [userId, productId, star, message], (err, result) => {
        if (err) {
            callback(err);
        }
        if (!result) {
            return callback(new Error('Failed to create Review'));
        }
        const { insertId } = result;
        callback(null, insertId);
    });
};
exports.createReview = createReview;
const findAllReviews = (callback) => {
    const queryString = 'SELECT * FROM review ';
    db_config_1.default.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const reviews = [];
        rows.forEach(row => {
            const review = {
                id: row.id,
                user: row.user_id,
                product: row.product_id,
                star: row.star,
                message: row.message,
                created_at: row.created_at
            };
            reviews.push(review);
        });
        callback(null, reviews);
    });
};
exports.findAllReviews = findAllReviews;
const findReviewsByProduct = (productId, callback) => {
    const queryString = `SELECT * FROM review WHERE product_id = ? `;
    db_config_1.default.query(queryString, [productId], (error, result) => {
        if (error) {
            callback(error);
        }
        const rows = result;
        const reviews = [];
        rows.forEach((row) => {
            const review = {
                id: row.id,
                user: row.user_id,
                product: row.product_id,
                star: row.star,
                message: row.message,
                created_at: row.created_at,
            };
            reviews.push(review);
        });
        callback(null, reviews);
    });
};
exports.findReviewsByProduct = findReviewsByProduct;
const deleteReview = (reviewId, callback) => {
    const deleteQuery = 'DELETE FROM review WHERE id = ?';
    db_config_1.default.query(deleteQuery, [reviewId], (err) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null);
    });
};
exports.deleteReview = deleteReview;
//# sourceMappingURL=review.js.map