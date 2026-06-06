"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import { Field, TextArea, Select, Toggle, ModalFooter } from "./FormField";
import { adminNewsApi } from "@/lib/adminApi";
import type { NewsArticle, Community, NewsStatus } from "@/types";

interface Props {
  open: boolean;
  onClose: () => void;
  article?: NewsArticle | null;
  communities: Community[];
  onSuccess: () => void;
}

interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  community_id: string;
  is_important: boolean;
  is_pinned: boolean;
  status: NewsStatus;
  tags: string;
}

const EMPTY: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image_url: "",
  community_id: "",
  is_important: false,
  is_pinned: false,
  status: "draft",
  tags: "",
};

export default function NewsModal({
  open,
  onClose,
  article,
  communities,
  onSuccess,
}: Props) {
  const isEdit = !!article;
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (article) {
      setForm({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt ?? "",
        content: article.content,
        cover_image_url: article.cover_image_url ?? "",
        community_id: article.community_id ?? "",
        is_important: article.is_important,
        is_pinned: article.is_pinned,
        status: article.status,
        tags: article.tags?.join(", ") ?? "",
      });
    } else {
      setForm({ ...EMPTY });
    }
    setError("");
  }, [article, open]);

  // Auto-generate slug from title
  const handleTitle = (title: string) => {
    const slug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    setForm((f) => ({ ...f, title, ...(!isEdit ? { slug } : {}) }));
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      setError("Vui lòng nhập tiêu đề");
      return;
    }
    if (!form.content.trim()) {
      setError("Vui lòng nhập nội dung");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        tags: form.tags
          ? form.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        community_id: form.community_id || null,
      };
      if (isEdit) await adminNewsApi.update(article!.id, payload);
      else await adminNewsApi.create(payload);
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
      title={isEdit ? "✏️ Sửa Tin Tức" : "➕ Thêm Tin Tức Mới"}
      subtitle="Điền đầy đủ thông tin bên dưới để tạo hoặc chỉnh sửa tin tức"
      width={680}
    >
      <Field
        label="Tiêu đề *"
        value={form.title}
        onChange={(e) => handleTitle(e.target.value)}
        placeholder="Tiêu đề bài viết...."
      />
      <Field
        label="Slug (Đường dẫn URL)"
        value={form.slug}
        onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
        placeholder="duong-dan-bai-viet"
        hint="Tự động tạo tiêu đề, có thể sửa thủ công"
      />
      <Field
        label="Ảnh bìa (URL)"
        value={form.cover_image_url}
        onChange={(e) =>
          setForm((f) => ({ ...f, cover_image_url: e.target.value }))
        }
        placeholder="https://..."
        type="url"
      />
      <TextArea
        label="Tóm tắt"
        value={form.excerpt}
        onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
        rows={3}
        placeholder="Tóm tắt ngắn hiển thị trên trang danh sách"
      />
      <TextArea
        label="Nội dung"
        value={form.content}
        onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
        rows={15}
        placeholder="Nội dung bài viết (hỗ trợ HTML)...."
        hint="Hỗ trợ HTML đầy đủ: Heading, bảng, ..."
      />

      <div className="grid grid-cols-2 gap-3">
        <Select
          label="Cộng đoàn"
          value={form.community_id}
          onChange={(e) =>
            setForm((f) => ({ ...f, community_id: e.target.value }))
          }
        >
          <option value="">--Toàn Giáo xứ--</option>
          {communities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
        <Select
          label="Trạng thái"
          value={form.status}
          onChange={(e) =>
            setForm((f) => ({ ...f, status: e.target.value as any }))
          }
        >
          <option value="draft">📝 Bản Nháp</option>
          <option value="published">✅ Đã Đăng</option>
          <option value="archived">📦 Lưu Trữ</option>
        </Select>
      </div>
      <Field
        label="Tags"
        value={form.tags}
        onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
        placeholder="Tuần Thánh, Phục Sinh, 2026"
        hint="Cách nhau bằng dấu phẩy"
      />
      <div className="bg-[var(--card)] rounded-[12px] p-[14px_16px] border border-[var(--card-b)] mb-4">
        <Toggle
          label="Đánh dấu tin quan trọng"
          checked={form.is_important}
          onChange={(v) => setForm((f) => ({ ...f, is_important: v }))}
        />

        <Toggle
          label="Ghim lên đầu danh sách"
          checked={form.is_pinned}
          onChange={(v) => setForm((f) => ({ ...f, is_pinned: v }))}
        />
      </div>
      {error && (
        <p className="text-[var(--red, #f87171)] text-sm mt-8 p-[8px_12px] bg-[rgba(53, 0, 0, 0.1)] rounded-lg">
          {error}
        </p>
      )}

      <ModalFooter onCancel={onClose} onSave={handleSubmit} saving={saving} />
    </Modal>
  );
}
