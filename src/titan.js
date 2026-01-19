
// src/components/TelemetryCard.tsx
import React from "react";
import { useState, useEffect } from "react";
import { parseVendorFrameHex } from "./vendorFrame.js";
import { Spinner } from 'react-bootstrap';

export default function Titan() {
  const [loading, setLoading] = useState(true);
  const [frame, setFrame] = useState(parseVendorFrameHex("0"));
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch ("https://titan.isaacvanhorn.com/scan-and-read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
     }
    )
      .then(response => {
        if (!response.ok) {
          setError(true);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Received data:", data);
        setFrame(parseVendorFrameHex(data.data));
        console.log("Parsed frame:", parseVendorFrameHex(data.data));
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError(true);
      });
  }, []);

  return (
    <div style={{ fontFamily: "system-ui", lineHeight: 1.5, width: "100%", background: "white", height: "100vh", padding: 24, boxSizing: "border-box", overflowBehavior: "hidden" }}>
      <h2>Point Zero Titan</h2>
      {error ? (<h1>Error Loading data from server please refresh and try again. If error persists contact developer.</h1>) : null}
      {frame.warnings?.length ? (
        <div style={{ color: "#b00" }}>
          <strong>Warnings:</strong>
          <ul>
            {frame.warnings.map(w => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      ) : null}
        {loading ? (
          <Spinner className="m-5" />
        ) : (
          <div>
          <pre style={{ background: "#f6f8fa", padding: 12, borderRadius: 6 }}>
            Raw: {frame.rawHex}
            {"\n"}Payload: {frame.payloadHex}
            {frame.trailerHex ? `\nTrailer: ${frame.trailerHex}` : ""}
          </pre>

        <dl>
          <dt>State of Charge (%)</dt><dd>{frame.socPct ?? "—"}</dd>
          <dt>Capacity (AH)</dt><dd>{frame.capacityAh ?? "—"}</dd>
          <dt>Voltage (V)</dt><dd>{frame.voltageV ?? "—"}</dd>
          <dt>Current (A)</dt><dd>{frame.currentA ?? "—"}</dd>
          <dt>Power (W)</dt><dd>{frame.powerW ?? "—"}</dd>

          <dt>Flags</dt><dd>{frame.flags ?? "—"}</dd>
          <dt>Status 1</dt><dd>{frame.status1 ?? "—"}</dd>
          <dt>Status 2</dt><dd>{frame.status2 ?? "—"}</dd>
          <dt>Unknown 2</dt><dd>{frame.unknown2 ?? "—"}</dd>
          <dt>Unknown 3</dt><dd>{frame.unknown3 ?? "—"}</dd>
        </dl>
        </div>
        )}
    </div>
  );
};
