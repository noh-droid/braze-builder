import "../../styles/modal-preview.css";

export function ModalPreviewDevice({ children }) {
  return <div className="modal-preview-device">{children}</div>;
}

export function ModalPreviewNotch() {
  return <div className="modal-preview-notch" aria-hidden />;
}

export function ModalPreviewScreen({ bgOpacity, children }) {
  return (
    <div
      className="modal-preview-screen"
      style={{
        background: `rgba(0,0,0,${Number(bgOpacity) / 100})`,
      }}
    >
      {children}
    </div>
  );
}

export function ModalPreviewBackdrop({ opacity = 1 }) {
  return (
    <div
      className="modal-preview-backdrop"
      aria-hidden
      style={{ opacity }}
    />
  );
}

export function ModalPreviewSheet({ children, className = "" }) {
  return (
    <div className={`modal-preview-sheet ${className}`.trim()}>{children}</div>
  );
}
