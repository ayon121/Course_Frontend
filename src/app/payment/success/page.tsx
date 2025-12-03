"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const PaymentSuccessPage = () => {
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
        return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading payment details...</p>;
    }

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    background: "linear-gradient(135deg, #e0f7fa, #e8f5e9)",
                    padding: "20spx",
                }}
                className="font-poppins"
            >
                <div
                    style={{
                        maxWidth: "500px",
                        width: "100%",
                        padding: "30px",
                        borderRadius: "20px",
                        backdropFilter: "blur(12px)",
                        background: "rgba(255, 255, 255, 0.3)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                        textAlign: "center",
                    }}
                >
                    <h1 style={{ color: "#2e7d32", fontSize: "2rem", marginBottom: "20px" }}>
                        ✅ Payment Successful
                    </h1>

                    <div style={{ marginBottom: "15px" }}>
                        <strong>Transaction ID:</strong>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "8px",
                                gap: "10px",
                            }}
                        >
                            <span
                                style={{
                                    background: "rgba(255,255,255,0.7)",
                                    padding: "8px 12px",
                                    borderRadius: "8px",
                                    fontSize: "1rem",
                                    wordBreak: "break-word",
                                }}
                                className="font-medium"
                            >
                                {transactionId}
                            </span>
                            <button
                                onClick={copyToClipboard}
                                style={{
                                    background: copied ? "#2e7d32" : "#43a047",
                                    color: "white",
                                    border: "none",
                                    padding: "8px 12px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                    </div>

                    <p style={{ marginBottom: "10px" }}>
                        <strong>Message:</strong> {message}
                    </p>
                    <p style={{ marginBottom: "10px" }}>
                        <strong>Amount Paid:</strong> {amount} tk
                    </p>
                    <p style={{ marginBottom: "20px" }}>
                        <strong>Status:</strong>{" "}
                        <span style={{ color: "#2e7d32", fontWeight: "bold" }}>{status}</span>
                    </p>

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

export default PaymentSuccessPage;