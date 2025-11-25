import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ShiftRequest } from '../../../../core/models/shift-request';
import { ShiftService } from '../../../../core/services/shift';
import { ShiftCreateModal } from '../../components/shift-create-modal/shift-create-modal';
import { ShiftUpdateModal } from '../../components/shift-update-modal/shift-update-modal';

@Component({
  selector: 'app-schedule',
  standalone: false,
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
})
export class Schedule {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    weekends: true,
    firstDay: 1,
    editable: false,
    selectable: false,
    events: [],
    eventClick: this.handleEventClick.bind(this),
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
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.loadShifts();
  }

  loadShifts() {
    this.shiftService.getShifts().subscribe(data => {
      const calendarEvents: EventInput[] = data.map(shift => ({
        id: shift.shiftID || '',
        title: shift.employeeName || 'Unknown',
        start: shift.startTime,
        end: shift.endTime,
        backgroundColor: this.stringToColor(shift.employeeName || ''),
        borderColor: this.stringToColor(shift.employeeName || ''),
        extendedProps: { employeeId: shift.employeeID }
      }));

      this.calendarOptions = {
        ...this.calendarOptions,
        events: calendarEvents
      };
      
      this.cdr.detectChanges();
    });
  }

  openAddShiftModal() {
    const modalRef = this.modalService.open(ShiftCreateModal);
    
    modalRef.result.then((formData) => {
      if (formData) {
        const request: ShiftRequest = {
          employeeId: formData.employeeId,
          startTime: formData.startTime,
          endTime: formData.endTime,
          shiftId: null
        };

        this.shiftService.postShift(request).subscribe({
            next: () => this.loadShifts(),
            error: (err) => console.error(err)
        });
      }
    }, () => {});
  }

  handleEventClick(clickInfo: any) {
    const event = clickInfo.event;

    const modalRef = this.modalService.open(ShiftUpdateModal);

    modalRef.componentInstance.shiftData = {
      id: event.id,
      employeeId: event.extendedProps.employeeId,
      start: event.start,
      end: event.end
    };

    modalRef.result.then((result) => {
      if (!result) return;

      if (result.action === 'delete') {
        this.shiftService.deleteShift(event.id).subscribe(() => {
          event.remove();
        });
      } 
      else if (result.action === 'update') {
        const request: ShiftRequest = {
          employeeId: result.data.employeeId,
          shiftId: event.id,
          startTime: result.data.startTime,
          endTime: result.data.endTime
        };

        this.shiftService.updateShift(event.id, request).subscribe({
          next: () => {
             this.loadShifts();
          },
          error: (err) => console.error(err)
        });
      }
    }, () => { });
  }

  stringToColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
  }
}
