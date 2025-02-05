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
const authcontroller_1 = require("../controllers/authcontroller");
const auth_1 = require("../middleware/auth");
const TimeSheetController_1 = require("../controllers/TimeSheetController");
const ReportService_1 = require("../services/ReportService");
const router = express_1.default.Router();
router.post("/register", authcontroller_1.register);
router.post("/login", authcontroller_1.login);
router.post("/logout", auth_1.authenticate, authcontroller_1.logout);
router.post("/timesheets", auth_1.authenticate, TimeSheetController_1.createTimesheetController);
router.get("/report", auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ReportService_1.generateReport)(res);
}));
exports.default = router;
