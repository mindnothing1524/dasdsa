import {
  CAlert,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import firebase from "../../../api/fbConfig";
import moment from "moment";

function Logs() {
  const [logsSensors, setlogsSensors] = useState([]);
  const [logsLabels, setLogsLabels] = useState([]);

  useEffect(() => {
    const logs = firebase.database().ref("Todo");

    logs.on("value", async (snapshot) => {
      const logTemp = snapshot.val();
      console.log(logTemp);
      let logsToState = [];
      let logsDateKey = [];
      Object.keys(logTemp).map((key, index) => {
        logsToState.push(logTemp[key]);
        let d = new Date(0);
        let epochDate = moment(d.setUTCSeconds(parseInt(key))).format("LLL");
        logsDateKey.push(epochDate);
      });
      logsToState = logsToState.slice(
        logsToState.length - 300,
        logsToState.length
      );
      logsDateKey = logsDateKey.slice(
        logsDateKey.length - 300,
        logsDateKey.length
      );
      //   console.log("logsToState", logsToState.reverse());
      //     console.log("logsDateKey", logsDateKey.reverse());
      setlogsSensors(logsToState.reverse());
      setLogsLabels(logsDateKey.reverse());
    });
  }, []);

  return (
    <div>
      <CRow>
        <CCol lg={12}>
          <CCard style={{ height: "80vh", overflowY: "hidden" }}>
            <CCardHeader>Logs</CCardHeader>
            <CCardBody style={{ overflowY: "scroll" }}>
              <CRow>
                <CCol lg={1}></CCol>
                <CCol lg={4}>Date/Time</CCol>
                <CCol lg={1}>Temp</CCol>
                <CCol lg={1}>Hum</CCol>
                <CCol lg={1}>CO2</CCol>
                <CCol lg={1}>PAR</CCol>
                <CCol lg={1}>TDS</CCol>
                <CCol lg={1}>PH</CCol>
              </CRow>
              <br />

              {logsLabels.length && logsSensors.length
                ? logsSensors.map((ls, index) => {
                    return (
                      <CAlert color="light">
                        <CRow style={{ marginTop: "1em" }}>
                          <CCol lg={1}></CCol>
                          <CCol lg={4}>{logsLabels[index]}</CCol>
                          <CCol lg={1}>{ls.Temperature}</CCol>
                          <CCol lg={1}>{ls.Humidity}</CCol>
                          <CCol lg={1}>{ls.Co2}</CCol>
                          <CCol lg={1}>{ls.PAR}</CCol>
                          <CCol lg={1}>{ls.TDS}</CCol>
                          <CCol lg={1}>{ls.PH}</CCol>
                        </CRow>
                      </CAlert>
                    );
                  })
                : null}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
}

export default Logs;
