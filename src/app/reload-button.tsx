"use client";

export default function ReloadButton() {
  return (
    <button
      className="button"
      data-yellow-black
      onClick={() => window.location.reload()}
    >
      Reload
    </button>
  );
}
