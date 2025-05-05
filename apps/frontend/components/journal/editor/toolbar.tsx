"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Minus,
  Palette,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";

import { Toggle } from "@/components/ui";

export function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  const actions = [
    {
      icon: <Bold className="size-4" />,
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      action: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive("strike"),
    },
    {
      icon: <Code className="size-4" />,
      action: () => editor.chain().focus().toggleCode().run(),
      active: editor.isActive("code"),
    },
    {
      icon: <Heading2 className="size-4" />,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <List className="size-4" />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
    },
    {
      icon: <Minus className="size-4" />,
      action: () => editor.chain().focus().setHorizontalRule().run(),
      active: false,
    },
    {
      icon: <Undo className="size-4" />,
      action: () => editor.chain().focus().undo().run(),
      active: false,
      disabled: !editor.can().chain().focus().undo().run(),
    },
    {
      icon: <Redo className="size-4" />,
      action: () => editor.chain().focus().redo().run(),
      active: false,
      disabled: !editor.can().chain().focus().redo().run(),
    },
    {
      icon: <Palette className="size-4" />,
      action: () => editor.chain().focus().setColor("#5D3FD3").run(),
      active: editor.isActive("textStyle", { color: "#5D3FD3" }),
    },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-2 border rounded-md bg-muted">
      {actions.map((item, index) => (
        <Toggle
          key={index}
          pressed={item.active}
          onPressedChange={() => item.action()}
          disabled={item.disabled}
        >
          {item.icon}
        </Toggle>
      ))}
    </div>
  );
}
