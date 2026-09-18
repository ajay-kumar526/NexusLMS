const mongoose = require("mongoose");
const Category = require("../models/Category");
require("dotenv").config();

const defaultCategories = [
    { name: "Web Development", description: "Courses about building websites and web applications." },
    { name: "Programming", description: "Courses about programming languages and software development." },
    { name: "Data Science", description: "Courses about data analysis, statistics, and data visualization." },
    { name: "Machine Learning", description: "Courses about machine learning and artificial intelligence." },
    { name: "Mobile Development", description: "Courses about Android and iOS application development." },
    { name: "Cloud Computing", description: "Courses about cloud platforms and infrastructure." },
];

exports.connect = async () => {
    if (!process.env.MONGODB_URL) {
        throw new Error("MONGODB_URL is not configured");
    }

    await mongoose.connect(process.env.MONGODB_URL);
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
        await Category.insertMany(defaultCategories);
        console.log("Default course categories created");
    }
    console.log("DB Connected Successfully");
};