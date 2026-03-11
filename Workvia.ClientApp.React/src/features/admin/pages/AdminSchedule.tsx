import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { toast } from 'react-toastify';
import { ShiftService } from '../../../services/shift.service';
import type { Shift, ShiftRequest } from '../../../types/shift';
import ShiftCreateModal from '../components/ShiftCreateModal';
import ShiftUpdateModal from '../components/ShiftUpdateModal';

// Helper function to generate a color from a string
const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
};

export default function AdminSchedule() {
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [showCreate, setShowCreate] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [selectedShift, setSelectedShift] = useState<Shift | null>(null);

    const loadShifts = async () => {
        try {
            const data = await ShiftService.getShifts();
            setShifts(data);
        } catch (error) {
            toast.error("Failed to load shifts.");
        }
    };

    useEffect(() => {
        loadShifts();
    }, []);

    const handleCreate = async (data: ShiftRequest) => {
        try {
            await ShiftService.createShift(data);
            toast.success("Shift created successfully!");
            setShowCreate(false);
            loadShifts();
        } catch (error) {
            console.error("Failed to create shift", error);
        }
    };

    const handleUpdateOrDelete = async (action: 'update' | 'delete', data?: ShiftRequest) => {
        try {
            if (action === 'update' && data?.shiftId) {
                await ShiftService.updateShift(data.shiftId, data);
                toast.success("Shift updated successfully!");
            } else if (action === 'delete' && selectedShift) {
                await ShiftService.deleteShift(selectedShift.shiftID);
                toast.success("Shift deleted successfully!");
            }
            setShowUpdate(false);
            setSelectedShift(null);
            loadShifts();
        } catch (error) {
             console.error(`Failed to ${action} shift`, error);
        }
    };

    const calendarEvents = shifts.map(shift => ({
        id: shift.shiftID,
        title: shift.employeeName,
        start: shift.startTime,
        end: shift.endTime,
        backgroundColor: stringToColor(shift.employeeName),
        borderColor: stringToColor(shift.employeeName),
        extendedProps: shift
    }));

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Work Schedule</h2>
                <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
                    <i className="bi bi-calendar-plus me-2"></i> Add Shift
                </button>
            </div>
            <div className="bg-white p-3 rounded shadow-sm">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    events={calendarEvents}
                    eventClick={(info) => {
                        setSelectedShift(info.event.extendedProps as Shift);
                        setShowUpdate(true);
                    }}
                    height = "auto"
                    slotDuration = '01:00:00'
                    firstDay = {1}
                    eventTimeFormat = {{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }}
                    
                />
            </div>

            <ShiftCreateModal 
                show={showCreate}
                onClose={() => setShowCreate(false)}
                onSuccess={handleCreate}
            />

            <ShiftUpdateModal
                show={showUpdate}
                shift={selectedShift}
                onClose={() => {setShowUpdate(false); setSelectedShift(null)}}
                onSuccess={handleUpdateOrDelete}
            />
        </div>
    );
}