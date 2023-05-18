import React, { useEffect, useState } from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CModal,
  CModalHeader,
  CModalBody,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../charts/ChartLineSimple";
import ChartBarSimple from "../charts/ChartBarSimple";
import firebase from "../../api/fbConfig";
import SensorChart from "../charts/SensorChart";

const WidgetsDropdown = ({ labelsList, sensorValuesList }) => {
  const [modal, setModal] = useState(false);
  const [modalState, setModalState] = useState({
    data: null,
    color: null,
    name: null,
  });
  const [SensorValues, setSensorValues] = useState({
    lux: 0,
    hum: 0,
    temp: 0,
    co2: 0,
  });
  useEffect(() => {
    const Sensors = firebase.database().ref("Todo"); //.child("Sensors");
    Sensors.on("value", async (snapshot) => {
      let sensorParent =
        snapshot.val()[
          Object.keys(snapshot.val())[Object.keys(snapshot.val()).length - 1]
        ];
      console.log("--->", sensorParent);
      // const sensorParent = snapshot.val()[snapshot.val().length - 1];
      console.log(parseFloat(sensorParent.Co2.replace(/(\r\n|\n|\r)/gm, "")));
      setSensorValues({
        PAR: parseFloat(sensorParent.PAR.replace(/(\r\n|\n|\r)/gm, "")),
        hum: parseFloat(sensorParent.Humidity.replace(/(\r\n|\n|\r)/gm, "")),
        temp: parseFloat(
          sensorParent.Temperature.replace(/(\r\n|\n|\r)/gm, "")
        ),
        co2: parseFloat(sensorParent.Co2.replace(/(\r\n|\n|\r)/gm, "")),
        TDS: parseFloat(sensorParent.TDS.replace(/(\r\n|\n|\r)/gm, "")),
        PH: parseFloat(sensorParent.PH.replace(/(\r\n|\n|\r)/gm, "")),
      });
    });
  }, []);

  useEffect(() => {
    console.log(SensorValues);
  }, [SensorValues]);

  const showModalSpecified = (index) => {
    switch (index) {
      case 1: {
        setModalState({
          data: SensorValues.hum,
          color: "#4dbd74",
          name: "Humidity",
          query: "Humidity",
          stepSize: 10,
          max: 100,
        });
        break;
      }
      case 2: {
        setModalState({
          data: SensorValues.temp,
          color: "#20a8d8",
          name: "Temperature",
          query: "Temperature",
          stepSize: 5,
          max: 50,
        });
        break;
      }
      case 3: {
        setModalState({
          data: SensorValues.PAR,
          color: "#f79b0d",
          name: "PAR",
          query: "PAR",
          stepSize: 100,
          max: 1000,
        });
        break;
      }
      case 4: {
        setModalState({
          data: SensorValues.PH,
          color: "#f86c6b",
          name: "PH",
          query: "PH",
          stepSize: 100,
          max: 1000,
        });
        break;
      }
      case 5: {
        setModalState({
          data: SensorValues.co2,
          color: "#f86c6b",
          name: "CO2",
          query: "Co2",
          stepSize: 250,
          max: 2000,
        });
        break;
      }
      case 6: {
        setModalState({
          data: SensorValues.TDS,
          color: "#f86c6b",
          name: "TDS",
          query: "TDS",
          stepSize: 100,
          max: 1000,
        });
        break;
      }
    }
    setModal(!modal);
    console.log(index);
  };

  return (
    <>
      <CModal
        show={modal}
        onClose={() => {
          setModal(!modal);
        }}
        centered
        style={{ padding: "0 2em 1em 1em" }}
      >
        <SensorChart
          modalState={modalState}
          sensorValuesList={sensorValuesList}
          labelsList={labelsList}
        />
      </CModal>

      <CRow>
        <CCol sm="6" lg="4">
          <CWidgetDropdown
            onClick={() => showModalSpecified(1)}
            className="widget-sensor-custom"
            color="gradient-dark"
            header={SensorValues ? SensorValues.hum + "%" : 0}
            text="Humidity"
            footerSlot={
              <ChartLineSimple
                pointed
                className="mt-3 mx-3"
                style={{ height: "120px", pointerEvents: "none" }}
                dataPoints={sensorValuesList
                  .slice(
                    sensorValuesList.length - 7,
                    sensorValuesList.length - 1
                  )
                  .map((s) => parseFloat(s.Humidity))}
                pointHoverBackgroundColor="rgba(255,255,255,.7)"
              />
            }
          />
        </CCol>
        <CCol sm="6" lg="4">
          <CWidgetDropdown
            onClick={() => showModalSpecified(2)}
            className="widget-sensor-custom"
            color="gradient-dark"
            header={SensorValues ? SensorValues.temp + "°C" : 0}
            text="Temperature"
            footerSlot={
              <ChartLineSimple
                pointed
                className="mt-3 mx-3"
                style={{ height: "120px", pointerEvents: "none" }}
                dataPoints={sensorValuesList
                  .slice(
                    sensorValuesList.length - 7,
                    sensorValuesList.length - 1
                  )
                  .map((s) => parseFloat(s.Temperature))}
                pointHoverBackgroundColor="rgba(255,255,255,.7)"
              />
            }
          />
        </CCol>

        <CCol sm="6" lg="4">
          <CWidgetDropdown
            onClick={() => showModalSpecified(3)}
            className="widget-sensor-custom"
            color="gradient-dark"
            header={SensorValues ? SensorValues.PAR + "" : 0}
            text="PAR"
            footerSlot={
              <ChartLineSimple
                pointed
                className="mt-3 mx-3"
                style={{ height: "120px", pointerEvents: "none" }}
                dataPoints={sensorValuesList
                  .slice(
                    sensorValuesList.length - 7,
                    sensorValuesList.length - 1
                  )
                  .map((s) => parseFloat(s.PAR))}
                pointHoverBackgroundColor="rgba(255,255,255,.7)"
              />
            }
          ></CWidgetDropdown>
        </CCol>

        <CCol sm="6" lg="4">
          <CWidgetDropdown
            onClick={() => showModalSpecified(4)}
            className="widget-sensor-custom"
            color="gradient-dark"
            header={SensorValues ? SensorValues.PH + "" : 0}
            text="PH"
            footerSlot={
              <ChartLineSimple
                pointed
                className="mt-3 mx-3"
                style={{ height: "120px", pointerEvents: "none" }}
                dataPoints={sensorValuesList
                  .slice(
                    sensorValuesList.length - 7,
                    sensorValuesList.length - 1
                  )
                  .map((s) => parseFloat(s.PH))}
                pointHoverBackgroundColor="rgba(255,255,255,.7)"
              />
            }
          ></CWidgetDropdown>
        </CCol>
        <CCol sm="6" lg="4">
          <CWidgetDropdown
            onClick={() => showModalSpecified(5)}
            className="widget-sensor-custom"
            color="gradient-dark"
            header={SensorValues ? SensorValues.co2 + " PPM" : 0}
            text="CO2"
            footerSlot={
              <ChartLineSimple
                pointed
                className="mt-3 mx-3"
                style={{ height: "120px", pointerEvents: "none" }}
                dataPoints={sensorValuesList
                  .slice(
                    sensorValuesList.length - 7,
                    sensorValuesList.length - 1
                  )
                  .map((s) => parseFloat(s.Co2))}
                pointHoverBackgroundColor="rgba(255,255,255,.7)"
              />
            }
          />
        </CCol>

        <CCol sm="6" lg="4">
          <CWidgetDropdown
            onClick={() => showModalSpecified(6)}
            className="widget-sensor-custom"
            color="gradient-dark"
            header={SensorValues ? SensorValues.TDS + "" : 0}
            text="TDS"
            footerSlot={
              <ChartLineSimple
                pointed
                className="mt-3 mx-3"
                style={{ height: "120px", pointerEvents: "none" }}
                dataPoints={sensorValuesList
                  .slice(
                    sensorValuesList.length - 7,
                    sensorValuesList.length - 1
                  )
                  .map((s) => parseFloat(s.TDS))}
                pointHoverBackgroundColor="rgba(255,255,255,.7)"
              />
            }
          ></CWidgetDropdown>
        </CCol>
      </CRow>
    </>
  );
};

export default WidgetsDropdown;
