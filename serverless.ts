import { functions } from '@functions/index';
import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'aws-serverless-sample', // service name
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'], //  add serverless-offline to check the endpoints offline / when you type serverless offline it will run locally 
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    profile: 'sls', // set this first in cli using aws configure --profile (sls) with the secrets
    stage: 'dev', // stage wil come in the end of the url / stage name
    stackName: '${self:service}-stack-${self:provider.stage}', // aws will not generate names instead it will add what i set here. / similar to project 
    apiName: "${self:service}-${self:provider.stage}",
    region: 'ap-southeast-1',
    endpointType: 'regional',
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
  functions: functions,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
