const _ = require('lodash');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
//const WechatStrategy = require('passport-wechat').Strategy;

const User = require('./models/User.js');


// Sample of using passport w/ mult strategies
// https://gist.github.com/joshbirk/1732068

// Facebook App
// https://developers.facebook.com/apps/177422786204498/settings/basic/
// Twitter App
// https://apps.twitter.com/app/14788327

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `done`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new FacebookStrategy({
		clientID: '177422786204498', //process.env.CLIENT_ID
		clientSecret: '212f8c70ab460f524e47ccfb05a8c405', //process.env.CLIENT_SECRET
		callbackURL: 'http://localhost:4200/login/facebook/callback',
		profileFields: ['id', 'name', 'picture.type(large)', 'emails', 'displayName', 'gender'],
		enableProof: true,
	},
	(accessToken, refreshToken, profile, done) => {
		// In this example, the user's Facebook profile is supplied as the user
		// record.  In a production-quality application, the Facebook profile should
		// be associated with a user record in the application's database, which
		// allows for account linking and authentication with other identity
		// providers.

		const login_id = profile.id;
		const login_type = 'facebook';

		// First find if the user of the login id/platform exist in DB
		User.findOne({login_id, login_type}).then(user => {
			if (user) {
				return done(null, user);
			}
			// If not found registered user in DB, create new one
			else {
				const {
					gender,
					displayName,
				} = profile;

				const name = displayName || 
					_.compact([
						_.get(profile, 'name.givenName'),
						_.get(profile, 'name.middleName'),
						_.get(profile, 'name.familyName')
					]).join(' ');

				const custom_photo = _.get(profile, 'photos[0].value');

				const email = _.get(profile, 'emails[0].value');

				const new_user = new User({
					login_id,
					login_type,
					name,
					gender,
					email,
					custom_photo,
				});

				new_user.save().then(user => {
					console.log(`SAVED NEW USER ${user.id}`);
					return done(null, user);
				}, err => {
					console.log('SAVE USER ERROR!', err);
					return done(new Error, false);
				});
			}
		});
	}
));


passport.use(new TwitterStrategy({
		consumerKey: 'mtwbupsODq1BUtaLQ1ZjaCh3n',
  		consumerSecret: 'EvTYdZeTbs9RIHieEIZUVxjlBD4Xkq5IfusHpAlo1CdDUfTMDP',
		callbackURL: 'http://localhost:4200/login/twitter/callback',
		profileFields: ['id', 'name', 'picture.type(large)', 'emails', 'displayName', 'gender'],
		enableProof: true,
	},
	(token, tokenSecret, profile, done) => {
		const login_id = profile.id;
		const login_type = 'twitter';

		// First find if the user of the login id/platform exist in DB
		User.findOne({login_id, login_type}).then(user => {
			if (user) {
				return done(null, user);
			}
			// If not found registered user in DB, create new one
			else {
				const {
					displayName,
					username,
				} = profile;

				const name = displayName || username;

				const normal_photo = _.get(profile, 'photos[0].value');
				const custom_photo = normal_photo.replace('_normal', '');

				const new_user = new User({
					login_id,
					login_type,
					name,
					custom_photo,
				});

				new_user.save().then(user => {
					console.log(`SAVED NEW USER ${user.id}`);
					return done(null, user);
				}, err => {
					console.log('SAVE USER ERROR!', err);
					return done(new Error, false);
				});
			}
		});
	}
));



// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});


module.exports = passport;
