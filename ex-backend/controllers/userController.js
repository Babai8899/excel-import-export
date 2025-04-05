import User from "../models/User.js";
import xlsx from 'xlsx';
import fs from 'fs';
import ExcelJS from 'exceljs';

const importUser = async (req, res) => {
    try {
        const filePath = './public/uploads/' + req.files[0].filename;

        // Read Excel file
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        console.log(data);

        await User.insertMany(data);

        // Delete uploaded file
        fs.unlinkSync(filePath);

        res.send({ status: 200, success: true, message: "Successfully uploaded", records: data.length });
    } catch (error) {
        res.send({ status: 400, success: false, message: error.message });
    }
}

const exportUser = async (req, res) => {
    try {
        const users = await User.find().lean();
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Users');

        worksheet.columns = [
            { header: 'User Name', key: 'userName' },
            { header: 'Mobile', key: 'mobile' },
        ];

        worksheet.addRows(users);

        const buffer = await workbook.xlsx.writeBuffer();

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');

        res.send(buffer);

    } catch (error) {
        res.send({ status: 400, success: false, message: error.message });
    }
}

export { importUser, exportUser };