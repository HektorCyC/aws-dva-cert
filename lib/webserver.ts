import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import { DockerImageAsset } from '@aws-cdk/aws-ecr-assets';
import * as escp from '@aws-cdk/aws-ecs-patterns';
import * as ecs from '@aws-cdk/aws-ecs';
import * as apig from '@aws-cdk/aws-apigatewayv2';
import * as path from 'path';

interface DocumentManagementWebServerProps {
    vpc: ec2.IVpc,
    api: apig.HttpApi
}

export class DocumentManagementWebServer extends cdk.Construct {

    constructor(scope: cdk.Construct, id: string, props: DocumentManagementWebServerProps) {
        super(scope, id);

        const webServerDocker = new DockerImageAsset(this, 'WebServerDockerAsset', {
            directory: path.join(__dirname, '..', 'containers', 'webserver')
        });

        const fargateService = new escp.ApplicationLoadBalancedFargateService(this, 'WebserverService', {
            vpc: props.vpc,
            taskImageOptions: {
                image: ecs.ContainerImage.fromDockerImageAsset(webServerDocker),
                environment: {
                    SERVER_PORT: "8080",
                    API_BASE: props.api.url!
                },
                containerPort: 8080
            }
        });

        new cdk.CfnOutput(this, 'WebserverHost', {
            exportName: 'WebserverHost',
            value: fargateService.loadBalancer.loadBalancerName
        });
    };
}