"use client";
import type { ReactNode } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  rows?: number;
}
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  hint?: string;
  children: ReactNode;
}

const fieldCls = "mb-4";
const labelCls =
  "block text-[0.72rem] font-bold text-[var(--text2)] tracking-[0.08em] uppercase mb-[6px]";
const inputCls =
  "w-full px-[14px] py-[10px] rounded-[10px] bg-[var(--card)] border border-[var(--card-b)] text-[var(--text1)] text-[0.88rem] outline-none font-[inherit] transition-[border-color] duration-200";
const hintCls = "text-[0.68rem] text-[var(--text3)] mt-[5px]";

export function Field({label, hint, ...props}: InputProps) {
    return (
        <div className={fieldCls}>
            <label className={labelCls}>{label}</label>
            <input className={inputCls} {...props} />
            {hint && <p className={hintCls}>{hint}</p>}
        </div>
    )
}

export function TextArea({ label, hint, rows = 4, ...props }: TextareaProps) {
  return (
    <div className={fieldCls}>
      <label className={labelCls}>{label}</label>
      <textarea
        className={`${inputCls} resize-y`}
        style={{ minHeight: rows * 28 }}
        rows={rows}
        {...props}
      />
      {hint && <p className={hintCls}>{hint}</p>}
    </div>
  );
}

export function Select({label, hint, children, ...props}: SelectProps) {
  return (
    <div className={fieldCls}>
      <label className={labelCls}>{label}</label>
      <select className={inputCls} {...props}>
        {children}
      </select>
      {hint && <p className={hintCls}>{hint}</p>}
    </div>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-[10px] border-b border-[var(--card-b)] mb-3">
      <span className="text-[0.88rem] text-[var(--text1)]">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full border-none cursor-pointer shrink-0 transition-[background] duration-200
          ${checked ? "bg-[var(--amber,var(--gold2))]" : "bg-[var(--card-b)]"}
        `}
      >
        <span
          className="absolute top-[2px] w-5 h-5 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.3)] transition-[left] duration-200"
          style={{ left: checked ? 22 : 2 }}
        />
      </button>
    </div>
  );
}

export function ModalFooter({
  onCancel,
  onSave,
  saving,
  saveLabel = "💾 Lưu",
}: {
  onCancel: () => void;
  onSave?: () => void;
  saving?: boolean;
  saveLabel?: string;
}) {
  return (
    <div className="flex gap-[10px] justify-end mt-5 pt-4 border-t border-[var(--card-b)]">
      <button
        type="button"
        onClick={onCancel}
        className="h-[38px] px-5 rounded-full bg-[var(--card)] border border-[var(--card-b)] text-[var(--text2)] text-[0.8rem] font-bold cursor-pointer"
      >
        Hủy
      </button>
      <button
        type={onSave ? "button" : "submit"}
        onClick={onSave}
        disabled={saving}
        className={`h-[38px] px-5 rounded-full bg-[linear-gradient(145deg,var(--gold2),var(--amber-d,#7a5218))] text-[#0e1117] text-[0.8rem] font-bold border-none shadow-[0_0_20px_rgba(200,146,26,0.2)] transition-opacity
          ${saving ? "opacity-60 cursor-not-allowed" : "opacity-100 cursor-pointer"}
        `}
      >
        {saving ? "Đang lưu..." : saveLabel}
      </button>
    </div>
  );
}