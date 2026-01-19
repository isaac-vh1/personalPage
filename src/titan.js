
// src/components/TelemetryCard.jsx
import React, { useState, useEffect } from "react";
import { parseVendorFrameHex } from "./vendorFrame.js";
import { Spinner } from "react-bootstrap";

export default function Titan() {
  // Safe initial frame (avoid parse throw at mount)
  const [frame, setFrame] = useState(() => {
    try {
      return parseVendorFrameHex("");
    } catch (e) {
      return { rawHex: "", payloadHex: "", warnings: [] };
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false); // reset error before attempt

    fetch("https://titan.isaacvanhorn.com/scan-and-read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}), // API requires a JSON body
    })
      .then(async (response) => {
        if (!response.ok) {
          // try to read body for better diagnostics without crashing
          let extra = "";
          try {
            const ct = response.headers.get("content-type") || "";
            if (ct.includes("application/json")) {
              extra = " " + JSON.stringify(await response.json());
            } else {
              extra = " " + (await response.text()).slice(0, 300);
            }
          } catch {
            /* ignore parse errors */
          }
          setError(true);
          throw new Error(`HTTP error! Status: ${response.status}${extra}`);
        }

        // guard against non-JSON responses (e.g. proxy error pages)
        const ct = response.headers.get("content-type") || "";
        if (!ct.includes("application/json")) {
          setError(true);
          throw new Error(`Unexpected Content-Type: ${ct}`);
        }

        const data = await response.json();

        // expect { data: "<hex string>" }
        if (!data || typeof data.data !== "string") {
          setError(true);
          throw new Error("Malformed API response: expected { data: <hex string> }");
        }

        const parsed = parseVendorFrameHex(data.data);
        console.log("Received data:", data);
        console.log("Parsed frame:", parsed);
        setFrame(parsed);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        fontFamily: "system-ui",
        lineHeight: 1.5,
        width: "100%",
        background: "white",
        height: "100vh",
        padding: 24,
        boxSizing: "border-box",
        overflowBehavior: "hidden",
      }}
    >
      <h2>Point Zero Titan</h2>

      {error ? (
        <h1>
          Error Loading data from server please refresh and try again. If error
          persists contact developer.
        </h1>
      ) : null}

      {frame.warnings?.length ? (
        <div style={{ color: "#b00" }}>
          <strong>Warnings:</strong>
          <ul>
            {frame.warnings.map((w, i) => (
              <li key={`${w}-${i}`}>{w}</li>
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
            <dt>State of Charge (%)</dt>
            <dd>{frame.socPct ?? "—"}</dd>
            <dt>Capacity (AH)</dt>
            <dd>{frame.capacityAh ?? "—"}</dd>
            <dt>Voltage (V)</dt>
            <dd>{frame.voltageV ?? "—"}</dd>
            <dt>Current (A)</dt>
            <dd>{frame.currentA ?? "—"}</dd>
            <dt>Power (W)</dt>
            <dd>{frame.powerW ?? "—"}</dd>

            <dt>Flags</dt>
            <dd>{frame.flags ?? "—"}</dd>
            <dt>Status 1</dt>
            <dd>{frame.status1 ?? "—"}</dd>
            <dt>Status 2</dt>
            <dd>{frame.status2 ?? "—"}</dd>
            <dt>Unknown 2</dt>
            <dd>{frame.unknown2 ?? "—"}</dd>
            <dt>Unknown 3</dt>
            <dd>{frame.unknown3 ?? "—"}</dd>
          </dl>
        </div>
      )}
    </div>
  );
}
