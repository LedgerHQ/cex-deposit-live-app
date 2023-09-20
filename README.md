# CEX to Deposit Live App

This is a web application that uses [Next.js](https://nextjs.org/)
and is intended to be integrated within ledger products, enabling users to seamlessly connect to dapps supporting the walletconnect wallet adapter.

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/summary/new_code?id=ledger_cex-deposit-live-app)

## Hosting

This live app is currently hosted at "TO BE DEFINED"

## Getting Started

### Environment

First, create an `.env.local` file locally at the root of the repository. You can duplicate `.env.example` and name the new copy `.env.local`.

### Proto

**⚠️ Important**: In order to use install the right version of the tools you will need to install the [`proto`](https://moonrepo.dev/proto) toolchain manager.
Please follow the instructions on the [**proto**](https://moonrepo.dev/docs/proto/install) website to install it.

Once you have installed `proto`, please run the following command:

```bash
# Will download and install the supported versions of nodejs, npm and pnpm.
# Run it from the root or a subfolder of the repository.
proto use
```

First, you should install dependencies

```bash
yarn
```

Secondly, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Manifest

All Live apps are defined with a manifest. Here is one that can be used for local development:

```json
{
 "id": "ledger-cex-deposit",
 "name": "Ledger Exchange Connect",
 "url": "http://localhost:3000/",
 "params": {},
 "homepageUrl": "https://ledger.com/",
 "icon": "https://refer-a-friend-frontend-stg.aws.stg.ldg-tech.com/referral-ll/assets/images/referral.png",
 "platform": "all",
 "apiVersion": "^2.0.0",
 "manifestVersion": "1",
 "branch": "stable",
 "categories": ["bridge", "defi"],
 "currencies": ["*"],
 "content": {
  "shortDescription": {
   "en": "This is a short description"
  },
  "description": {
   "en": "This is a long description"
  }
 },
 "permissions": [
  "account.list",
  "account.request",
  "message.sign",
  "transaction.sign",
  "transaction.signAndBroadcast",
  "wallet.userId",
  "wallet.info"
 ],
 "domains": ["http://*", "https://*"]
}
```

### Testing Strategy & Prerequisites

We use [`Jest`](https://jestjs.io/) and
[`React Testing Library`](https://testing-library.com/docs/react-testing-library/intro/)

#### Launch tests

The live-app contains unit tests and integration tests.
To run tests :

```bash
yarn test:unit
```

To run tests and coverage :

```bash
yarn test:coverage
```

#### Naming convention

To create a simple unit test, use the `*.test.ts(x)` pattern.
To create an integration test, use the `*.integration.test.ts` pattern.
