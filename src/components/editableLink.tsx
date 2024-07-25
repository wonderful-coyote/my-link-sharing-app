import React, { useState } from "react";
import Button from "./button";

interface Link {
  id: number;
  url: string;
  platform: string;
}

interface EditableLinkProps {
  link: Link;
  onUpdate: (url: string, platform: string) => void;
  onRemove: () => void;
}

const EditableLink: React.FC<EditableLinkProps> = ({
  link,
  onUpdate,
  onRemove,
}) => {
  const [url, setUrl] = useState(link.url);
  const [platform, setPlatform] = useState(link.platform);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onUpdate(url, platform);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="editable-link">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <input
          type="text"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          placeholder="Enter Platform"
        />
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={() => setIsEditing(false)}>Cancel</Button>
      </div>
    );
  }

  return (
    <div className="editable-link">
      <span>
        {platform}: {url}
      </span>
      <Button onClick={() => setIsEditing(true)}>Edit</Button>
      <Button onClick={onRemove}>Remove</Button>
    </div>
  );
};

export default EditableLink;
