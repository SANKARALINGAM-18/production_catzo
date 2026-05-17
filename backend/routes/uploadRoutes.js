const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');
const { protect, admin } = require('../middleware/auth');

// @desc    Upload product image to Cloudinary
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image file.' });
        }

        // Upload buffer directly to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'catzo_products', // Organizes files beautifully inside Cloudinary
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload stream failed:", error);
                    return res.status(500).json({ message: 'Failed to upload image to Cloudinary' });
                }

                // Return secure URL and details
                res.status(200).json({
                    url: result.secure_url,
                    public_id: result.public_id
                });
            }
        );

        // Write the file buffer to the Cloudinary upload stream
        uploadStream.end(req.file.buffer);

    } catch (error) {
        console.error("Upload route error:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
