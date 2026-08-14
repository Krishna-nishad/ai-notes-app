require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

const PORT = 5000;


app.use("/api/auth",authRoutes);

app.use("/api/notes", noteRoutes);
app.use("/api/ai",aiRoutes);


app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.get("/about", (req,res) => {
    res.send("About API");
})

app.get("/contact", (req, res) => {
    res.send("Contact API");
});

app.get("/user", (req, res) => {

    res.json({
        name: "Krishna",
        age: 22,
        profession: "Developer"
    });

});

app.get("/api/product", (req,res) => {

    res.json({
        title: "laptop",
        price: 70000,
        brand: "Lenovo",
    });
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})