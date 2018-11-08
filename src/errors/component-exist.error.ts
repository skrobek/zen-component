export class ComponentExistError extends Error {
  constructor(message: string = 'Component already exists') {
    super(message);

    this.name = 'ComponentExistError';
  }
}