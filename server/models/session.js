const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  currentCode: { type: String, default: '' },
  chatHistory: [
    {
      sender: { type: String },
      message: { type: String },
      timestamp: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
