import mongoose from 'mongoose';
import {Last10secReq} from "../types/tsTypes";


const UsersIPLast10secCollectionRegEmailResSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: [true, 'ip is required']
  },
  createdAt: {
    type: String,
    required: [true, 'createdAt is required']
  }
})

export const MyModeLast10secRedEmailRes = mongoose.model<Last10secReq>("usersIPLast10secCollectionRegEmailResSchema", UsersIPLast10secCollectionRegEmailResSchema, "Last10secRedEmailRes")