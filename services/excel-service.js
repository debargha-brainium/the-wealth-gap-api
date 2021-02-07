var XLSX = require('xlsx');

exports.writeExcel=(json_array,header,sheet_name, filename, width)=>{
    return new Promise((res,rej)=>{
        try{
            var ws = XLSX.utils.json_to_sheet(json_array, {header});
            let workbook = XLSX.utils.book_new();
            if(width){
                ws['!cols'] = width.map(m=>({wch:m}));
            }
            XLSX.utils.book_append_sheet(workbook,ws,sheet_name);
            XLSX.writeFile(workbook,filename);
            res(true);
        }catch(e){rej(e)};
    })
}
exports.readExcel=(file)=>{
    return new Promise((res,rej)=>{
        try{
            var workbook = XLSX.readFile(file);
            res(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]));
        }catch(e){rej(e)};
    })
}
