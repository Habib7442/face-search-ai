"use client";

import { UploadDialog } from "./upload-dialog";

const ImageUpload = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    return <UploadDialog open={open} onClose={onClose} />;
};

export default ImageUpload;