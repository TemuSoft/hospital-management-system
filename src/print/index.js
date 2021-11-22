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
    let midimspa = 0.4;
    let maxspa = 1;

    let x = xin;
    let y = yin;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "cm",
      format: "a4",
    });

    let xy = this.headerFooter(
      doc,
      x,
      y,
      minspa,
      minimspa,
      tab,
      xin,
      "prescription"
    );
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
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.setFont();
    doc.text("Name Of Patient : " + profile.name, x, y);

    y = y + midimspa;
    doc.text("Gender : " + profile.gender, x, y);

    y = y + midimspa;
    doc.text("Mobile Number : " + profile.mobile_number, x, y);

    y = y + midimspa;
    doc.text("Date Of Birth : " + profile.birthdate, x, y);

    y = y + midimspa;
    y = y + midimspa;
    doc.text("Date Make :  " + new Date(), x, y);

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
        medicineList[i].quantity,
        medicineList[i].dosage,
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

    doc.save("Prescription for " + profile.name + new Date() + ".pdf");
  },

  outsourcePdfMaker() {},

  refferalPrinting(data) {
    let singlePatient = data.singlePatient;
    let refferalInfo = data.refferalInfo;

    let xin = 2;
    let yin = 2;
    let tab = 0.5;
    let minspa = 0.7;
    let minimspa = 0.2;
    // let midimspa = 0.4;
    let maxspa = 1;

    let x = xin;
    let y = yin;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "cm",
      format: "a4",
    });

    let xy = this.headerFooter(
      doc,
      x,
      y,
      minspa,
      minimspa,
      tab,
      xin,
      "refferal"
    );
    x = xy.x;
    y = xy.y;

    x = xin;
    y = y + minspa;
    y = y + minspa;

    doc.setFont("Georgia", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("Refferal to : " + refferalInfo.refferal_to, x, y);

    y = y + maxspa;
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.setFont();

    let name = singlePatient.first_name + " " + singlePatient.fathers_name;
    name = name + "(" + singlePatient.gender + ")";

    doc.text("1. Name Of Patient : " + name, x, y);
    y = y + minspa;
    doc.text("2. Card Number : " + singlePatient.card_number, x, y);
    y = y + minspa;
    doc.text("3. Birthdate : " + singlePatient.birthdate, x, y);
    y = y + minspa;
    doc.text("4. Address : " + singlePatient.zone, x, y);
    y = y + minspa;
    y = y + minspa;

    doc.text(
      "5. History & physical finding : " +
        refferalInfo.history_physical_finding,
      x,
      y
    );
    y = y + 1;
    doc.text("6 Working Diagnosis : " + refferalInfo.working_diagnosis, x, y);
    y = y + 1;
    doc.text(
      "7. Investigations Done : " + refferalInfo.investigation_done,
      x,
      y
    );
    y = y + 1;
    doc.text(
      "8. Refferal Differntial Diagnosis : " +
        refferalInfo.referal_differential_diagnosis,
      x,
      y
    );
    y = y + 1;
    doc.text("9. Reason : " + refferalInfo.reason_for_referal, x, y);
    y = y + minspa;
    doc.text(
      "10. Feedback for reffering health Instituation : " +
        refferalInfo.feedback,
      x,
      y
    );
    y = y + minspa;
    y = y + minspa;
    x = x + tab;
    x = x + tab;
    doc.text("Physician's Name/Signature : __________________________", x, y);
    y = y + minspa;
    doc.text("Date : " + new Date(), x, y);

    doc.save("Refferal for " + name + new Date() + ".pdf");
  },

  referalPdfMaker(data, profile) {
    let xin = 2;
    let yin = 2;
    let tab = 0.5;
    let minspa = 0.7;
    let minimspa = 0.2;
    let midimspa = 0.4;
    let maxspa = 1;

    let x = xin;
    let y = yin;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "cm",
      format: "a4",
    });

    let xy = this.headerFooter(
      doc,
      x,
      y,
      minspa,
      minimspa,
      tab,
      xin,
      "referral"
    );
    x = xy.x;
    y = xy.y;

    x = xin;
    y = y + minspa;
    y = y + minspa;

    doc.setFont("Georgia", "bold");
    doc.setFontSize(15);
    doc.setTextColor(0, 0, 0);
    doc.text("Referral ", x, y);

    y = y + maxspa;
    doc.setFontSize(9);
    //Gray color
    doc.setTextColor(100, 100, 100);
    doc.setFont();
    doc.text("Name Of Patient : " + profile.name, x, y);

    y = y + midimspa;
    doc.text("Gender : " + profile.gender, x, y);

    y = y + midimspa;
    doc.text("Mobile Number : " + profile.mobile_number, x, y);

    y = y + midimspa;
    doc.text("Date Of Birth : " + profile.birthdate, x, y);

    y = y + midimspa;
    y = y + midimspa;
    doc.text("Date Make :  " + new Date(), x, y);

    y = y + 1;
    x = xin;
    //Black color
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text("Referred to : ________________________________________", x, y);

    y = y + maxspa;
    doc.text("Reasons for referral:", x, y);

    x = x + tab;
    //Gray color
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);

    for (let i = 0; i < data.length; i++) {
      y = y + minspa;
      doc.setLineWidth(0.01);
      doc.rect(x, y - 0.25, 0.3, 0.3); //Fill and Border
      doc.text(" " + data[i], x + midimspa, y);
    }

    y = y + minspa;
    doc.text(
      "Others (specify) _________________________________________________________________________________________",
      x,
      y
    );

    x = x - tab;
    y = y + maxspa;
    //Black color
    doc.setTextColor(0, 0, 0);
    doc.text(
      "Comments_________________________________________________________________________________________________",
      x,
      y
    );
    y = y + minspa;
    doc.text(
      "__________________________________________________________________________________________________________",
      x,
      y
    );
    y = y + minspa;
    doc.text(
      "__________________________________________________________________________________________________________",
      x,
      y
    );

    y = y + 1;
    doc.text("Referred By : _________________________________", x, y);
    y = y + maxspa;
    doc.text("Signature     : _________________________________", x, y);

    y = y + 1;
    doc.setFontSize(8);
    doc.setTextColor(2500, 0, 0);
    doc.text(
      "Note: This report should be submitted to the CHEW/ Health Facility staff during their Monthly meetings in the 2nd week of every month",
      x,
      y
    );

    doc.save("Referral for " + profile.name + new Date() + ".pdf");
  },

  headerFooter(doc, x, y, minspa, minimspa, tab, xin, title) {
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
    doc.setFontSize(10);
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
    doc.text("Postal Code : " + companyProfile[0].postal_code, x, y);
    y = y + minimspa;
    y = y + minimspa;
    doc.text("Email :" + companyProfile[0].email, x, y);

    let fy = 27.5;
    x = xin;
    x = x + 2;
    doc.text(
      "If you have any questions concerning this " +
        title +
        " don't' hesitate to cotact us!!!",
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
