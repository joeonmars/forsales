const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
//const WechatStrategy = require('passport-wechat').Strategy;

// Sample of using passport w/ mult strategies
// https://gist.github.com/joshbirk/1732068

// Facebook App
// https://developers.facebook.com/apps/177422786204498/settings/basic/

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
		return done(null, profile);
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