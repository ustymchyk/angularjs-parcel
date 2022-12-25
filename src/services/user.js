import { app } from '../app';
import { passwordGeneratorService } from './password-generator';

export const userService = 'userService';

class User {
  constructor(passwordGeneratorService) {
    this.login = 'test';
    this.password = passwordGeneratorService.generatePassword();
  }

  changePassword(newPassword) {
    this.password = newPassword;
  }
}

User.$inject = [passwordGeneratorService];

app.service(userService, User);
