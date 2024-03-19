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
// import verifyToken from "../middleware/verifyToken";
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    let response = yield prisma.user.create({
        data: {
            firstName, lastName, email, password
        }
    });
    console.log(response);
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUser = yield prisma.user.findMany();
    res.json();
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    const user = yield prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    const deleteUser = yield prisma.user.delete({
        where: {
            id: userId,
        }
    });
    res.json(deleteUser);
}));
router.put("/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    // const (firstName,LastName,email,password)=req.body
});
router.get("/tweets", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweets = yield prisma.tweet.findMany({
            include: {
                user: true
            }
        });
        res.json(tweets);
    }
    catch (error) {
        res.status(500).json({ error: "error occured" });
    }
}));
router.get("/tweets/:tweetId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tweetId } = req.params;
        const tweet = yield prisma.tweet.findUnique({
            where: {
                id: parseInt(tweetId)
            },
            include: {
                user: true
            }
        });
        if (!tweet) {
            return res.status(404).json({ error: "tweet not found" });
        }
        res.json(tweet);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "error occured" });
    }
}));
router.get("/profile/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield prisma.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        });
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }
        const tweets = yield prisma.tweet.findMany({
            where: {
                userId: parseInt(userId)
            },
            include: {
                user: true
            }
        });
        const userProfile = {
            user,
            tweets
        };
        res.json(userProfile);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "error occured" });
    }
}));
exports.default = router;
