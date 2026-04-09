import { Injectable } from '@angular/core';

export interface ContactFormData {
  name: string;
  company: string;
  challenge: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class FormService {
  /**
   * Submit contact form data to Firebase Firestore.
   *
   * TODO: Install @angular/fire and configure Firebase credentials, then
   * replace the placeholder implementation below with the real integration:
   *
   *   import { getFirestore, collection, addDoc } from 'firebase/firestore';
   *   const db = getFirestore();
   *   await addDoc(collection(db, 'contact-submissions'), {
   *     ...data,
   *     submittedAt: new Date().toISOString(),
   *   });
   *
   * Collection: 'contact-submissions'
   */
  async submitContact(data: ContactFormData): Promise<void> {
    // Temporary: log to console until Firebase is configured
    console.log('[FormService] Contact submission:', data);
    return Promise.resolve();
  }
}
