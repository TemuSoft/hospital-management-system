import { companyProfile } from "@/assets/company/companyProfile";
import image_url from "@/assets/company/company_logo.png";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Print = {
  prescriptionPdfMaker(medicineList, profile) {
    let xin = 2;
    let yin = 2;
    let tab = 0.5;
    let minspa = 0.7;
    let minimspa = 0.2;
    let maxspa = 1;

    let x = xin;
    let y = yin;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "cm",
      format: "a4",
    });

    let xy = this.headerFooter(doc, x, y, minspa, minimspa, tab, xin);
    x = xy.x;
    y = xy.y;

    x = xin;
    y = y + minspa;
    y = y + minspa;

    doc.setFont("Georgia", "bold");
    doc.setFontSize(15);
    doc.setTextColor(0, 0, 0);
    doc.text("Prescription", x, y);

    y = y + maxspa;
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.setFont();
    doc.text("Patient Name : " + profile.name, x, y);

    y = y + minspa;
    doc.text("Date Of Birth : " + profile.birthdate, x, y);

    y = y + minspa;
    y = y + minspa;
    doc.text("Date Make :  " + new Date(), x, y);

    y = y + minspa;
    y = y + minspa;
    doc.text("Name Of Medicine and Description :", x, y);
    x = x + tab;
    x = x + tab;

    y = y + 1;
    x = xin;
    //Amber color
    doc.setTextColor(250, 100, 0);
    doc.setFontSize(12);
    doc.text("Medicine List and Detail Specification", x, y);
    let col = [
      "Number",
      "Medicine",
      "Dosage",
      "Total Quantity",
      "Duration",
      "Route",
      "Frequency",
    ];
    let data = [];
    for (let i = 0; i < medicineList.length; i++) {
      data.push([
        i + 1,
        medicineList[i].medicine,
        medicineList[i].dosage,
        medicineList[i].totalQTY,
        medicineList[i].duration,
        medicineList[i].route,
        medicineList[i].frequency,
      ]);
    }
    y = y + minimspa;
    doc.autoTable(col, data, {
      headerStyles: {
        halign: "center",
      },
      styles: {
        fontSize: 8,
        halign: "center",
      },
      startY: y,
      margin: { left: 2 },
    });

    doc.save("prescription for " + profile.name + new Date() + ".pdf");
  },

  outsourcePdfMaker() {},

  referalPdfMaker() {},

  headerFooter(doc, x, y, minspa, minimspa, tab, xin) {
    doc.addImage(image_url, "JPEG", x + 15, y - 0.5, 2.5, 2.5);

    doc.setFont("Georgia", "bold");
    doc.setFontSize(17);
    doc.setTextColor(0, 0, 0);
    doc.text(companyProfile[0].name, x, y);
    doc.setFont();

    //Gray
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(8);
    y = y + minimspa;
    y = y + minimspa;
    x = x + tab;
    doc.text(companyProfile[0].slogan, x, y);

    doc.setFont();
    doc.setFontSize(11);
    y = y + minspa;
    doc.text(
      "Location : " + companyProfile[0].city + " , " + companyProfile[0].kebele,
      x,
      y
    );
    y = y + minimspa;
    y = y + minimspa;
    doc.text("Contact : " + companyProfile[0].mobile_number, x, y);
    y = y + minimspa;
    y = y + minimspa;
    doc.text("Postal COde : " + companyProfile[0].postal_code, x, y);
    y = y + minimspa;
    y = y + minimspa;
    doc.text("Email :" + companyProfile[0].email, x, y);

    let fy = 27.5;
    x = xin;
    x = x + 3;
    doc.text(
      "If you have any questions concerning this prescription don't' hesitate to cotact us!!!",
      x,
      fy
    );

    fy = fy + minspa;
    x = x + 2.5;
    doc.setFont("Georgia", "bold");
    doc.setFontSize(10);
    doc.text("THANK YOU FOR YOUR HOSPITALITY!!!", x, fy);

    return { x, y };
  },
};

export default Print;