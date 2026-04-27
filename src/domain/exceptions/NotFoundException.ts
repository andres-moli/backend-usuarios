import { DomainException } from './DomainException';

export class NotFoundException extends DomainException {
  constructor(resource: string, id?: string) {
    super(`${resource}${id ? ` con ID ${id}` : ''} no encontrado`, 404);
    this.name = 'NotFoundException';
  }
}