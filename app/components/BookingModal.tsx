import React from "react";

interface BookingModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BookingModal({
  isModalOpen,
  setIsModalOpen,
}: BookingModalProps) {
  return (
    <div
      className={`modal-overlay ${isModalOpen ? "open" : ""}`}
      onClick={() => setIsModalOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 860,
          margin: "0 auto",
          display: "grid",
          minHeight: 560,
          background: "#0d0d0d",
          boxShadow:
            "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(200,169,110,0.12)",
          overflow: "hidden",
        }}
        className="booking-grid"
      >
        <style>{`
          .booking-grid {
            grid-template-columns: 1fr 1fr;
          }
          .book-left {
            background: linear-gradient(160deg, #111008 0%, #0a0a08 100%);
            padding: 56px 48px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-right: 1px solid rgba(200,169,110,0.1);
            position: relative;
            overflow: hidden;
          }

          @media (max-width: 900px) {
            .booking-grid {
              grid-template-columns: 1fr;
            }
            .book-left {
              display: none;
            }
          }

          .book-left::before {
            content: '';
            position: absolute;
            bottom: -80px;
            left: -80px;
            width: 320px;
            height: 320px;
            background: radial-gradient(circle, rgba(200,169,110,0.07) 0%, transparent 70%);
            pointer-events: none;
          }

          .book-right {
            background: #080808;
            padding: 56px 48px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .field-wrap {
            position: relative;
            margin-bottom: 40px;
          }

          .field-wrap input,
          .field-wrap textarea {
            width: 100%;
            background: none;
            border: none;
            border-bottom: 1px solid rgba(200,169,110,0.18);
            padding: 14px 0 10px;
            font-family: 'Jost', sans-serif;
            font-size: 14px;
            letter-spacing: 0.04em;
            color: var(--off-white);
            outline: none;
            resize: none;
            display: block;
            transition: border-color 0.3s;
          }

          .field-wrap textarea {
            height: 88px;
            padding-top: 18px;
          }

          .field-wrap input::placeholder,
          .field-wrap textarea::placeholder {
            color: transparent;
          }

          .field-line {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 1px;
            width: 0;
            background: var(--gold);
            transition: width 0.45s cubic-bezier(.16,1,.3,1);
            pointer-events: none;
          }

          .field-wrap input:focus ~ .field-line,
          .field-wrap textarea:focus ~ .field-line {
            width: 100%;
          }

          .field-label {
            position: absolute;
            top: 14px;
            left: 0;
            font-family: 'Jost', sans-serif;
            font-size: 11px;
            letter-spacing: 0.26em;
            text-transform: uppercase;
            color: var(--light-gray);
            pointer-events: none;
            transition: top 0.3s cubic-bezier(.16,1,.3,1), font-size 0.3s, color 0.3s;
          }

          .field-wrap input:focus ~ .field-line ~ .field-label,
          .field-wrap input:not(:placeholder-shown) ~ .field-line ~ .field-label,
          .field-wrap textarea:focus ~ .field-line ~ .field-label,
          .field-wrap textarea:not(:placeholder-shown) ~ .field-line ~ .field-label {
            top: -6px;
            font-size: 9px;
            color: var(--gold);
            letter-spacing: 0.32em;
          }

          .book-submit {
            width: 100%;
            background: var(--gold);
            border: none;
            padding: 16px;
            font-family: 'Jost', sans-serif;
            font-size: 11px;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            color: #080808;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            margin-top: 8px;
            transition: background 0.3s;
          }

          .book-submit::before {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(255,255,255,0.12);
            transform: translateX(-100%);
            transition: transform 0.4s cubic-bezier(.16,1,.3,1);
          }

          .book-submit:hover {
            background: var(--gold-light);
          }

          .book-submit:hover::before {
            transform: translateX(0);
          }

          .book-close {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 36px;
            height: 36px;
            border: 1px solid rgba(200,169,110,0.18);
            background: none;
            color: var(--light-gray);
            font-size: 18px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: border-color 0.3s, color 0.3s;
            z-index: 10;
            line-height: 1;
          }

          .book-close:hover {
            border-color: var(--gold);
            color: var(--gold);
          }
        `}</style>

        {/* Close Button */}
        <button
          className="book-close"
          onClick={() => setIsModalOpen(false)}
        >
          ✕
        </button>

        {/* LEFT PANEL */}
        <div className="book-left">
          <div>
            <div
              style={{
                fontSize: 9,
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 1,
                  background: "var(--gold)",
                  display: "inline-block",
                }}
              />
              San Diego · Live Theatre
            </div>

            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 3.5vw, 46px)",
                fontWeight: 300,
                lineHeight: 1.1,
                color: "var(--off-white)",
                marginBottom: 24,
              }}
            >
              Book a <br />
              <em style={{ color: "var(--gold)" }}>Production</em>
            </div>

            <p
              style={{
                fontSize: 13,
                color: "var(--muted)",
                lineHeight: 1.85,
                letterSpacing: "0.01em",
                maxWidth: 260,
              }}
            >
              Tell us about your production and we'll be in touch to discuss
              coverage, scheduling, and deliverables.
            </p>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(200,169,110,0.1)",
              paddingTop: 28,
            }}
          >
            {[
              "4K Cinema RAW Footage",
              "Archival & Promotional Cuts",
              "Cast & Director Interviews",
              "B-Roll & Behind the Scenes",
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 11,
                  color: "var(--muted)",
                  letterSpacing: "0.06em",
                  padding: "7px 0",
                  borderBottom:
                    i < 3
                      ? "1px solid rgba(200,169,110,0.06)"
                      : "none",
                }}
              >
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "var(--gold)",
                    opacity: 0.6,
                    flexShrink: 0,
                  }}
                />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="book-right">
          {/* <div
            style={{
              fontSize: 9,
              letterSpacing: "0.36em",
              textTransform: "uppercase",
              color: "var(--light-gray)",
              marginBottom: 44,
            }}
          >
            All fields required
          </div> */}

            <div className="md:!hidden"
              style={{
                fontSize: 9,
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 1,
                  background: "var(--gold)",
                  display: "inline-block",
                }}
              />
              San Diego · Live Theatre
            </div>

            <div className="md:!hidden"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 3.5vw, 46px)",
                fontWeight: 300,
                lineHeight: 1.1,
                color: "var(--off-white)",
                marginBottom: 24,
              }}
            >
              Book a
              <em style={{ color: "var(--gold)" }}> Production</em>
            </div>

          <div className="field-wrap">
            <input type="text" id="book-name" placeholder="Name" required />
            <span className="field-line" />
            <label className="field-label" htmlFor="book-name">
              Your Name
            </label>
          </div>

          <div className="field-wrap">
            <input type="email" id="book-email" placeholder="Email" required />
            <span className="field-line" />
            <label className="field-label" htmlFor="book-email">
              Email Address
            </label>
          </div>

          <div className="field-wrap">
            <textarea id="book-message" placeholder="Message" required />
            <span className="field-line" />
            <label className="field-label" htmlFor="book-message">
              About Your Production
            </label>
          </div>

          <button type="submit" className="book-submit">
            Send Inquiry →
          </button>

          <div
            style={{
              marginTop: 20,
              fontSize: 10,
              letterSpacing: "0.14em",
              color: "var(--muted)",
              textAlign: "center",
            }}
          >
            Typically responds within 24 hours
          </div>
        </div>
      </div>
    </div>
  );
}