import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import {
  CornerDownLeft,
  Bold as BoldLetter,
  Italic as ItalicLetter,
  Underline as UnderlineLetter,
  List,
  ListOrdered,
  AlignLeft,
  AlignJustify,
  AlignRight,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import { IFileRisk } from "@/types/IRiskFile";

const Editor = ({
  contentDescription,
  setContentDescription,
  styling,
  setFilesRisk,
  typeRisk,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contentDescription?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setContentDescription?: any;
  styling: string;
  setFilesRisk: React.Dispatch<React.SetStateAction<IFileRisk[]>>;
  typeRisk: number;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Bold,
      Italic,
      Underline,
      BulletList.configure({
        keepMarks: true,
      }),
      OrderedList,
    ],
    onBlur: ({ editor }) => {
      setContentDescription(
        editor
          .getHTML()
          .replaceAll("<ul>", `<ul class="list-outside list-disc ml-6">`)
          .replaceAll("<ol>", `<ul class="list-outside list-decimal ml-6">`)
      );
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(contentDescription);
    }
  }, [contentDescription, editor]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
      setFilesRisk((prev) => [
        ...prev,
        ...Array.from(event.target.files!).map((file) => ({
          File: file,
          Type: typeRisk,
        })),
      ]);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="bg-white border p-2 rounded-md w-full">
      <div className="flex mb-2 flex-wrap gap-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="px-2 py-1"
        >
          <CornerDownLeft color="#000" size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className="px-2 py-1"
        >
          <AlignLeft color="#000" size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className="px-2 py-1"
        >
          <AlignJustify color="#000" size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className="px-2 py-1"
        >
          <AlignRight color="#000" size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 ${
            editor.isActive("bold") ? "bg-gray-400" : ""
          } rounded`}
        >
          <BoldLetter color="#000" size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 ${
            editor.isActive("italic") ? "bg-gray-400" : ""
          } rounded`}
        >
          <ItalicLetter color="#000" size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 ${
            editor.isActive("underline") ? "bg-gray-400" : ""
          } rounded`}
        >
          <UnderlineLetter color="#000" size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 ${
            editor.isActive("bulletList") ? "bg-gray-400" : ""
          } rounded`}
        >
          <List color="#000" size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 ${
            editor.isActive("orderedList") ? "bg-gray-400" : ""
          } rounded`}
        >
          <ListOrdered color="#000" size={16} />
        </button>

        {/* File Upload Button */}
        <label className="flex items-center gap-2 px-2 py-1 border rounded cursor-pointer border-none">
          <Upload color="#000" size={16} />
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
      <EditorContent
        placeholder="Digite aqui..."
        className={`EditorContent overflow-y-auto p-2 max-h-72 break-words h-34 max-w-[${styling}] focus-visible:border-none focus-visible:outline-none`}
        editor={editor}
      />
      {files.length > 0 && (
        <div className="mt-2">
          <h4 className="text-sm font-medium">Arquivos:</h4>
          <ul className="list-disc list-inside">
            {files.map((file, index) => (
              <li key={index} className="text-sm">
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Editor;
