const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const keys = require('../config/keys');

const { User } = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log('accessToken', accessToken);
      // console.log('refreshToke', refreshToken);
      // console.log('profile', profile);
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        console.log('user exist', JSON.stringify(existingUser, 0, 2));
        return done(null, existingUser);
      }

      const user = await new User({ googleId: profile.id }).save();
      console.log('create new user', JSON.stringify(user, 0, 2));
      done(null, user);
    }
  )
);
