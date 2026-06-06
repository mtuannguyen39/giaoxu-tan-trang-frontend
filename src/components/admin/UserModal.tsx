"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import { Field, Select, Toggle, ModalFooter } from "./FormField";
import { adminUserApi } from "@/lib/adminApi";
import type { Community } from "@/types";

interface UserData {
  id: string;
  email: string;
  full_name: string;
  role: string;
  community_id: string | null;
  is_active: boolean;
}

interface Props {
  open: boolean;
  onClose: () => void;
  user?: UserData | null;
  communities: Community[];
  onSuccess: () => void;
}

const EMPTY = {
  email: "",
  full_name: "",
  role: "editor",
  community_id: "",
  password: "",
  is_active: true,
};

export default function UserModal({
  open,
  onClose,
  user,
  communities,
  onSuccess,
}: Props) {
  const isEdit = !!user;
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        community_id: user.community_id ?? "",
        password: "",
        is_active: user.is_active,
      });
    } else setForm({ ...EMPTY });
    setError("");
  }, [user, open]);

  const handleSubmit = async () => {
    if (!form.email.trim()) {
      setError("Vui lòng nhập Email");
      return;
    }

    if (!isEdit && !form.password) {
      setError("Vui lòng nhập mật khẩu cho tài khoản mới!");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const payload: any = {
        email: form.email,
        full_name: form.full_name,
        role: form.role,
        community_id: form.community_id || null,
        is_active: form.is_active,
      };
      if (form.password) payload.password = form.password;
      if (isEdit) await adminUserApi.update(user!.id, payload);
      else await adminUserApi.create(payload);
      onSuccess();
      onClose();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const ROLE_HINT: Record<string, string> = {
    super_admin: "Toàn quyền cài đặt hệ thống",
    admin: "Quản lý tất cả nội dung, không xoá được các user khác",
    editor: "Chỉ tạo/sửa tin của cộng đoàn được phân công",
    viewer: "Chỉ xem, không chỉnh sửa",
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Sửa tài khoản" : "Tạo tài khoản mới"}
      subtitle="Quản lý tài khoản Admin / Editor giáo xứ"
    >
      <Field
        label="Email *"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        type="email"
        placeholder="admin@giaoxutantrang.com"
        disabled={isEdit}
        hint={isEdit ? "Không thể đổi email sau khi tạo" : ""}
      />
      <Field
        label="Họ và tên"
        value={form.full_name}
        onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
        placeholder="Ví dụ: Nguyễn Văn An"
      />
      <Select
        label="Vai trò (role)"
        value={form.role}
        onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
        hint={ROLE_HINT[form.role]}
      >
        <option value="super_admin">Super Admin</option>
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
        <option value="viewer">Viewer</option>
      </Select>
      {form.role === "editor" && (
        <Select
          label="Cộng đoàn phụ trách"
          value={form.community_id}
          onChange={(e) =>
            setForm((f) => ({ ...f, community_id: e.target.value }))
          }
          hint="Editor chỉ được quản lý tin của cộng đoàn này"
        >
          <option value="">- Chọn cộng đoàn -</option>
          {communities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      )}
      <Field
        label={isEdit ? "Mật khẩu mới (để trống = không đổi)" : "Mật khẩu *"}
        value={form.password}
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
        type="password"
        placeholder={isEdit ? "••••••••" : "Tối thiểu 8 ký tự"}
        autoComplete="new-password"
      />
      <div className="bg-[var(--card)] rounded-xl p-[14px_16px] border border-[var(--card-b)]">
        <Toggle
          label="Tài khoản đang hoạt động"
          checked={form.is_active}
          onChange={(v) => setForm((f) => ({ ...f, is_active: v }))}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2 p-[8px_12px] rounded-xl bg-[rgba(248,113,113,0.1)]">
          {error}
        </p>
      )}
      <ModalFooter onCancel={onClose} onSave={handleSubmit} saving={saving} />
    </Modal>
  );
}
