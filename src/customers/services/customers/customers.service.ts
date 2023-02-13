import { Injectable } from '@nestjs/common';
import { CreateCustomDto } from 'src/customers/dtos/CreateCustomer.dto';
import { Customer } from 'src/customers/types/Customer';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'ezekiel@gmail.com',
      name: 'Ezeikeil',
    },
    {
      id: 2,
      email: 'gabriael@gmail.com',
      name: 'Ezeikeil',
    },
    {
      id: 3,
      email: 'eve@gmail.com',
      name: 'Ezeikeil',
    },
  ];
  getCustomers() {
    return this.customers;
  }
  findCustomerById(id: number) {
    return this.customers.find((user) => user.id === id);
  }
  createCustomer(createCustomerDto: CreateCustomDto) {
    this.customers.push(createCustomerDto);
  }
}
