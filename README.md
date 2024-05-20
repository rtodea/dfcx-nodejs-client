# DialogFlow CX NodeJS Client

## Description

This is a NodeJS client for DialogFlow CX. It is a wrapper around the DialogFlow CX API.

## Installation

```bash
nvm install # to install the right Node version
npm ci # to install the dependencies
```

## Setup

```bash
export GOOGLE_APPLICATION_CREDENTIALS="path/to/your/credentials.json"
```

An example:
```bash
GOOGLE_APPLICATION_CREDENTIALS=/home/robert/git/mi/media-soup-server/src/secrets/api-project-604594715070-4fb96b0571e1.json
```

## Usage

Go into one for the `./src/samples` and run a particular sample:

```bash
node ./src/samples/google_store.js
```

## Proxy for Debugging HTTP SDK Calls

Install latest version of `mitmproxy` (which contains support for ProtoBuffer requests)

Run `mitmproxy`
```bash
mitmweb --listen-port 8888
```

Add extra variables to the env before running any script, for example:
```bash
HTTP_PROXY=http://localhost:8888
HTTPS_PROXY=http://localhost:8888
NODE_EXTRA_CA_CERTS=/home/robert/.mitmproxy/mitmproxy-ca-cert.pem
```

> Please note the `NODE_EXTRA_CA_CERTS` pointing to the `mitmproxy` location of own certificates
> Without this extra indication, any HTTPS call will fail

## REST Calls Directly

Use REST Client from WebStorm

```
POST https://dialogflow.googleapis.com/v3beta1/projects/api-project-604594715070/locations/global/agents/565978b6-f65a-4031-980a-441032ca038e/sessions/a2e55bba:detectIntent
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjRmYjk2YjA1NzFlMTQ2OWRjOTc2NDQyOGZiZTA1ZDkwZGMyNjczNDAifQ.eyJpc3MiOiJhcGktcHJvamVjdC02MDQ1OTQ3MTUwNzBAYXBwc3BvdC5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiYXBpLXByb2plY3QtNjA0NTk0NzE1MDcwQGFwcHNwb3QuZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imh0dHBzOi8vZGlhbG9nZmxvdy5nb29nbGVhcGlzLmNvbS8iLCJleHAiOjE3MTYyMTA1NjUsImlhdCI6MTcxNjIwNjk2NX0.DDqO_pXxBgPS_Zh9a--FlOF9qMhmpho8rnghgwCsju55aIJbDcDk7ucTK5izTFDn0vUVZC7rec-sHtHHeiYz-HJy5ksvWoyF7bL0xdIjIOgYgaQUQgRGTpFY30JlEnv6IwOGvFNs0YQjo66q-5jLvXzUpVrRuB3v4aFq1r34FfayDWo2AFeJvzOpW6ls_mFmyt0gSAKWTSoj4zpIVrh9Awllt6S3qIqp1SfOjqfLq5r5tCXlV4e-ECoW3ikD6CYyh1BCI7wfXGS9rrQBqsQK-GEjBM-0C8Wx-rAU7lQntKJT4sNUdeGWc1qf1UZ34WTh2VBqaDSNwh-CdC6CuRV6xw
Accept: application/json
Content-Type: application/json

{
  "queryInput": {
    "text": {"text": "Can you tell me the temperature"},
    "languageCode": "en"
  }
}
```

The `Authorization: Bearer <jwt>` line will need to be updated with the correct `<jwt>`.
For now this was intercepted from the gRPC SDK calls through `mitmproxy`.

<img src="./src/samples/func_tools/doc/img/mitmproxy-screenshot.png">
