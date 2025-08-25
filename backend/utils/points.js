module.exports = {
    awardPoints(user, amount) {
      user.points += amount;
      return user.save();
    },
    deductPoints(user, amount) {
      if (user.points >= amount) {
        user.points -= amount;
        return user.save();
      } else {
        throw new Error('Insufficient points');
      }
    }
  };
  