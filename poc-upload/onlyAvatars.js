const admin = require("firebase-admin");
const { v4: uuid } = require("uuid");
const serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "findjobs-702c7.appspot.com",
});

const bucket = admin.storage().bucket();

const token = uuid();
const filename = "dale.png";
const [prefix, ext] = filename.split(".");

const new_filename = prefix + "-" + token + "." + ext;

//Imagens
bucket
  .upload("./" + filename, {
    destination: "avatars/" + new_filename,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: token,
      },
    },
  })
  .then(console.log);
