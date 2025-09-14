import mongoose, { Schema, Document } from 'mongoose';

export interface IDevice extends Document {
  userId: mongoose.Types.ObjectId;
  deviceId: string;
  name?: string;
  platform?: string;
  socketId?: string | null;
  publicKeyPem: string;
  status: 'active' | 'revoked';
  createdAt: Date;
  lastSeenAt?: Date;
}

const DeviceSchema = new Schema<IDevice>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  deviceId: { type: String, required: true, index: true },
  name: String,
  platform: String,
  socketId: String,
  publicKeyPem: String,
  status: { type: String, default: 'active' },
  lastSeenAt: Date
}, { timestamps: true });

export default mongoose.model<IDevice>('Device', DeviceSchema);
