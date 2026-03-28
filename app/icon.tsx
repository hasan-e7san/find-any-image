import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#2563eb",
          borderRadius: 112,
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <svg
          width="320"
          height="320"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="3" y="4" width="18" height="16" rx="4" stroke="white" strokeWidth="2.25" />
          <circle cx="16.5" cy="9" r="1.75" fill="white" />
          <path
            d="M5.75 17L10.2 12.55L13.1 15.4L15.65 12.85L18.25 15.45V17.75H5.75V17Z"
            fill="white"
          />
        </svg>
      </div>
    ),
    size,
  );
}
