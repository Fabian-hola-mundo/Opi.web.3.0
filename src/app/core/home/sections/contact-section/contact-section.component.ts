import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpiButtonComponent } from '../../../shared/components/opi-button/opi-button.component';
import { OpiSectionWrapperComponent } from '../../../shared/components/opi-section-wrapper/opi-section-wrapper.component';

export interface Consultant {
  id: string;
  name: string;
  role: string;
  quote: string;
  initials: string;
}

@Component({
  selector: 'app-contact-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, OpiSectionWrapperComponent, OpiButtonComponent],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
})
export class ContactSectionComponent {
  readonly consultants: Consultant[] = [
    {
      id: 'c1',
      name: 'Marc Jensen',
      role: 'Arquitecto de IA',
      initials: 'MJ',
      quote: '"Analizaremos tu arquitectura actual para trazar una hoja de ruta hacia el siguiente nivel de impacto."',
    },
    {
      id: 'c2',
      name: 'Elena Vance',
      role: 'Especialista Cloud',
      initials: 'EV',
      quote: '"Evaluaremos tus necesidades de escalabilidad y diseñaremos una estrategia cloud optimizada."',
    },
    {
      id: 'c3',
      name: 'Thomas Reed',
      role: 'Estrategia Digital',
      initials: 'TR',
      quote: '"Exploraremos cómo potenciar tus flujos de trabajo actuales a través de una digitalización integral."',
    }
  ];

  readonly selectedConsultantId = signal<string>('c1');
  
  readonly selectedConsultantQuote = computed(() => {
    return this.consultants.find(c => c.id === this.selectedConsultantId())?.quote;
  });

  readonly currentMonth = signal<string>('Octubre 2024');
  readonly weekDays = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
  
  readonly calendarGrid = [
    [ {day: 29, outOfMonth: true}, {day: 30, outOfMonth: true}, {day: 1, outOfMonth: false}, {day: 2, outOfMonth: false}, {day: 3, outOfMonth: false}, {day: 4, outOfMonth: false}, {day: 5, outOfMonth: false} ],
    [ {day: 6, outOfMonth: false}, {day: 7, outOfMonth: false}, {day: 8, outOfMonth: false}, {day: 9, outOfMonth: false}, {day: 10, outOfMonth: false}, {day: 11, outOfMonth: false}, {day: 12, outOfMonth: false} ],
    [ {day: 13, outOfMonth: false}, {day: 14, outOfMonth: false}, {day: 15, outOfMonth: false}, {day: 16, outOfMonth: false}, {day: 17, outOfMonth: false}, {day: 18, outOfMonth: false}, {day: 19, outOfMonth: false} ],
    [ {day: 20, outOfMonth: false}, {day: 21, outOfMonth: false}, {day: 22, outOfMonth: false}, {day: 23, outOfMonth: false}, {day: 24, outOfMonth: false}, {day: 25, outOfMonth: false}, {day: 26, outOfMonth: false} ],
    [ {day: 27, outOfMonth: false}, {day: 28, outOfMonth: false}, {day: 29, outOfMonth: false}, {day: 30, outOfMonth: false}, {day: 31, outOfMonth: false}, {day: 1, outOfMonth: true}, {day: 2, outOfMonth: true} ],
  ];

  readonly selectedDate = signal<number | null>(14);

  readonly timeSlots = ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM'];
  readonly selectedTime = signal<string>('10:30 AM');

  selectConsultant(id: string) {
    this.selectedConsultantId.set(id);
  }

  selectDate(day: number, outOfMonth: boolean) {
    if (!outOfMonth) {
      this.selectedDate.set(day);
    }
  }

  selectTime(time: string) {
    this.selectedTime.set(time);
  }

  confirmBooking() {
    window.open('https://outlook.office365.com/owa/calendar/OPITechnology@opitechnology.com/bookings/', '_blank');
  }
}
