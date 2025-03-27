"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const swagger_1 = require("./swagger");
const path = require('path');
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Serve the static files from the React app
app.use(express_1.default.static(path.join(__dirname, '../client/build')));
// Handle requests by serving index.html for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
// Routes
app.use('/api/user', userRoutes_1.default);
app.use('/api/post', postRoutes_1.default);
// Setup Swagger
(0, swagger_1.setupSwagger)(app);
app.listen(config_1.config.port, () => {
    console.log(`Server running on port ${config_1.config.port}`);
    if (config_1.config.nodeEnv === "development") {
        console.log(`For Dev: http://localhost:${config_1.config.port}/api-docs`);
    }
});
