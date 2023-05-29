import * as pizzaConfigurationData from './pizza-configuration.json';

export class PizzaData {
  constructor(public id: string, public value: string) {}
}

export class PizzaConfiguration {
  public crustTypes: PizzaData[];
  public flavors: PizzaData[];
  public sizes: PizzaData[];

  constructor() {
    let data: any = pizzaConfigurationData;
    this.crustTypes = data.crustTypes;
    this.flavors = data.flavors;
    this.sizes = data.sizes;
  }
}
