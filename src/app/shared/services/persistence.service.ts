import { Injectable } from "@angular/core";

@Injectable()
export class PersistenceService {
  set(key: string, data: any) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }

  get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key)!);
    } catch (error) {
      console.error("Error getting data from localstorage", error);
      return null;
    }
  }
}
