import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { OpiSectionWrapperComponent } from '../../../shared/components/opi-section-wrapper/opi-section-wrapper.component';
import { LanguageService } from '../../../../services/language.service';

const CONSULTANT_IDS = ['c1', 'c2', 'c3'];
const CONSULTANT_NAMES = ['Marc Jensen', 'Elena Vance', 'Thomas Reed'];
const CONSULTANT_INITIALS = ['MJ', 'EV', 'TR'];

const CALENDAR_GRID = [
  [ {day: 29, outOfMonth: true}, {day: 30, outOfMonth: true}, {day: 1, outOfMonth: false}, {day: 2, outOfMonth: false}, {day: 3, outOfMonth: false}, {day: 4, outOfMonth: false}, {day: 5, outOfMonth: false} ],
  [ {day: 6, outOfMonth: false}, {day: 7, outOfMonth: false}, {day: 8, outOfMonth: false}, {day: 9, outOfMonth: false}, {day: 10, outOfMonth: false}, {day: 11, outOfMonth: false}, {day: 12, outOfMonth: false} ],
  [ {day: 13, outOfMonth: false}, {day: 14, outOfMonth: false}, {day: 15, outOfMonth: false}, {day: 16, outOfMonth: false}, {day: 17, outOfMonth: false}, {day: 18, outOfMonth: false}, {day: 19, outOfMonth: false} ],
  [ {day: 20, outOfMonth: false}, {day: 21, outOfMonth: false}, {day: 22, outOfMonth: false}, {day: 23, outOfMonth: false}, {day: 24, outOfMonth: false}, {day: 25, outOfMonth: false}, {day: 26, outOfMonth: false} ],
  [ {day: 27, outOfMonth: false}, {day: 28, outOfMonth: false}, {day: 29, outOfMonth: false}, {day: 30, outOfMonth: false}, {day: 31, outOfMonth: false}, {day: 1, outOfMonth: true}, {day: 2, outOfMonth: true} ],
];

const TIME_SLOTS = ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM'];

@Component({
  selector: 'app-contact-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OpiSectionWrapperComponent],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
})
export class ContactSectionComponent {
  private readonly lang = inject(LanguageService);

  readonly i18n = computed(() => this.lang.translations().contact);

  readonly consultants = computed(() =>
    this.lang.translations().contact.consultants.map((c, i) => ({
      id: CONSULTANT_IDS[i],
      name: CONSULTANT_NAMES[i],
      initials: CONSULTANT_INITIALS[i],
      role: c.role,
      quote: c.quote,
    })),
  );

  readonly calendarGrid = CALENDAR_GRID;
  readonly timeSlots = TIME_SLOTS;

  readonly selectedConsultantId = signal<string>('c1');

  readonly selectedConsultantQuote = computed(
    () => this.consultants().find(c => c.id === this.selectedConsultantId())?.quote,
  );

  readonly selectedDate = signal<number | null>(14);
  readonly selectedTime = signal<string>('10:30 AM');

  selectConsultant(id: string): void {
    this.selectedConsultantId.set(id);
  }

  selectDate(day: number, outOfMonth: boolean): void {
    if (!outOfMonth) {
      this.selectedDate.set(day);
    }
  }

  selectTime(time: string): void {
    this.selectedTime.set(time);
  }

  confirmBooking(): void {
    window.open('https://outlook.office365.com/owa/calendar/OPITechnology@opitechnology.com/bookings/', '_blank');
  }
}
