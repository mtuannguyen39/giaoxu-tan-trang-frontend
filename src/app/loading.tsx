// app/loading.tsx — Loading skeleton
export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: "3px solid var(--border-gold)",
            borderTopColor: "var(--gold2)",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <p style={{ color: "var(--text3)", fontSize: "0.84rem" }}>
          Đang tải...
        </p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
