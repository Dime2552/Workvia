import { ChangeDetectorRef, Component } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AuthenticationService } from '../../../../core/services/authentication';
import { ShiftService } from '../../../../core/services/shift';

@Component({
  selector: 'app-employee-schedule',
  standalone: false,
  templateUrl: './employee-schedule.html',
  styleUrl: './employee-schedule.css',
})
export class EmployeeSchedule {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },
    weekends: true,
    firstDay: 1,
    editable: false,
    selectable: false,
    events: [],
    allDaySlot: false,
    slotEventOverlap: false,
    contentHeight: 'auto', 
    slotDuration: '01:00:00',
    slotLabelFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    dayHeaderFormat: { 
      weekday: 'short', 
      day: '2-digit', 
      month: '2-digit', 
      omitCommas: true 
    },
    titleFormat: { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    },
  };

  constructor(
    private shiftService: ShiftService,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.loadMyShifts();
  }

  loadMyShifts() {
    const userId = this.authService.getUserId();

    if (!userId) return;

    this.shiftService.getShiftsOfEmployee(userId).subscribe(data => {
      const calendarEvents: EventInput[] = data.map(shift => ({
        id: shift.shiftID || '',
        title: '',
        start: shift.startTime,
        end: shift.endTime,
        backgroundColor: '#198754',
        borderColor: '#157347'
      }));

      this.calendarOptions = {
        ...this.calendarOptions,
        events: calendarEvents
      };
      
      this.cdr.detectChanges();
    });
  }
}
