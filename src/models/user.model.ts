import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBackupCode { codeHash: string; used: boolean; }

export interface IUser extends Document {
  username: string;
  email?: string;
  passwordHash: string;
  mfa?: {
    enabled: boolean;
    totpSecret?: string;
    backupCodes?: IBackupCode[];
    trustedDevices?: { deviceId: string; expiresAt: Date }[];
  };
}

const BackupCodeSchema = new Schema({ codeHash: String, used: { type: Boolean, default: false } }, { _id: false });

const UserSchema = new Schema<IUser>({
  username: { type: String, required: false, unique: true },
  email: { type: String },
  passwordHash: { type: String, required: true },
  mfa: {
    enabled: { type: Boolean, default: false },
    totpSecret: { type: String },
    backupCodes: { type: [BackupCodeSchema], default: [] },
    trustedDevices: { type: [{ deviceId: String, expiresAt: Date }], default: [] }
  }
}, { timestamps: true });

// ✅ Named export
export const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
