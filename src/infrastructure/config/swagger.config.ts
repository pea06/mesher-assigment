import {INestApplication} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

export const configSwagger = (app: INestApplication): void => {
    const options = new DocumentBuilder()
      .setTitle('mesher assignment api docs')
      .setDescription('API docs for Mesher assignment')
      .setContact('wangyu', 'no', 'dev.jowangyu@gmail.com')
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api-docs', app, document);
};