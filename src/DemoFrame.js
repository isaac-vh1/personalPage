import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function DemoFrame() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const url = searchParams.get("url");
  const title = searchParams.get("title") || "Demo";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Banner */}
      <div
        style={{
          background: "#1300a1",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
          flexShrink: 0,
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              background: "#fbbf24",
              color: "#1a1a1a",
              fontWeight: 700,
              fontSize: 12,
              borderRadius: 4,
              padding: "2px 8px",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Demo
          </span>
          <span style={{ fontWeight: 600, fontSize: 16 }}>{title}</span>
          <span style={{ fontSize: 13, opacity: 0.75 }}>
            — This is a demo application
          </span>
        </div>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "white",
            color: "#1300a1",
            border: "none",
            borderRadius: 6,
            padding: "6px 16px",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          ← Back to Portfolio
        </button>
      </div>

      {/* iframe */}
      {url ? (
        <iframe
          src={url}
          title={title}
          style={{ flex: 1, border: "none", width: "100%" }}
        />
      ) : (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            color: "#666",
          }}
        >
          No demo URL provided.
        </div>
      )}
    </div>
  );
}
