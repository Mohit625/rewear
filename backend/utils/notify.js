import User from '../models/User.js';

export const notifyUser = async (userId, message) => {
  await User.findByIdAndUpdate(userId, {
    $push: {
      notifications: { message, date: new Date(), read: false }
    }
  });
};
