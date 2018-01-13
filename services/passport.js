const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const keys = require('../config/keys');

const { User } = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log('accessToken', accessToken);
      // console.log('refreshToke', refreshToken);
      // console.log('profile', profile);
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          console.log('user exist', JSON.stringify(user, 0, 2));
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id }).save().then(user => {
            console.log('create new user', JSON.stringify(user, 0, 2));
            done(null, user);
          });
        }
      });
    }
  )
);
