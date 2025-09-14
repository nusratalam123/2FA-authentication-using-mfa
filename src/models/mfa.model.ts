import mongoose, { Schema, Document } from 'mongoose';

export type MfaStatus = 'pending'|'approved'|'denied'|'expired'|'canceled';

export interface IMfaChallenge extends Document {
  challengeId: string;
  userId: mongoose.Types.ObjectId;
  deviceId?: string;
  nonce: string;
  code?: string;
  ip?: string;
  userAgent?: string;
  status: MfaStatus;
  createdAt: Date;
  expiresAt: Date;
  tsApproved?: Date;
  audit: { event: string; at: Date; meta?: any }[];
}

const AuditSchema = new Schema({ event: String, at: Date, meta: Schema.Types.Mixed }, { _id: false });

const MfaSchema = new Schema<IMfaChallenge>({
  challengeId: { type: String, index: true, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  deviceId: String,
  nonce: { type: String, required: true },
  code: String,
  ip: String,
  userAgent: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
  tsApproved: Date,
  audit: { type: [AuditSchema], default: [] }
});

export default mongoose.model<IMfaChallenge>('MfaChallenge', MfaSchema);
