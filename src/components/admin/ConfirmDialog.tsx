"use client";
import Modal from "./Modal";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  loading?: boolean;
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  loading,
}: Props) {
  return (
    <Modal open={open} onClose={onClose} title={title} width={420}>
      <p className="text-[0.88rem] text-[var(--text2)] leading-[1.7] mb-5">
        {message}
      </p>
      <div className="flex gap-[10px] justify-end">
        <button
          onClick={onClose}
          className="h-[38px] px-5 rounded-full bg-[var(--card)] border border-[var(--card-b)] text-[var(--text2)] text-[0.8rem] font-bold cursor-pointer"
        >
          Hủy
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className={`h-[38px] px-5 rounded-full bg-[rgba(248,113,113,0.85)] border-none text-white text-[0.8rem] font-bold transition-opacity
            ${loading ? "opacity-60 cursor-not-allowed" : "opacity-100 cursor-pointer"}
          `}
        >
          {loading ? "Đang xóa..." : "🗑️ Xác Nhận Xóa"}
        </button>
      </div>
    </Modal>
  );
}
