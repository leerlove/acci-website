import { useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import QuillResizeImage from 'quill-resize-image';
import 'react-quill-new/dist/quill.snow.css';

Quill.register('modules/resize', QuillResizeImage);

const FORMATS = [
  'header', 'bold', 'italic', 'underline', 'strike',
  'list', 'link', 'image', 'blockquote',
  'width', 'height', 'style',
];

export default function RichTextEditor({ value, onChange, placeholder }) {
  const modules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['blockquote'],
      ['clean'],
    ],
    resize: {
      locale: {},
    },
  }), []);

  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={FORMATS}
        placeholder={placeholder}
      />
    </div>
  );
}
