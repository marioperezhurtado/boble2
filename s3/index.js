import fs from 'fs';
import S3rver from 's3rver';

// Fake S3 server for local development

new S3rver({
  port: 5000,
  directory: './s3',
  configureBuckets: [
    {
      name: 'boble-files',
      configs: [fs.readFileSync("./s3/cors.xml")],
    },
  ],
}).run();
