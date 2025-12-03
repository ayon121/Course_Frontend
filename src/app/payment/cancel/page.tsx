"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const PaymentCancelPage = () => {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const message = searchParams.get("message");
  const amount = searchParams.get("amount");
  const status = searchParams.get("status");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transactionId || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!transactionId) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Loading payment details...
      </p>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #fff3e0, #fffaf3)",
          padding: "20px",
        }}
      >
        <div
          style={{
            maxWidth: "500px",
            width: "100%",
            padding: "30px",
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              color: "#f57c00",
              fontSize: "28px",
              marginBottom: "20px",
            }}
          >
            ⚠️ Payment Canceled
          </h1>
          <p>
            <strong>Message:</strong> {message}
          </p>
          <p>
            <strong>Amount Attempted:</strong> {amount} tk
          </p>
          <p>
            <strong>Status:</strong> {status}
          </p>

          {/* Transaction ID with Copy */}
          <div style={{ marginTop: "20px", marginBottom: "10px" }}>
            <strong>Transaction ID:</strong>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                marginTop: "5px",
              }}
            >
              <span
                style={{
                  background: "rgba(255, 255, 255, 0.3)",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontFamily: "monospace",
                  wordBreak: "break-word",
                }}
              >
                {transactionId}
              </span>
              <button
                onClick={copyToClipboard}
                style={{
                  padding: "6px 12px",
                  background: copied ? "green" : "#f57c00",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                  transition: "0.3s",
                }}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <Link
            href="/"
            style={{
              marginTop: "20px",
              display: "inline-block",
              padding: "12px 24px",
              backgroundColor: "#2e7d32",
              color: "white",
              textDecoration: "none",
              borderRadius: "10px",
              fontSize: "1rem",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              transition: "background 0.3s ease",
            }}
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;