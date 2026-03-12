import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { toast } from 'react-toastify';
import { ShiftService } from '../../../services/shift.service';
import { StatisticsService } from '../../../services/statistics.service';
import { AuthService } from '../../../services/auth.service';

export default function EmployeeSchedule() {
    const [events, setEvents] = useState<any[]>([]);
    const [myTotalHours, setMyTotalHours] = useState<number>(0);

    useEffect(() => {
        const userId = AuthService.getUserId();
        if (!userId) return;

        const loadMyShifts = async () => {
            try {
                const data = await ShiftService.getShiftsOfEmployee(userId);
                const calendarEvents = data.map(shift => ({
                    id: shift.shiftID,
                    title: 'Work Shift',
                    start: shift.startTime,
                    end: shift.endTime,
                }));
                setEvents(calendarEvents);
            } catch (error) {
                toast.error("Failed to load shifts.");
            }
        };

        const loadMyHours = async () => {
            const now = new Date();
            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

            try {
                const hours = await StatisticsService.getMyHours(firstDay, lastDay);
                setMyTotalHours(hours);
            } catch (error) {
                console.error("Failed to load my hours", error);
            }
        };
        
        loadMyShifts();
        loadMyHours();
    }, []);

    return (
        <div className="container-fluid h-100 d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                <h2>My Schedule</h2>
                <div className="bg-primary text-white px-4 py-2 rounded shadow-sm">
                    <span className="h5 m-0">This Month: <b>{myTotalHours} h</b></span>
                </div>
            </div>

            <div className="bg-white p-3 rounded shadow-sm">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek'
                    }}
                    events={events}
                    editable={false}
                    selectable={false}
                    height="auto"
                    slotDuration='01:00:00'
                    firstDay={1}
                    allDaySlot = {false}
                    slotLabelFormat = {{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }}
                    eventTimeFormat = {{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }}
                />
            </div>
        </div>
    );
}