import React, { useRef } from 'react'
import style from './Printpage.module.css'
import logo from '../assets/csu_logo.png'
import textHeader from '../assets/header-text.jpg'
import html2pdf from 'html2pdf.js';
import { IoIosPrint } from "react-icons/io";

const Printpage = () => {

const exportAsPDF = useRef(null)

const handleExportPDF = () => {
  const content = exportAsPDF.current;

  const pdfOptions = {
    margin: 10,
    filename: 'exported-document.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'legal', orientation: 'landscape' },
    pagebreak: { mode: 'avoid-all' },
  };
  
  html2pdf().from(content).set(pdfOptions).save();
  
}

  return (
    <div className={style.container}>
      <div className='container d-flex flex-column p-5 gap-3'>
        <div className="d-flex w-100 justify-content-end">
          <button id={style.btnPrint}>
            <IoIosPrint onClick={handleExportPDF}/>
            Print
          </button>
        </div>
        <div className={style.canvas} ref={exportAsPDF}>
          <div className={style.header}>
              <div className='d-flex gap-5'>
                <img id={style.logo} src={logo} alt="logo" />
              < img id={style.textHeader} src={textHeader} alt="logo" />
              </div>
              <div className='d-flex flex-column align-items-end justify-content-end gap-5'>
                <p id={style.text1}>OJT FORM 1</p>
                <p id={style.text2}>DAILY ATTENDANCE AND ACCOMPLISHMENT FORM</p>
              </div>
          </div>
          <div className={style.body}>
            <div className={style.table1}>
              <div className={style.column1}>
                <div className={style.row1}>
                  Student-trainee
                </div>
                <div className={style.row2}>
                  RUMAR C. PAMPARO
                </div>
                <div className={style.row3}>
                  OJT Supervisor
                </div>
                <div className={style.row4}>
                Reggie M. Pistanio
                </div>
              </div>
            </div>
            <div className={style.table2}>
              <div className={style.column1}>
                <div className={style.row5}>
                  BSIT 4
                </div>
                <div className={style.row6}>
                  C
                </div>
                <div className={style.row7}>
                  OJT Adviser
                </div>
                <div className={style.row8}>
                Prof. CHARMAINE C. MASULI
                </div>
                <div className={style.row9}>
                  Position
                </div>
                <div className={style.row10}>
                Reggie M. Pistanio
                </div>
              </div>
            </div>
            <div className={style.table3}>
              <div className={style.column1}>
                <div className={style.row11}>
                Assigned Department/Office
                </div>
                <div className={style.row12}>
                PPID - Information Management and Technology Section
                </div>
                <div className={style.row13}>
                Cooperating Agency:
                </div>
                <div className={style.row14}>
                Department of Agriculture National Fisheries Research and Development Institute
                </div>
              </div>
            </div>
            <div className={style.table4}>
              <div className={style.column1}>
              <div className={style.row15}>
                Week #
                </div>
                <div className={style.row16}>
                1
                </div>
                <div className={style.row17}>
                From
                </div>
                <div className={style.row18}>
                January 29, 2024
                </div>
                <div className={style.row19}>
                To
                </div>
                <div className={style.row20}>
                February 2, 2024
                </div>
                <div className={style.row21}>
                Office Address
                </div>
                <div className={style.row22}>
                Corporate 101 Building, Mother Ignacia Avenue, Brgy. South Triangle, Quezon City 1103
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Printpage