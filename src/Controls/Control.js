import React, { useState, useEffect } from "react";
import firebase from "../api/fbConfig";
import {
  CRow,
  CCol,
  CFormGroup,
  CInputRadio,
  CLabel,
  CForm,
} from "@coreui/react";
import LightControl from "./LightControl";
function Control() {
  const [flag, setFlag] = useState(false);
  const [automatedConfig, setAutomatedConfig] = useState(null);

  const [lightValue, setlightValue] = useState({
    hum: 0,
    tds: 0,
    PH: 0,
  });

  const [templightValue, setTemplightValue] = useState({
    hum: 0,
    tds: 0,
    PH: 0,
  });

  const handleRadio = (e) => {
    if (e.target.id === "automated" && e.target.value === "automated") {
      setAutomatedConfig(true);
    } else if (
      e.target.id === "experimental" &&
      e.target.value === "experimental"
    ) {
      setAutomatedConfig(false);
    } else {
      alert("ERROR!");
    }
  };

  const handleSlide = (e) => {
    // console.log("slidey");
    setTemplightValue({
      ...templightValue,
      [e.target.id]: parseFloat(e.target.value),
    });
    console.log(templightValue);
  };

  const handleSubmit = (e) => {
    // console.log("slidey");
    // event.preventDefault();
    setlightValue(templightValue);
    console.log(templightValue);
    e.preventDefault();
  };

  useEffect(() => {
    console.log(automatedConfig);
    if (automatedConfig !== null) {
      const controls = firebase.database().ref("Controls");
      controls.update({ automated: automatedConfig });
    }
  }, [automatedConfig]);

  useEffect(() => {
    if (flag) {
      const lightVal = firebase.database().ref("controls");
      lightVal.update(lightValue);
    }
    setTemplightValue(lightValue);
  }, [lightValue]);

  useEffect(() => {
    const lightVal = firebase.database().ref("controls");

    lightVal.on("value", async (snapshot) => {
      console.log(snapshot.val());

      setlightValue({
        hum: snapshot.val().hum,
        tds: snapshot.val().tds,
        PH: snapshot.val().PH,
      });
      setFlag(true);
    });
  }, []);

  return (
    <>
      <CRow>
        <CCol lg={1}></CCol>
        <CCol lg={10}>
          {/* <CFormGroup variant="checkbox">
            <CInputRadio
              className="form-check-input"
              id="experimental"
              name="radioG"
              value="experimental"
              onChange={handleRadio}
              checked={automatedConfig !== null ? !automatedConfig : false}
            />
            <CLabel variant="checkbox" htmlFor="experimental">
              <h4>Experimental</h4>
            </CLabel>
          </CFormGroup> */}

          {/* <Ventilation
              ventilationFlag={ventilationFlag}
              setVentilationFlag={setVentilationFlag}
            />

            <HumidifierControl
              humidifierFlag={humidifierFlag}
              setHumidifierFlag={setHumidifierFlag}
            /> */}

          <LightControl
            flag={flag}
            lightValue={lightValue}
            handleSlide={handleSlide}
            handleSubmit={handleSubmit}
          />
        </CCol>
        <CCol lg={1}></CCol>
      </CRow>
    </>
  );
}

export default Control;
