const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config().sendgrid.key

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

exports.firebaseEmail = functions.https.onRequest((req, res) => {
    return Promise.resolve()
        .then(() => {
            if (req.method !== 'POST') {
                const error = new Error('Only Post requests are accepted');
                error.code = 405;
                throw error;
            }

            const msg = {
                to: user.email,
                from: 'hello@angularfirebase.com',
                subject:  'New Follower',
                // text: `Hey ${toName}. You have a new follower!!! `,
                // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,
    
                // custom templates
                templateId: 'd-d67fca3d2eb94265b9ff56cd06d8e379',
                substitutionWrappers: ['{{', '}}'],
                substitutions: {
                  name: user.displayName
                  // and other custom properties here
                }
            };

            return sgMail.send(msg)
        })
        .then((response) => {
            if (response.body) {
                res.send(response.body);
            } else {
                res.end();
            }
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        })
})