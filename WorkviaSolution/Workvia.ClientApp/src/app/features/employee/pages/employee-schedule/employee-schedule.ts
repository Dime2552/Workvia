import { ChangeDetectorRef, Component } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AuthenticationService } from '../../../../core/services/authentication';
import { ShiftService } from '../../../../core/services/shift';
import { StatisticsService } from '../../../../core/services/statistics';

@Component({
  selector: 'app-employee-schedule',
  standalone: false,
  templateUrl: './employee-schedule.html',
  styleUrl: './employee-schedule.css',
})
export class EmployeeSchedule {
  myTotalHours: number = 0;

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
    private statsService: StatisticsService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.loadMyShifts();
    this.loadMyHours();
  }

  loadMyShifts() {
    const userId = this.authService.getUserId();

    if (!userId) return;

    this.shiftService.getShiftsOfEmployee(userId).subscribe(data => {
      const calendarEvents: EventInput[] = data.map(shift => ({
        id: shift.shiftID || '',
        title: '',
        start: shift.startTime,
        end: shift.endTime
      }));

      this.calendarOptions = {
        ...this.calendarOptions,
        events: calendarEvents
      };
      
      this.cdr.detectChanges();
    });
  }

  loadMyHours() {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    this.statsService.getMyHours(firstDay, lastDay).subscribe({
        next: (hours) => this.myTotalHours = hours,
        error: (err) => console.error(err)
    });
  }
}
