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
