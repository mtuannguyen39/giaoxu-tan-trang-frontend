"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import { Field, TextArea, Select, Toggle, ModalFooter } from "./FormField";
import { adminCommunityApi } from "@/lib/adminApi";
import type { Community, CommunityType } from "@/types";

interface Props {
  open: boolean;
  onClose: () => void;
  item?: Community | null;
  onSuccess: () => void;
}

interface CommunityForm {
  name: string;
  slug: string;
  type: CommunityType;
  description: string;
  leader_name: string;
  contact_phone: string;
  meeting_schedule: string;
  sort_order: number;
  is_active: boolean;
}

const EMPTY: CommunityForm = {
  name: "",
  slug: "",
  type: "giao_khu",
  description: "",
  leader_name: "",
  contact_phone: "",
  meeting_schedule: "",
  sort_order: 0,
  is_active: true,
};

// Simple slug generator helper
const generateSlug = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[đĐ]/g, "d")
    .replace(/([^a-z0-9\s-]|_)+/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export default function CommunityModal({
  open,
  onClose,
  item,
  onSuccess,
}: Props) {
  const isEdit = !!item;
  const [form, setForm] = useState<CommunityForm>({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name ?? "",
        slug: item.slug ?? "",
        type: item.type ?? "giao_khu",
        description: item.description ?? "",
        leader_name: item.leader_name ?? "",
        contact_phone: item.contact_phone ?? "",
        meeting_schedule: item.meeting_schedule ?? "",
        sort_order: item.sort_order ?? 0,
        is_active: item.is_active ?? true,
      });
    } else {
      setForm({ ...EMPTY });
    }
    setError("");
  }, [item, open]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setForm((prev) => {
      // Auto-generate slug if it was empty or matched the previous auto-generated slug of the old name
      const oldAutoSlug = generateSlug(prev.name);
      const shouldUpdateSlug = !prev.slug || prev.slug === oldAutoSlug;
      return {
        ...prev,
        name,
        slug: shouldUpdateSlug ? generateSlug(name) : prev.slug,
      };
    });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!form.name.trim()) {
      setError("Vui lòng nhập tên giáo khu / đoàn thể");
      return;
    }
    if (!form.slug.trim()) {
      setError("Vui lòng nhập slug");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        description: form.description.trim() || null,
        leader_name: form.leader_name.trim() || null,
        contact_phone: form.contact_phone.trim() || null,
        meeting_schedule: form.meeting_schedule.trim() || null,
      };

      if (isEdit && item) {
        await adminCommunityApi.update(item.id, payload);
      } else {
        await adminCommunityApi.create(payload);
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi lưu thông tin");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        isEdit
          ? "✏️ Sửa Giáo Khu / Đoàn Thể"
          : "➕ Thêm Giáo Khu / Đoàn Thể Mới"
      }
      subtitle="Quản lý thông tin giáo khu, đoàn thể hoặc ban ngành trong giáo xứ"
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Tên Giáo Khu / Đoàn Thể *"
            value={form.name}
            onChange={handleNameChange}
            placeholder="Ví dụ: Giáo khu Phaolô, Đoàn Thiếu Nhi..."
          />
          <Field
            label="Slug (Đường dẫn thân thiện) *"
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            placeholder="giao-khu-phaolo"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Loại phân loại *"
            value={form.type}
            onChange={(e) =>
              setForm((f) => ({ ...f, type: e.target.value as CommunityType }))
            }
          >
            <option value="giao_khu">🏘️ Giáo khu</option>
            <option value="doan_the">👥 Đoàn thể</option>
            <option value="khac">📍 Khác (Ban ngành / Ca đoàn...)</option>
          </Select>

          <Field
            label="Thứ tự hiển thị"
            type="number"
            value={form.sort_order}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                sort_order: parseInt(e.target.value) || 0,
              }))
            }
            placeholder="0"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Người đại diện / Trưởng ban"
            value={form.leader_name}
            onChange={(e) =>
              setForm((f) => ({ ...f, leader_name: e.target.value }))
            }
            placeholder="Ông Nguyễn Văn A"
          />
          <Field
            label="Số điện thoại liên hệ"
            value={form.contact_phone}
            onChange={(e) =>
              setForm((f) => ({ ...f, contact_phone: e.target.value }))
            }
            placeholder="0901234567"
          />
        </div>

        <Field
          label="Lịch sinh hoạt / Họp"
          value={form.meeting_schedule}
          onChange={(e) =>
            setForm((f) => ({ ...f, meeting_schedule: e.target.value }))
          }
          placeholder="Ví dụ: 19h00 Chúa Nhật hàng tuần tại Nhà Xứ"
        />

        <TextArea
          label="Mô tả / Giới thiệu"
          value={form.description}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          rows={3}
          placeholder="Giới thiệu sơ lược lịch sử, bổn mạng, hoạt động..."
        />

        <div className="bg-[var(--card)] rounded-[12px] p-[14px_16px] border border-[var(--card-b)]">
          <Toggle
            label="🔔 Kích hoạt hoạt động"
            checked={form.is_active}
            onChange={(v) => setForm((f) => ({ ...f, is_active: v }))}
          />
        </div>

        {error && (
          <p className="text-[var(--red,#f87171)] text-[0.8rem] mt-2 px-3 py-2 bg-[rgba(248,113,113,0.1)] rounded-[8px]">
            ⚠️ {error}
          </p>
        )}

        <ModalFooter onCancel={onClose} saving={saving} />
      </form>
    </Modal>
  );
}
