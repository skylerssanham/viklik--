import React, { useState } from 'react';
import { Language } from '../i18n';

interface CreativeRemarkProps {
  adId: string;
  initialRemark?: string;
  lang: Language;
  isLocked?: boolean;
}

export const CreativeRemark: React.FC<CreativeRemarkProps> = ({ adId, initialRemark, lang, isLocked }) => {
  const [isEditing, setIsEditing] = useState(!initialRemark);
  const [remark, setRemark] = useState(initialRemark || 'canRecreate');
  const [textRemark, setTextRemark] = useState('');

  const handleSubmit = () => {
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="flex flex-col bg-[#fafafa] border border-[#f0f0f0] rounded-[4px] p-3 space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-[13px] text-[#333] font-medium">
            {remark === 'canRecreate' 
              ? (lang === 'zh' ? '可二创' : 'Can Recreate') 
              : (lang === 'zh' ? '不可二创' : 'Cannot Recreate')}
          </span>
        </div>
        {textRemark && (
          <div className="text-[13px] text-[#666] bg-white border border-[#e8e8e8] rounded-[4px] p-2">
            {textRemark}
          </div>
        )}
        <div className="flex justify-end">
          <button 
            onClick={() => !isLocked && setIsEditing(true)}
            disabled={isLocked}
            className={`text-[13px] transition-colors ${isLocked ? 'text-[#ccc] cursor-not-allowed' : 'text-[#1890ff] hover:text-[#40a9ff]'}`}
          >
            {lang === 'zh' ? '编辑' : 'Edit'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] border border-[#f0f0f0] rounded-[4px] p-3">
      <div className="flex items-center space-x-6 mb-3">
        <label className={`flex items-center space-x-2 ${isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
          <input 
            type="radio" 
            name={`remark-${adId}`} 
            value="canRecreate"
            checked={remark === 'canRecreate'}
            onChange={(e) => setRemark(e.target.value)}
            disabled={isLocked}
            className="w-4 h-4 text-[#1890ff] border-[#d9d9d9] focus:ring-[#1890ff]"
          />
          <span className="text-[13px] text-[#333]">{lang === 'zh' ? '可二创' : 'Can Recreate'}</span>
        </label>
        <label className={`flex items-center space-x-2 ${isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
          <input 
            type="radio" 
            name={`remark-${adId}`} 
            value="cannotRecreate"
            checked={remark === 'cannotRecreate'}
            onChange={(e) => setRemark(e.target.value)}
            disabled={isLocked}
            className="w-4 h-4 text-[#1890ff] border-[#d9d9d9] focus:ring-[#1890ff]"
          />
          <span className="text-[13px] text-[#333]">{lang === 'zh' ? '不可二创' : 'Cannot Recreate'}</span>
        </label>
      </div>
      
      <div className="mb-3">
        <input 
          type="text"
          value={textRemark}
          onChange={(e) => setTextRemark(e.target.value)}
          disabled={isLocked}
          className={`block w-full border border-[#d9d9d9] rounded-[4px] py-2 px-3 focus:outline-none focus:border-[#1890ff] focus:ring-1 focus:ring-[#1890ff] text-[13px] transition-colors ${isLocked ? 'bg-[#f5f5f5] text-[#999] cursor-not-allowed' : 'bg-white'}`}
          placeholder={lang === 'zh' ? '补充说明...' : 'Additional remarks...'}
        />
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleSubmit}
          disabled={isLocked}
          className={`px-3 py-1 text-[12px] rounded-[4px] transition-colors ${isLocked ? 'bg-[#ccc] text-white cursor-not-allowed' : 'bg-[#1890ff] text-white hover:bg-[#40a9ff]'}`}
        >
          {lang === 'zh' ? '提交' : 'Submit'}
        </button>
      </div>
    </div>
  );
};
