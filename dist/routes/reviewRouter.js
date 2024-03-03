"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewModel = __importStar(require("../models/review"));
const reviewRouter = express_1.default.Router();
reviewRouter.get('/', async (req, res) => {
    reviewModel.findAllReviews((error, reviews) => {
        if (error) {
            res.status(500).json({ errorMessage: error.message });
        }
        return res.status(200).json(reviews);
    });
});
reviewRouter.post('/', async (req, res, next) => {
    try {
        const newReviewUserId = Number(req.body.user_id);
        const newReviewProductId = req.body.product_id;
        const newReviewStar = Number(req.body.star);
        const newReviewMessage = req.body.message;
        reviewModel.createReview(newReviewUserId, newReviewProductId, newReviewStar, newReviewMessage, (error, reviewId) => {
            if (error) {
                return next(error);
            }
            return res.status(201).json({ reviewId });
        });
    }
    catch (error) {
        // Handle any uncaught error here
        return next(error);
    }
});
reviewRouter.delete('/:id', async (req, res) => {
    const reviewId = Number(req.params.id);
    reviewModel.deleteReview(reviewId, (error) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(200).send();
    });
});
reviewRouter.get('/reviewsByProduct/:id', async (req, res) => {
    const productId = req.params.id;
    reviewModel.findReviewsByProduct(productId, (error, reviews) => {
        if (error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(200).json(reviews);
    });
});
exports.default = reviewRouter;
