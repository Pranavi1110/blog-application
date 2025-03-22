const exp = require("express");
const adminApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const createUserOrAuthor = require("./createUserOrAuthor");
const UserAuthor = require("../modals/userAuthorModel");
const { requireAuth } = require("@clerk/express");
require("dotenv").config();

// API
adminApp.post("/admin", expressAsyncHandler(createUserOrAuthor));

// Get all users (excluding admins)
adminApp.get(
    "/both",
    requireAuth({ signInUrl: "unauthorized" }),
    expressAsyncHandler(async (req, res) => {
        const both = await UserAuthor.find({ role: { $ne: "admin" } });
        res.status(201).send({ message: "Both Users and Authors", payload: both });
    })
);

// Unauthorized route
adminApp.get("/unauthorized", (req, res) => {
    res.send({ message: "Unauthorized request" });
});

// Block/Unblock users
adminApp.put(
    "/both",
    requireAuth({ signInUrl: "unauthorized" }),
    expressAsyncHandler(async (req, res) => {
        const { email } = req.body;

        const both = await UserAuthor.findOne({ email, role: { $ne: "admin" } });

        if (!both) {
            return res.status(404).send({ message: "User/Author not found" });
        }

        both.isBlocked = !both.isBlocked;
        both.isActive = both.isBlocked ? "Blocked" : "Active";
        await both.save();

        res.status(200).send({ message: "User/Author updated successfully", payload: both });
    })
);

module.exports = adminApp;
