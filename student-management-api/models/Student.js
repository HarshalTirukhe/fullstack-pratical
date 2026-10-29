const mongoose = require("mongoose");
//imports the Mongoose library.
// Mongoose helps Node.js communicate with MongoDB.
// It allows you to define schemas, validate data, and perform database operations.

// A schema defines the structure of a document in MongoDB.

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,  // Removes leading and trailing whitespace.
    },

    rollNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, // Converts the email to lowercase before storing it.
    },

    course: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
      min: 1,  //Age cannot be less than 1.
    },
  },
  {
    timestamps: true,
  },
// Mongoose automatically manages two fields:
// createdAt — When the document was created.
// updatedAt — When the document was last updated.
);

module.exports = mongoose.model("Student", studentSchema);

// mongoose.model() creates a model from your schema.
// "Student" is the model name.
// studentSchema defines the document structure and validation.
// module.exports makes the model available to other files

// Schema: Defines the structure and validation rules of documents.
// Model: A compiled interface created from the schema that lets you interact with the corresponding MongoDB collection.
// Document: An individual student record stored in MongoDB.

// Express — Builds the backend API.
// Mongoose — Connects Node.js to MongoDB.
// dotenv — Loads environment variables from a .env file.