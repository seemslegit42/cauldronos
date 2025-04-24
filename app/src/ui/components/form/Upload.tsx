import React, { useState } from 'react';
import { Upload as AntUpload, UploadProps as AntUploadProps, UploadFile } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useMotion } from '@/ui/animations/MotionProvider';
import { FadeIn } from '@/ui/animations';

export interface UploadProps extends AntUploadProps {
  animated?: boolean;
  cyberpunk?: boolean;
}

/**
 * Enhanced Upload component with animation support
 */
export const Upload = React.forwardRef<HTMLDivElement, UploadProps>(
  ({ animated = true, cyberpunk = false, className = '', ...props }, ref) => {
    const { reducedMotion } = useMotion();
    const [isDragging, setIsDragging] = useState(false);
    
    // Skip animation if reduced motion is enabled or animated is false
    if (reducedMotion || !animated) {
      return (
        <AntUpload 
          ref={ref} 
          className={`
            enhanced-upload 
            ${cyberpunk ? 'cyberpunk-upload' : ''} 
            ${className}
          `} 
          {...props} 
        />
      );
    }

    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <AntUpload 
          ref={ref} 
          className={`
            enhanced-upload 
            ${cyberpunk ? 'cyberpunk-upload' : ''} 
            ${isDragging ? 'is-dragging' : ''}
            ${className}
          `} 
          onDrop={() => setIsDragging(false)}
          onDragOver={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          {...props} 
        />
      </motion.div>
    );
  }
);

Upload.displayName = 'Upload';

// Re-export Dragger component with enhancements
const Dragger: React.FC<UploadProps> = ({ 
  animated = true, 
  cyberpunk = false, 
  className = '', 
  ...props 
}) => {
  const { reducedMotion } = useMotion();
  const [isDragging, setIsDragging] = useState(false);
  
  // Skip animation if reduced motion is enabled or animated is false
  if (reducedMotion || !animated) {
    return (
      <AntUpload.Dragger 
        className={`
          enhanced-upload-dragger 
          ${cyberpunk ? 'cyberpunk-upload-dragger' : ''} 
          ${className}
        `} 
        {...props} 
      />
    );
  }

  return (
    <motion.div
      animate={isDragging ? { scale: 1.02 } : { scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AntUpload.Dragger 
        className={`
          enhanced-upload-dragger 
          ${cyberpunk ? 'cyberpunk-upload-dragger' : ''} 
          ${isDragging ? 'is-dragging' : ''}
          ${className}
        `} 
        onDrop={() => setIsDragging(false)}
        onDragOver={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        {...props} 
      />
    </motion.div>
  );
};

Upload.Dragger = Dragger;

// Enhanced file list component
export interface FileListProps {
  fileList: UploadFile[];
  onRemove?: (file: UploadFile) => void | boolean | Promise<void | boolean>;
  className?: string;
}

const FileList: React.FC<FileListProps> = ({ fileList, onRemove, className = '' }) => {
  if (!fileList.length) return null;
  
  return (
    <div className={`enhanced-upload-file-list ${className}`}>
      <FadeIn>
        <ul>
          {fileList.map((file) => (
            <motion.li 
              key={file.uid}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="enhanced-upload-file-item"
            >
              <div className="file-info">
                <span className="file-name">{file.name}</span>
                <span className="file-size">{formatFileSize(file.size)}</span>
              </div>
              {file.status === 'uploading' && (
                <div className="file-progress">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${file.percent || 0}%` }}
                  />
                </div>
              )}
              {onRemove && (
                <button 
                  className="remove-button" 
                  onClick={() => onRemove(file)}
                  aria-label="Remove file"
                >
                  ×
                </button>
              )}
            </motion.li>
          ))}
        </ul>
      </FadeIn>
    </div>
  );
};

Upload.FileList = FileList;

// Helper function to format file size
function formatFileSize(size?: number): string {
  if (!size) return 'Unknown size';
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;
  let fileSize = size;
  
  while (fileSize >= 1024 && unitIndex < units.length - 1) {
    fileSize /= 1024;
    unitIndex++;
  }
  
  return `${fileSize.toFixed(1)} ${units[unitIndex]}`;
}

export default Upload;