import type { AWS } from '@serverless/typescript';
import functions from '@functions/index';

const serverlessConfiguration: AWS = {
  service: "aws-serverless-sample", // service name
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"], //  add serverless-offline to check the endpoints offline / when you type serverless offline it will run locally
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
    profile: "sls", // set this first in cli using aws configure --profile (sls) with the secrets
    stage: "dev", // stage wil come in the end of the url / stage name
    stackName: "${self:service}-stack-${sls:stage}", // aws will not generate names instead it will add what i set here. / similar to project
    apiName: "${self:service}-${sls:stage}",
    region: "ap-southeast-1",
    timeout: 30,
    endpointType: "regional",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: ["${self:provider.apiName}-{sls:stage}-apikey"],
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Scan",
        ],
        Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/notes",
      },
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
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
      exclude: ["aws-sdk"],
      target: "node18",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  // resources: {
  //   Resources: {
  //     ...dynamodb,
  //   },
  // },
};

module.exports = serverlessConfiguration;
