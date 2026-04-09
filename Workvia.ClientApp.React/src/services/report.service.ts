import api from './api';

export const ReportService = {
  downloadExcelReport: async (start: Date, end: Date): Promise<void> => {
    const params = new URLSearchParams({ 
        start: start.toISOString(), 
        end: end.toISOString() 
    });

    const response = await api.get(`/reports/excel?${params.toString()}`, {
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    
    const startStr = start.toISOString().split('T')[0];
    const endStr = end.toISOString().split('T')[0];
    link.setAttribute('download', `Workvia_Report_${startStr}_to_${endStr}.xlsx`);
    
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }
};