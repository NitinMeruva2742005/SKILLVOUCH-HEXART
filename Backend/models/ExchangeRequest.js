import mongoose from '../db.js';

const exchangeRequestSchema = new mongoose.Schema({
  _id: { type: String },
  fromUserId: { type: String, required: true, ref: 'User' },
  toUserId: { type: String, required: true, ref: 'User' },
  offeredSkill: { type: String, required: true },
  requestedSkill: { type: String, required: true },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected', 'completed'], 
    default: 'pending' 
  },
  createdAt: { type: Number, required: true },
  completedAt: { type: Number }
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
exchangeRequestSchema.index({ fromUserId: 1, toUserId: 1 }); // For duplicate checking
exchangeRequestSchema.index({ status: 1 }); // For filtering by status
exchangeRequestSchema.index({ createdAt: -1 }); // For sorting by creation time

export const ExchangeRequest = mongoose.model('ExchangeRequest', exchangeRequestSchema);
export default ExchangeRequest;
