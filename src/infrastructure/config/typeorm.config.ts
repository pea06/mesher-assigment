import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DatabaseConfig } from '../../domain/config/database.interface';
import { EnvironmentConfigModule } from './environment-config.module';
import { EnvironmentConfigService } from './environment-config.service';

export const getTypeOrmModuleOptions = (config: DatabaseConfig): TypeOrmModuleOptions =>
  <TypeOrmModuleOptions>{
    type: 'postgres',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    synchronize: true,
    logging: true,
    entities: [__dirname + './../../**/*.entity{.ts,.js}'],
  };

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [EnvironmentConfigModule],
            inject: [EnvironmentConfigService],
            useFactory: getTypeOrmModuleOptions,
        }),
    ],
})
export class TypeOrmConfigModule {}