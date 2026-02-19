import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import styles from "../styles.module.css";

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const formatText = (format: "bold" | "italic" | "underline" | "strikethrough") => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  return (
    <div className={styles.editorToolbar}>
      <div className={styles.toolbarGroup}>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => formatText("bold")}
          title="Bold"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M6.5 4V20H12.5C14.43 20 16 18.43 16 16.5C16 15.27 15.37 14.19 14.42 13.58C15.1 12.97 15.5 12.08 15.5 11.1C15.5 9.29 14.21 8 12.5 8H9.5V4H6.5ZM9.5 10.5H12.5C13.05 10.5 13.5 10.95 13.5 11.5C13.5 12.05 13.05 12.5 12.5 12.5H9.5V10.5ZM9.5 14.5H12.5C13.6 14.5 14.5 15.4 14.5 16.5C14.5 17.6 13.6 18.5 12.5 18.5H9.5V14.5Z"
              fill="#333333"
            />
          </svg>
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => formatText("italic")}
          title="Italic"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M10 4V7H12.21L8.79 17H6V20H14V17H11.79L15.21 7H18V4H10Z" fill="#333333" />
          </svg>
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => formatText("underline")}
          title="Underline"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 17C14.76 17 17 14.76 17 12V3H15V12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12V3H7V12C7 14.76 9.24 17 12 17ZM5 19V21H19V19H5Z"
              fill="#333333"
            />
          </svg>
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={() => formatText("strikethrough")}
          title="Strikethrough"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M10 19H14V16H10V19ZM5 4V7H10V10H14V7H19V4H5ZM3 14H21V12H3V14Z" fill="#333333" />
          </svg>
        </button>
      </div>
    </div>
  );
}




