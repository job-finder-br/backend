const admin = require("firebase-admin");
const { v4: uuid } = require("uuid");
const serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "findjobs-702c7.appspot.com",
});

const bucket = admin.storage().bucket();

const token = uuid();
const filename = "pdf.pdf";
const [prefix, ext] = filename.split(".");

const new_filename = prefix + "-" + token + "." + ext;

//PDFS
bucket
  .upload("./" + filename, {
    destination: "curriculums/" + new_filename,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: token,
      },
    },
  })
  .then(console.log);

//Upload
// const {Storage} = require('@google-cloud/storage');

// // Creates a client
// const storage = new Storage();

// async function uploadFile() {
//   await storage.bucket(bucketName).upload(filePath, {
//     destination: destFileName,
//   });

//   console.log(`${filePath} uploaded to ${bucketName}`);
// }

// uploadFile().catch(console.error);

// const { Storage } = require("@google-cloud/storage");

// Creates a client
// const storage = new Storage();

// async function downloadFile() {
//   const options = {
//     destination: destFileName,
//   };

//   // Downloads the file
//   await storage.bucket(bucketName).file(fileName).download(options);

//   console.log(
//     `gs://${bucketName}/${fileName} downloaded to ${destFileName}.`
//   );
// }

// downloadFile().catch(console.error);
