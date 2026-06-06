"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import { Field, ModalFooter, Select, TextArea } from "./FormField";
import { adminCalendarApi } from "@/lib/adminApi";
import type {
  CatholicCalendarDay,
  LiturgicalSeason,
  LiturgicalColor,
  FeastLevel,
} from "@/types";

interface Props {
  open: boolean;
  onClose: () => void;
  item?: CatholicCalendarDay | null;
  onSuccess: () => void;
}

interface CalendarForm {
  date: string;
  liturgical_name: string;
  liturgical_season: LiturgicalSeason;
  liturgical_color: LiturgicalColor;
  feast_level: FeastLevel;
  saint_of_day: string;
  gospel_reference: string;
  notes: string;
}

const EMPTY: CalendarForm = {
  date: new Date().toISOString().split("T")[0],
  liturgical_name: "",
  liturgical_season: "thuong_nien",
  liturgical_color: "xanh_la",
  feast_level: "ngay_thuong",
  saint_of_day: "",
  gospel_reference: "",
  notes: "",
};

const SEASONS: [LiturgicalSeason, string][] = [
  ["mua_vong", "🕯️ Mùa Vọng"],
  ["giang_sinh", "⭐ Giáng Sinh"],
  ["thuong_nien", "🌿 Thường Niên"],
  ["mua_chay", "✝️ Mùa Chay"],
  ["phuc_sinh", "🌅 Phục Sinh"],
];
const COLORS: [LiturgicalColor, string][] = [
  ["trang", "⬜ Trắng"],
  ["do", "🟥 Đỏ"],
  ["xanh_la", "🟩 Xanh Lá"],
  ["tim", "🟣 Tím"],
  ["hong", "🌸 Hồng"],
];
const FEAST_LEVELS: [FeastLevel, string][] = [
  ["le_trong", "🌟 Lễ Trọng"],
  ["le_kinh", "⭐ Lễ Kính"],
  ["le_nho", "✨ Lễ Nhớ"],
  ["ngay_thuong", "📅 Ngày Thường"],
];

export default function CalendarModal({
  open,
  onClose,
  item,
  onSuccess,
}: Props) {
  const isEdit = !!item;
  const [form, setForm] = useState<CalendarForm>({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (item) {
      setForm({
        date: item.date.split("T")[0],
        liturgical_name: item.liturgical_name ?? "",
        liturgical_season: item.liturgical_season,
        liturgical_color: item.liturgical_color,
        feast_level: item.feast_level,
        saint_of_day: item.saint_of_day ?? "",
        gospel_reference: item.gospel_reference ?? "",
        notes: item.notes ?? "",
      });
    } else setForm({ ...EMPTY });
    setError("");
  }, [item, open]);

  const handleSubmit = async () => {
    if (!form.date) {
      setError("Vui lòng chọn ngày!");
      return;
    }
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        year: new Date(form.date).getFullYear(),
        liturgical_name: form.liturgical_name || null,
        saint_of_day: form.saint_of_day || null,
        gospel_reference: form.gospel_reference || null,
        notes: form.notes || null,
      };
      if (!isEdit) await adminCalendarApi.update(item!.id, payload);
      else await adminCalendarApi.create(payload);
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
      title={isEdit ? "Chỉnh sửa lịch Công Giáo" : "Thêm ngày lễ"}
    >
      <Field
        label="Ngày *"
        value={form.date}
        onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
        type="date"
      />
      <Field
        label="Tên ngày lễ / Mùa Phụng Vụ"
        value={form.liturgical_name}
        onChange={(e) =>
          setForm((f) => ({ ...f, liturgical_name: e.target.value }))
        }
        placeholder="Chúa Nhật III Mùa Chay...."
      />
      <div className="grid gap-3 grid-cols-2">
        <Select
          label="Mùa phụng vụ"
          value={form.liturgical_season}
          onChange={(e) =>
            setForm((f) => ({ ...f, liturgical_season: e.target.value as any }))
          }
        >
          {SEASONS.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </Select>
        <Select
          label="Màu phụng vụ"
          value={form.liturgical_color}
          onChange={(e) =>
            setForm((f) => ({ ...f, liturgical_color: e.target.value as any }))
          }
        >
          {COLORS.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </Select>
      </div>
      <Select
        label="Bậc lễ"
        value={form.feast_level}
        onChange={(e) =>
          setForm((f) => ({ ...f, feast_level: e.target.value as any }))
        }
      >
        {FEAST_LEVELS.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </Select>
      <Field
        label="Thánh trong ngày"
        value={form.saint_of_day}
        onChange={(e) =>
          setForm((f) => ({ ...f, saint_of_day: e.target.value }))
        }
        placeholder="Thánh Giuse, Bạn Trăm Năm Đức Maria..."
      />
      <Field
        label="Đoạn Tin Mừng"
        value={form.gospel_reference}
        onChange={(e) =>
          setForm((f) => ({ ...f, gospel_reference: e.target.value }))
        }
        placeholder="Ga 4,5-42"
      />
      <TextArea
        label="Ghi chú"
        value={form.notes}
        onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
        rows={3}
      />
      {error && (
        <p className="text-[var(--red,#f87171)] text-[0.8rem] mt-2 px-3 py-2 bg-[rgba(248,113,113,0.1)] rounded-[8px]">
          ⚠️ {error}
        </p>
      )}
      <ModalFooter onCancel={onClose} onSave={handleSubmit} saving={saving} />
    </Modal>
  );
}
