import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CustomersController } from './controllers/customers/customers.controller';
import { ValidateCustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware';
import { CustomersService } from './services/customers/customers.service';
import { Request, Response, NextFunction } from 'express';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ValidateCustomerMiddleware,
        ValidateCustomerAccountMiddleware,
        lastMiddleware,
      )
      .exclude({
        path: 'api/customers/create',
        method: RequestMethod.POST,
      })
      .forRoutes(CustomersController);
  }
}

const lastMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Final middleware');
  next();
};
