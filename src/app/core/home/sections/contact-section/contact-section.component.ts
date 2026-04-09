import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormService } from '../../../../services/form.service';
import { OpiButtonComponent } from '../../../shared/components/opi-button/opi-button.component';
import { OpiSectionWrapperComponent } from '../../../shared/components/opi-section-wrapper/opi-section-wrapper.component';

@Component({
  selector: 'app-contact-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OpiSectionWrapperComponent, OpiButtonComponent, ReactiveFormsModule],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
})
export class ContactSectionComponent {
  private readonly fb = inject(FormBuilder);
  private readonly formService = inject(FormService);

  readonly isSubmitting = signal(false);
  readonly submitSuccess = signal(false);
  readonly submitError = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    company: ['', Validators.required],
    challenge: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    this.submitError.set(null);
    try {
      await this.formService.submitContact(this.form.getRawValue());
      this.submitSuccess.set(true);
      this.form.reset();
    } catch {
      this.submitError.set('Hubo un error al enviar. Por favor intenta de nuevo.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
