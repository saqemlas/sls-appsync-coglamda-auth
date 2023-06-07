# Full Stack Appsync w/ Cognito & Lambda Auth

## Info

This stack deploys a 
- Cognito User Pool, User Pool Domain, and Pool Client
- Appsync API with Cognito JWT (default) and Lambda Authentication (presignup)
- SPA Web Client in an S3 Bucket

## Usage

### Credentials:
```
export AWS_PROFILE = <profile>
```

### Install:
```
yarn install
```

### Check Types & Lint:
```
yarn run lint && yarn run checktsc
```

### Deploy:
```
yarn run deploy
```
*To deploy individual service, run **yarn deploy** from its directory.*

### Remove:
```
yarn run remove
```
*To remove individual service, run **yarn run remove** from its directory.*
