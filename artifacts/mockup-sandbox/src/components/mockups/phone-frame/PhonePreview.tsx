const APP_URL = "https://58f4d1ef-b454-435d-b5e5-35559c05066d-00-17ddrxl6na7h8.expo.worf.replit.dev/";

export function PhonePreview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-700 tracking-wide">国泰民安·肽护中华</h2>
          <p className="text-sm text-slate-500 mt-1">App Preview</p>
        </div>

        {/* Phone outer shell */}
        <div
          style={{
            width: 375,
            height: 812,
            background: "linear-gradient(145deg, #1a1a1a, #2d2d2d)",
            borderRadius: 54,
            padding: 12,
            boxShadow:
              "0 0 0 1px #444, 0 30px 80px rgba(0,0,0,0.5), inset 0 0 0 1px #555, 0 0 0 6px #111",
            position: "relative",
            flexShrink: 0,
          }}
        >
          {/* Side buttons left */}
          <div style={{ position: "absolute", left: -4, top: 130, width: 4, height: 36, background: "#333", borderRadius: "4px 0 0 4px", boxShadow: "-1px 0 0 #222" }} />
          <div style={{ position: "absolute", left: -4, top: 182, width: 4, height: 60, background: "#333", borderRadius: "4px 0 0 4px", boxShadow: "-1px 0 0 #222" }} />
          <div style={{ position: "absolute", left: -4, top: 252, width: 4, height: 60, background: "#333", borderRadius: "4px 0 0 4px", boxShadow: "-1px 0 0 #222" }} />
          {/* Side button right */}
          <div style={{ position: "absolute", right: -4, top: 190, width: 4, height: 90, background: "#333", borderRadius: "0 4px 4px 0", boxShadow: "1px 0 0 #222" }} />

          {/* Screen bezel */}
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "#000",
              borderRadius: 44,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Status bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 44,
                background: "rgba(0,0,0,0.85)",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: 24,
                paddingRight: 24,
              }}
            >
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "system-ui" }}>9:41</span>
              {/* Dynamic island */}
              <div style={{
                width: 120,
                height: 34,
                background: "#000",
                borderRadius: 20,
                border: "1px solid #222",
              }} />
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
                  <rect x="0" y="3" width="3" height="9" rx="1" opacity="0.4"/>
                  <rect x="4.5" y="2" width="3" height="10" rx="1" opacity="0.6"/>
                  <rect x="9" y="0" width="3" height="12" rx="1" opacity="0.8"/>
                  <rect x="13.5" y="0" width="3" height="12" rx="1"/>
                </svg>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
                  <path d="M8 2.4C10.8 2.4 13.3 3.6 15 5.5L16 4.4C14 2.2 11.1 0.8 8 0.8C4.9 0.8 2 2.2 0 4.4L1 5.5C2.7 3.6 5.2 2.4 8 2.4Z" opacity="0.4"/>
                  <path d="M8 5.2C9.9 5.2 11.6 6 12.8 7.3L13.8 6.2C12.3 4.7 10.3 3.8 8 3.8C5.7 3.8 3.7 4.7 2.2 6.2L3.2 7.3C4.4 6 6.1 5.2 8 5.2Z" opacity="0.7"/>
                  <path d="M8 8C9 8 9.9 8.4 10.6 9.1L11.7 8C10.7 6.9 9.4 6.2 8 6.2C6.6 6.2 5.3 6.9 4.3 8L5.4 9.1C6.1 8.4 7 8 8 8Z"/>
                  <circle cx="8" cy="11" r="1"/>
                </svg>
                <div style={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <div style={{ width: 22, height: 11, border: "1.5px solid white", borderRadius: 3, padding: 1.5, display: "flex", alignItems: "center" }}>
                    <div style={{ width: "75%", height: "100%", background: "white", borderRadius: 1.5 }} />
                  </div>
                  <div style={{ width: 2, height: 5, background: "rgba(255,255,255,0.4)", borderRadius: "0 1px 1px 0" }} />
                </div>
              </div>
            </div>

            {/* App iframe */}
            <iframe
              src={APP_URL}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                display: "block",
              }}
              title="App Preview"
            />

            {/* Home indicator */}
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: "50%",
                transform: "translateX(-50%)",
                width: 134,
                height: 5,
                background: "rgba(255,255,255,0.3)",
                borderRadius: 3,
                zIndex: 10,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
