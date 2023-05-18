import React, { useState, useEffect } from "react";
import firebase from "../api/fbConfig";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CSwitch,
  CFormGroup,
  CInput,
  CButton,
  CForm,
} from "@coreui/react";

function LightControl({ lightValue, flag, handleSlide, handleSubmit }) {
  useEffect(() => {
    const lightVal = firebase.database().ref("controls");

    lightVal.on("value", async (snapshot) => {});
  }, []);

  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow
            style={{
              paddingTop: "10px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              paddingLeft: "1em",
              paddingRight: "1em",
            }}
          >
            <div>
              <h5>Controls</h5>
            </div>
          </CRow>
        </CCardHeader>
        {flag && lightValue ? (
          <CCardBody>
            <div>
              <CForm onSubmit={handleSubmit}>
                <CFormGroup>
                  <CRow>
                    <CCol sm={3}>TDS</CCol>
                    <CCol sm={3}>
                      <span style={{ fontSize: "0.7em" }}>
                        {lightValue.tds}
                      </span>
                    </CCol>
                    <CCol sm={6}>
                      <CInput
                        type="number"
                        step="0.01"
                        defaultValue={lightValue.tds}
                        id="tds"
                        onChange={handleSlide}
                        required
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={3}>Humidifier</CCol>
                    <CCol sm={3}>
                      <span style={{ fontSize: "0.7em" }}>
                        {lightValue.hum}
                      </span>
                    </CCol>
                    <CCol sm={6}>
                      <CInput
                        type="number"
                        step="0.01"
                        className="form-control"
                        defaultValue={lightValue.hum}
                        id="hum"
                        onChange={handleSlide}
                        required
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={3}>PH</CCol>
                    <CCol sm={3}>
                      <span style={{ fontSize: "0.7em" }}>{lightValue.PH}</span>
                    </CCol>
                    <CCol sm={6}>
                      <CInput
                        type="number"
                        step="0.01"
                        defaultValue={lightValue.PH}
                        id="PH"
                        onChange={handleSlide}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={6}></CCol>
                    <CCol sm={6}>
                      <CButton type="submit" class="btn btn-primary btn-block">
                        Submit
                      </CButton>
                    </CCol>
                  </CRow>
                </CFormGroup>
              </CForm>
            </div>
          </CCardBody>
        ) : (
          <div style={{ textAlign: "center", padding: "2em" }}>
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </CCard>
    </>
  );
}

export default LightControl;
