//show pdf

import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './ModalPeriod1.css';

const ModalPeriod1 = ({smonth, syear, req, tgl_signoff1, req_name1, req_title1, revas_name1, revas_title1}) => {
    const printpdf = useRef();

    const handlePrintPDF = useReactToPrint({
        content: () => printpdf.current,
    });

  return (
    <>
        <div>
            {/* displayed on the page */}
            <div style={{marginLeft:"10%", marginRight:"10%", marginTop:"5%", marginBottom:"5%"}}>
                <div style={{textAlign:'center'}} >
                    <h4><strong>BERITA ACARA PEKERJAAN PERUBAHAN PARAMETER</strong> </h4>
                    <h5><strong>PERIODE {smonth} {syear}</strong></h5>
                </div>
                <hr style={{border:"3px solid black"}}></hr>
                <p>Berita Acara ini dibuat untuk menerangkan bahwa secara resmi periode 
                    bulan {smonth} tahun {syear}, Departemen {req} telah melakukan proses perubahan 
                    baik penambahan maupun penutupan parameter pada aplikasi Digital Core (Digicore),       
                </p>

                <p>Adapun dasar dari perubahan tersebut, dapat dilihat dalam lampiran. Demikian Berita Acara 
                    ini dibuat untuk dipergunakan sebagaimana mestinya.
                </p>

                <br/><br/><br/>
                <div style={{textAlign:'center'}}>
                    <p>Jakarta, {tgl_signoff1}</p>
                    <p>Mengetahui dan Menyetujui,</p>
                </div>
                <div class="row">
                    <div class="column">
                        <p style={{paddingTop:"40%", textDecoration: "underline", textAlign:'center'}}><strong>{req_name1}</strong></p>
                        <p style={{textAlign:'center'}}>{req_title1}</p>
                    </div>
                    <div class="column">
                        <p style={{paddingTop:"40%", textDecoration: "underline", textAlign:'center'}}><strong>{revas_name1}</strong></p>
                        <p style={{textAlign:'center'}}>{revas_title1}</p>
                    </div>
                </div> 
            </div> 
        </div>
        {/* content */}
        <div style={{display:"none"}}>
            <div id="print" ref={printpdf} style={{marginLeft:"10%", marginRight:"10%", marginTop:"5%", marginBottom:"5%"}}>
                <div style={{textAlign:'center'}} >
                    <h2><strong>BERITA ACARA PEKERJAAN PERUBAHAN PARAMETER</strong></h2>
                    <h3><strong>PERIODE {smonth} {syear}</strong></h3>
                </div>
                <hr style={{border:"3px solid black"}}></hr>
                <h3>Berita Acara ini dibuat untuk menerangkan bahwa secara resmi periode 
                        bulan {smonth} tahun {syear}, Departemen {req} telah melakukan proses perubahan 
                        baik penambahan maupun penutupan parameter pada aplikasi Digital Core (Digicore),       
                </h3>

                <br/>

                <h3>Adapun dasar dari perubahan tersebut, dapat dilihat dalam lampiran. Demikian Berita Acara 
                        ini dibuat untuk dipergunakan sebagaimana mestinya.
                </h3>

                <br/><br/><br/>
                <div style={{textAlign:'center'}}>
                    <h3>Jakarta, {tgl_signoff1}</h3>
                    <h3>Mengetahui dan Menyetujui,</h3>
                </div>
                <div class="row">
                    <div class="column">
                        <p style={{paddingTop:"40%", textDecoration: "underline", textAlign:'center'}}><strong>{req_name1}</strong></p>
                        <p style={{textAlign:'center'}}>{req_title1}</p>
                    </div>
                    <div class="column">
                        <p style={{paddingTop:"40%", textDecoration: "underline", textAlign:'center'}}><strong>{revas_name1}</strong></p>
                        <p style={{textAlign:'center'}}>{revas_title1}</p>
                    </div>
                </div> 
            </div>
        </div>
        
        <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" onClick={handlePrintPDF}>Download PDF</button>
        </div>
        
    </>
  )
}

export default ModalPeriod1