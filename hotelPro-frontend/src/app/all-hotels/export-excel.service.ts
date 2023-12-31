import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { HotelDto } from '../dto/hotel.dto';

@Injectable({
  providedIn: 'root',
})
export class ExcelExportService {
  exportToExcel(data: HotelDto[], fileName: string, sheetName: string) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}
