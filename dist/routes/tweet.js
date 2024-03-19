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
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../utils/auth"));
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const userId = req.user.id;
    let result = yield prisma.tweet.create({
        data: {
            title,
            content,
            userId,
        }
    });
    console.log(result);
    res.send({ result: result });
}));
router.delete("/tweets/:tweetId", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tweetId } = req.params;
        const tweet = yield prisma.tweet.findUnique({
            where: {
                id: parseInt(tweetId)
            }
        });
        if (!tweet) {
            return res.status(404).json({ error: "tweet not found" });
        }
        yield prisma.tweet.delete({
            where: {
                id: parseInt(tweetId)
            }
        });
        res.json({ message: "tweet deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "error occured" });
    }
}));
router.put("/tweets/:tweetId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tweetId } = req.params;
        const { content } = req.body;
        const updatedTweet = yield prisma.tweet.update({
            where: {
                id: parseInt(tweetId)
            },
            data: {
                content
            }
        });
        res.json(updatedTweet);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "error occured" });
    }
}));
exports.default = router;
