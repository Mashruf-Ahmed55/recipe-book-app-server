import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  photo_url: {
    type: String,
  },
  auth_type: {
    type: String,
  },
});

export default mongoose.model('User', userSchema);
