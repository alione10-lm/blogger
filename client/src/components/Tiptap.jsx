import {
  EditorProvider,
  FloatingMenu,
  BubbleMenu,
  useCurrentEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  CaseLower,
  CaseUpper,
  Italic,
  List,
  ListOrdered,
  SquareTerminal,
  Undo,
} from "lucide-react";

// import TextStyle from "@tiptap/extension-text-style";
import { ListItem } from "@tiptap/extension-list-item";
import { TextStyle } from "@tiptap/extension-text-style";
// define your extension array
// const extensions = [StarterKit];
const extensions = [
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="editor-menu border border-gray-200 dark:border-gray-700 mb-2 grid grid-cols-10 md:grid-cols-13 items-center gap-1  p-2  rounded-lg ">
      {/* <button
          type="button"
          onClick={() => editor.chain().focus().toggleMark().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <CaseLower />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <CaseUpper />
        </button> */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <Bold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <Italic />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <SquareTerminal />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        <span>p</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        H3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        H4
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        H5
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        H6
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <List />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <ListOrdered />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo />
      </button>
    </div>
  );
};
const EditorJSONPreview = () => {
  const { editor } = useCurrentEditor();
  console.log(editor.getHTML());

  console.log(editor);
  return (
    <>
      <pre>{JSON.stringify(editor.getJSON(), null, 2)}</pre>;
    </>
  );
};

const Tiptap = () => {
  const content = "<p>Hello World!</p>";

  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      // slotAfter={<EditorJSONPreview />}
      extensions={extensions}
      content={content}
      editorContainerProps={{
        className:
          " w-full editor-text overflow-y-auto bg-gray-50 dark:bg-slate-100/4  rounded-lg p-2  mb-10  min-h-[10rem] max-h-[10rem]",
      }}
    >
      {/* <FloatingMenu editor={null}>This is the floating menu</FloatingMenu> */}
      {/* <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu> */}
    </EditorProvider>
  );
};

export default Tiptap;
