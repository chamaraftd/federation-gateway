import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';

import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { IntrospectAndCompose } from '@apollo/gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        cors: true,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'students', url: process.env.STUDENT_SERVICE_URI },
          ],
        }),
      },
    }),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class AppModule {}
