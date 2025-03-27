"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supabaseClient_1 = __importDefault(require("../supabaseClient"));
const router = express_1.default.Router();
/**
 * @swagger
 * /api/user/getUsername:
 *   get:
 *     summary: Get the name of user
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/getUsername', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    supabaseClient_1.default
        .from('users')
        .select('username')
        .limit(1)
        .single()
        .then(({ data, error }) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        else if (data) {
            res.json({ message: data.username });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    });
    // const { data, error } = await supabase
    //   .from('users')
    //   .select('username')
    //   .limit(1)
    //   .single<User>();
    // if (error) {
    //   res.status(500).json({ error: error.message });
    // }
    // if (data) {
    //   res.json({ message: data.username });
    // }
    // console.log("I'm still here");
    // res.status(404).json({ message: 'User not found' });
}));
/**
 * @swagger
 * /api/user/createAccount:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
// router.post('/createAccount', (req, res) => {
//   // TODO
// });
exports.default = router;
