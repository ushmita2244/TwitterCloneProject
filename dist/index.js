"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const like_1 = __importDefault(require("./routes/like"));
const login_1 = __importDefault(require("./routes/login"));
const tweet_1 = __importDefault(require("./routes/tweet"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
const PORT = 4000;
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.get("/", (req, res) => {
    res.render("home");
});
app.use("/user", user_1.default);
app.use("/login", login_1.default);
app.use("/tweet", tweet_1.default);
app.use("/likes", like_1.default);
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
