import { app } from '../app';
import { nanoid } from 'nanoid';

export const passwordGeneratorService = 'passwordGenerator';

class PasswordGenerator {
  generatePassword() {
    return nanoid();
  }
}

app.service(passwordGeneratorService, PasswordGenerator);
