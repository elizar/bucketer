# S3 bucketer
test script for authenticating and communicating with amazon's S3 web
service API
 
### Todoledo:
 * Refactor and clean code it's kinda messy right now
 
### Setup:
 - Create an `s3.json` file with the following settings:

    ```json
     {
     "s3Key": "<your-s3-key>",
     "s3Secret": "<your-s3-secret>",
     "bucket": "<s3-bucket>"
     }
    ```
 - then run ` $ node s3.js `
