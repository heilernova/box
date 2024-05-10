import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { appInitConfig } from '@app/config';
import { AllExceptionsFilter, AppResponseInterceptor } from '@app/config/interceptors';

async function bootstrap() {
  appInitConfig();
  const port: string = process.env.PORT ?? '3000';
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalInterceptors(new AppResponseInterceptor());
  await app.listen(port);
  console.log(`[APP] running in port ${port}`);
}
bootstrap();
