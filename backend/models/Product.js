const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // ✅ Multiple images for gallery
    images: {
      type: [String],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one image URL is required",
      },
    },

    // ✅ Optional thumbnail / main display image (for product cards)
    thumbnail: {
      type: String,
      default: "",
    },

    // ✅ Category (can be expanded later)
    category: {
      type: String,
      enum: ["TOPS", "BOTTOMS", "FOOTWEAR", "ACCESSORIES", "OUTERWEAR"],
      required: true,
    },

    // ✅ Stock per size (so you can manage inventory by size)
    sizes: [
      {
        size: {
          type: String,
          enum: ["XS", "S", "M", "L", "XL", "XXL"],
          required: true,
        },
        stock: {
          type: Number,
          default: 0,
        },
      },
    ],

    // ✅ Technical Material Info
    material: {
      type: String,
      required: true,
      maxlength: 500,
    },

    // ✅ Extra field: product specs or features
    technicalSpecs: {
      type: String,
      maxlength: 1000,
    },

    // ✅ Mark if it's a new drop (for “New Drop” tag)
    isNewDrop: {
      type: Boolean,
      default: false,
    },

    // ✅ Optional tags (for search/filtering)
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
