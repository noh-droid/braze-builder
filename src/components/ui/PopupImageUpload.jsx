import { useState, useRef, useEffect, useCallback, useId } from "react";
import { BRAND_COLOR } from "./constants";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const ACCEPT = "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp";

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * 팝업 메인 이미지: 로컬 파일 업로드, 미리보기, 드래그 앤 드롭.
 * object URL은 교체·언마운트·외부에서 URL이 일반 주소로 바뀔 때 revoke.
 */
const visuallyHiddenFileInput = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

export function PopupImageUpload({ value, onChange, children }) {
  const fileInputId = useId();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedMeta, setUploadedMeta] = useState(null);
  const [error, setError] = useState(null);
  const objectUrlRef = useRef(null);
  const inputRef = useRef(null);

  const revokeOwned = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  useEffect(() => () => revokeOwned(), [revokeOwned]);

  useEffect(() => {
    if (value && !String(value).startsWith("blob:")) {
      revokeOwned();
    }
  }, [value, revokeOwned]);

  const showUploadedInfo =
    uploadedMeta != null && Boolean(value && String(value).startsWith("blob:"));

  const applyFile = useCallback(
    (file) => {
      setError(null);
      if (!file || !ALLOWED_TYPES.has(file.type)) {
        setError("JPG, PNG, WEBP 형식만 업로드할 수 있습니다.");
        return;
      }
      revokeOwned();
      const nextUrl = URL.createObjectURL(file);
      objectUrlRef.current = nextUrl;
      setUploadedMeta({ name: file.name, size: file.size });
      onChange(nextUrl);
    },
    [onChange, revokeOwned],
  );

  const onFileInputChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) applyFile(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) applyFile(file);
  };

  const openPicker = () => inputRef.current?.click();

  const borderColor = isDragging ? BRAND_COLOR : "#e2e8f0";
  const bg = isDragging ? `${BRAND_COLOR}12` : "#f8fafc";

  return (
    <div style={{ position: "relative" }}>
      {/* 로컬 파일: 실제 <input type="file"> + htmlFor로 연결된 라벨(버튼 역할) */}
      <input
        id={fileInputId}
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        onChange={onFileInputChange}
        style={visuallyHiddenFileInput}
        aria-label="이미지 파일 업로드 (JPG, PNG, WEBP)"
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "8px",
          marginTop: "4px",
          marginBottom: "10px",
        }}
      >
        <label
          htmlFor={fileInputId}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px 14px",
            borderRadius: "6px",
            border: `1.5px solid ${BRAND_COLOR}`,
            background: "#ffffff",
            color: BRAND_COLOR,
            fontSize: "12px",
            fontWeight: "700",
            fontFamily: "Pretendard, sans-serif",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${BRAND_COLOR}14`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#ffffff";
          }}
        >
          이미지 파일 선택
        </label>
        <span style={{ fontSize: "11px", color: "#64748b" }}>JPG · PNG · WEBP</span>
      </div>

      <div
        role="button"
        tabIndex={0}
        aria-label="팝업 메인 이미지: 이 영역을 클릭하거나 이미지를 끌어다 놓으세요."
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openPicker();
          }
        }}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={openPicker}
        style={{
          border: `2px dashed ${borderColor}`,
          borderRadius: "10px",
          background: bg,
          padding: "14px",
          cursor: "pointer",
          transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
          boxShadow: isDragging ? `0 0 0 3px ${BRAND_COLOR}33` : "none",
        }}
      >
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "8px",
              overflow: "hidden",
              flexShrink: 0,
              background: "#e2e8f0",
              border: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {value ? (
              <img
                src={value}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <span style={{ fontSize: "22px", opacity: 0.35 }}>🖼</span>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "700",
                color: "#334155",
                marginBottom: "4px",
              }}
            >
              미리보기 · 클릭 또는 드래그 앤 드롭
            </div>
            <div style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.5 }}>
              위의「이미지 파일 선택」과 같은 파일 대화상자가 열립니다.
            </div>
          </div>
        </div>

        {showUploadedInfo && (
          <div
            style={{
              marginTop: "12px",
              paddingTop: "12px",
              borderTop: "1px solid #e2e8f0",
              fontSize: "12px",
              color: "#475569",
            }}
          >
            <div style={{ fontWeight: "600", color: "#334155", wordBreak: "break-all" }}>
              {uploadedMeta.name}
            </div>
            <div style={{ marginTop: "4px", color: "#64748b" }}>
              용량: {formatFileSize(uploadedMeta.size)}
            </div>
          </div>
        )}

        {error && (
          <div
            style={{
              marginTop: "10px",
              fontSize: "12px",
              fontWeight: "600",
              color: "#dc2626",
            }}
          >
            {error}
          </div>
        )}
      </div>

      {value && String(value).startsWith("blob:") && (
        <div
          style={{
            marginTop: "10px",
            fontSize: "12px",
            fontWeight: "600",
            lineHeight: 1.55,
            color: "#dc2626",
          }}
        >
          현재 로컬 이미지가 선택되었습니다. Braze 배포 전에는 반드시 CDN URL로 교체해야 합니다.
        </div>
      )}

      <div style={{ marginTop: "12px" }}>
        <div
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "#334155",
            marginBottom: "6px",
          }}
        >
          HTTPS 이미지 URL <span style={{ fontWeight: "500", color: "#94a3b8" }}>(배포용)</span>
        </div>
        <input
          type="text"
          value={value && !String(value).startsWith("blob:") ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://cdn.example.com/image.png"
          aria-label="HTTPS 이미지 URL"
          style={{
            width: "100%",
            padding: "8px 10px",
            border: "1.5px solid #e2e8f0",
            borderRadius: "6px",
            fontSize: "13px",
            fontFamily: "Pretendard, sans-serif",
            color: "#1e293b",
            background: "#f8fafc",
            outline: "none",
            transition: "border-color 0.2s",
            boxSizing: "border-box",
          }}
          onFocus={(e) => { e.target.style.borderColor = BRAND_COLOR; }}
          onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; }}
        />
        <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "5px", lineHeight: 1.45 }}>
          CDN 주소를 붙여넣으면 미리보기·생성 코드가 해당 URL을 사용합니다.
        </div>
      </div>

      {children}
    </div>
  );
}
