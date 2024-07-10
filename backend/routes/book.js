// routes/user.js
const express = require("express");
const upload = require("../config/multer");
const bookController = require("../controllers/bookControllers");
const router = express.Router();

router.post("/", upload.single("image"), bookController.createBook);
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBook);
router.put("/:id", upload.single("image"), bookController.editBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
