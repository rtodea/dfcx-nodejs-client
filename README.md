# DialogFlow CX NodeJS Client

## Description

This is a NodeJS client for DialogFlow CX. It is a wrapper around the DialogFlow CX API.

## Installation

```bash
nvm install # to install the right Node version
npm ci # to install the dependencies
```

## Bots

1. Google Store 
2. Blood Donation Agent

## Setup

```bash
export GOOGLE_APPLICATION_CREDENTIALS="path/to/your/credentials.json"
```

An example:
```bash
GOOGLE_APPLICATION_CREDENTIALS=/home/robert/git/mi/media-soup-server/src/secrets/api-project-604594715070-4fb96b0571e1.json
```

## Usage

```bash
node index.js
```

### REST request and authentication : 

Follow the steps on this page : https://cloud.google.com/docs/authentication/rest#rest-request

Steps on this page : 
1. Install the Google Cloud CLI : 
   a. https://cloud.google.com/sdk/docs/install  , follow the steps based on your OS
   b. use command : gcloud init
2. Enable the Cloud Resource Manager and Identity and Access Management (IAM) APIs:
gcloud services enable cloudresourcemanager.googleapis.com iam.googleapis.com -- project {projectID}

   a. The documentation does not mention we have to specify projectID. But it is required to execute the above command
   b. While following the above steps, one may be prompted to set the account or enter valid credentials for the Google account :  
       - Execute command : gcloud auth login
       - A link will be shown in the terminal. Open the link in a browser
       - The link will ask you to login into your Google account.
   c. After logging in, execute the command again :
      gcloud services enable cloudresourcemanager.googleapis.com iam.googleapis.com -- project {projectID}

   Some other commands which might come in handy : 
    - see the list of your authenticated accounts with Google Cloud SDK : $ gcloud auth list
    - log in to Google Cloud using your Google account : $ gcloud auth login {google account}
          example : $ gcloud auth login sgoel@mobileinsight.com

3. You can now make REST and GET/POST requests


