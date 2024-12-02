const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user", index: true },
    isActive: { type: Boolean, default: true }, // Soft delete
    lastLogin: { type: Date }, // Optional: Tracking login time
    metadata: { type: mongoose.Schema.Types.Mixed }, // For additional dynamic data
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual field to hide sensitive data
userSchema.virtual("isDeleted").get(function () {
  return !this.isActive;
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Soft delete method
userSchema.methods.softDelete = async function () {
  this.isActive = false;
  await this.save();
};

module.exports = mongoose.model("User", userSchema);
