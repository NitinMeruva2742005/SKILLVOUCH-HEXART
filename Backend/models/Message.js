import mongoose from '../db.js';

const messageSchema = new mongoose.Schema({
  _id: { type: String },
  senderId: { type: String, required: true, ref: 'User' },
  receiverId: { type: String, required: true, ref: 'User' },
  content: { type: String, required: true },
  timestamp: { type: Number, required: true },
  read: { type: Boolean, default: false }
}, { 
  timestamps: false,
  toJSON: { 
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Add indexes for performance
messageSchema.index({ senderId: 1, receiverId: 1 }); // For conversation queries
messageSchema.index({ timestamp: -1 }); // For sorting messages by time

export const Message = mongoose.model('Message', messageSchema);
export default Message;
