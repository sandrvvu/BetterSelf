"use client";

import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Toolbar } from "./toolbar";


export default function Tiptap({
  description,
  onChange,
}: {
  description?: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
        heading: {
          HTMLAttributes: {
            class: "text-lg font-bold",
            level: [2],
          },
        },
      }),
      TextStyle,
      Color.configure({ types: ["textStyle"] }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          "focus:outline-none p-2",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col gap-2 justify-stretch min-h-[205px]">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
