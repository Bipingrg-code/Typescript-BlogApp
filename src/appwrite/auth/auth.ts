import config from "../../config/api/config";

import { Client, Account, ID } from "appwrite";


interface accountType{
  email: string,
  password: string,
  name: string,
  id:string | boolean,
}

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }
  //   account create method
  async createAccount({ email, password, name }:accountType) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call login method if userExits
        return this.login({ email, password } as accountType);
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  //   login method
  async login({ email, password }:accountType) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  //   get current user methods
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    return null;
  }

  //   logout methods

  async logout() {
    try {
        await this.account.deleteSessions()
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
