// components/admin/AnnouncementModal.tsx — Create/Edit Announcements
"use client";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import { Field, TextArea, Select, Toggle, ModalFooter } from "./FormField";
import { adminAnnouncementApi } from "@/lib/adminApi";
import type { Announcement } from "@/types";

interface Props {
  open: boolean;
  onClose: () => void;
  item?: Announcement | null;
  onSuccess: () => void;
}

const EMPTY = {
  title: "",
  content: "",
  type: "thong_thuong" as Announcement["type"],
  display_from: "",
  display_until: "",
  is_active: true,
};

export default function AnnouncementModal({
  open,
  onClose,
  item,
  onSuccess,
}: Props) {
  const isEdit = !!item;
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (item) {
      setForm({
        title: item.title,
        content: item.content,
        type: item.type,
        display_from: item.display_from ? item.display_from.slice(0, 16) : "",
        display_until: item.display_until
          ? item.display_until.slice(0, 16)
          : "",
        is_active: item.is_active,
      });
    } else setForm({ ...EMPTY });
    setError("");
  }, [item, open]);

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      setError("Vui lòng nhập tiêu đề");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        display_from: form.display_from || null,
        display_until: form.display_until || null,
      };
      if (isEdit) await adminAnnouncementApi.update(item!.id, payload);
      else await adminAnnouncementApi.create(payload);
      onSuccess();
      onClose();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "✏️ Sửa Thông Báo" : "➕ Tạo Thông Báo Mới"}
      subtitle="Thông báo sẽ hiển thị trên trang chủ theo thời gian đã đặt"
    >
      <Field
        label="Tiêu Đề *"
        value={form.title}
        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        placeholder="Tiêu đề thông báo..."
      />
      <Select
        label="Loại Thông Báo"
        value={form.type}
        onChange={(e) =>
          setForm((f) => ({ ...f, type: e.target.value as any }))
        }
      >
        <option value="thong_thuong">📢 Thông thường</option>
        <option value="lich_su">📅 Lịch sự kiện</option>
        <option value="khan_cap">🚨 Khẩn cấp</option>
      </Select>
      <TextArea
        label="Nội Dung *"
        value={form.content}
        onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
        rows={5}
        placeholder="Nội dung thông báo..."
      />

      <div className="grid grid-cols-2 gap-3">
        <Field
          label="Hiển Thị Từ"
          value={form.display_from}
          onChange={(e) =>
            setForm((f) => ({ ...f, display_from: e.target.value }))
          }
          type="datetime-local"
          hint="Để trống = hiển thị ngay"
        />
        <Field
          label="Hết Hạn Lúc"
          value={form.display_until}
          onChange={(e) =>
            setForm((f) => ({ ...f, display_until: e.target.value }))
          }
          type="datetime-local"
          hint="Để trống = không hết hạn"
        />
      </div>

      <div className="bg-[var(--card)] rounded-[12px] p-[14px_16px] border border-[var(--card-b)]">
        <Toggle
          label="🔔 Bật hiển thị thông báo"
          checked={form.is_active}
          onChange={(v) => setForm((f) => ({ ...f, is_active: v }))}
        />
      </div>

      {error && (
        <p className="text-[var(--red,#f87171)] text-[0.8rem] mt-2 px-3 py-2 bg-[rgba(248,113,113,0.1)] rounded-[8px]">
          ⚠️ {error}
        </p>
      )}

      <ModalFooter onCancel={onClose} onSave={handleSubmit} saving={saving} />
    </Modal>
  );
}
