import { DomainException } from './DomainException';

export class ValidationException extends DomainException {
  public readonly errors: string[];
  
  constructor(message: string, errors: string[] = []) {
    super(message, 400);
    this.errors = errors;
    this.name = 'ValidationException';
  }
}