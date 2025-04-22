import type { AWS } from '@serverless/typescript';

import greeting from '@functions/greeting'; // give the folder path 

const serverlessConfiguration: AWS = {
  service: 'aws-serverless-sample',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'], //  add serverless-offline to check the endpoints offline / when you type sls offline it will run locally 
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    profile: 'sls', // set this first in cli using aws configure --profile (sls) with the secrets
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { hello },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
