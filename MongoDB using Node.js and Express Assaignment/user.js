import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true, // Add this if lastName is mandatory
    },
    hobby: {
        type: String,
        required: true, // Add this if hobby is mandatory
    },
    isAdult: {
        type: Boolean,
        default: true, // Default value is enough; no need for "required"
    },
    age: {
        type: Number,
        required: true,
    }
}, { collection: "users" }); // Ensures MongoDB uses "users" instead of "User"

export default mongoose.model("User", userSchema);
