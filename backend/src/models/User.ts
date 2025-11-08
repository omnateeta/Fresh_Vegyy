import bcrypt from 'bcryptjs';
import { Schema, model, Document } from 'mongoose';

export type UserRole = 'user' | 'admin' | 'delivery';

export interface Address {
  label: string;
  line1: string;
  line2?: string;
  city: string;
  postalCode: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  addresses: Address[];
  preferences: {
    favouriteCategories: string[];
    lastOrderAt?: Date;
  };
  comparePassword(candidate: string): Promise<boolean>;
}

const addressSchema = new Schema<Address>(
  {
    label: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    location: {
      lat: Number,
      lng: Number
    }
  },
  { _id: false }
);

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'delivery'], default: 'user' },
    addresses: { type: [addressSchema], default: [] },
    preferences: {
      favouriteCategories: { type: [String], default: [] },
      lastOrderAt: { type: Date }
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

userSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export const User = model<IUser>('User', userSchema);


