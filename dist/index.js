"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const reviewRouter_1 = __importDefault(require("./routes/reviewRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const favoriteRouter_1 = __importDefault(require("./routes/favoriteRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/reviews', reviewRouter_1.default);
app.use('/users', userRouter_1.default);
app.use('/favorites', favoriteRouter_1.default);
// Custom error class
class MyCustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}
// Error handling middleware
app.use((err, req, res, next) => {
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
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
