import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, Search, Folder, LayoutGrid, FileImage, Briefcase } from 'lucide-react';
import { AdNode, Level } from '../types';
import { t } from '../i18n';

const LevelIcon = ({ level, className }: { level: Level, className?: string }) => {
  switch (level) {
    case 'project': return <Briefcase className={className} />;
    case 'campaign': return <Folder className={className} />;
    case 'adGroup': return <LayoutGrid className={className} />;
    case 'ad': return <FileImage className={className} />;
  }
};

const levelMap = {
  project: 'levelProject',
  campaign: 'levelCampaign',
  adGroup: 'levelAdGroup',
  ad: 'levelAd'
} as const;

const TreeNode = ({ node, selectedNode, onSelect, defaultExpanded, lang }: any) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const isSelected = selectedNode.id === node.id;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none">
      <div
        className={`flex items-center py-1.5 px-2 cursor-pointer text-[13px] border-l-[3px] transition-colors ${
          isSelected
            ? 'bg-[#e6f7ff] border-[#1890ff] text-[#1890ff] font-medium'
            : 'border-transparent hover:bg-[#f5f5f5] text-[#333]'
        }`}
        onClick={() => onSelect(node)}
        style={{ paddingLeft: `${(node.level === 'project' ? 0 : node.level === 'campaign' ? 1 : node.level === 'adGroup' ? 2 : 3) * 16 + 8}px` }}
      >
        <div className="w-4 h-4 mr-1 flex items-center justify-center" onClick={(e) => {
          if (hasChildren) {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }
        }}>
          {hasChildren ? (
            isExpanded ? <ChevronDown size={14} className="text-gray-400 hover:text-gray-600" /> : <ChevronRight size={14} className="text-gray-400 hover:text-gray-600" />
          ) : <div className="w-4" />}
        </div>
        <LevelIcon level={node.level} className={`w-3.5 h-3.5 mr-2 flex-shrink-0 ${isSelected ? 'text-[#1890ff]' : 'text-gray-400'}`} />
        <span className="truncate flex-1" title={node.name}>
          <span className="text-[#999] mr-1">[{t(lang, levelMap[node.level])}]</span>
          {node.name}
        </span>
      </div>
      {hasChildren && isExpanded && (
        <div>
          {node.children.map((child: AdNode) => (
            <TreeNode
              key={child.id}
              node={child}
              selectedNode={selectedNode}
              onSelect={onSelect}
              defaultExpanded={defaultExpanded}
              lang={lang}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar = ({ data, selectedNode, onSelect, lang }: any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandAll, setExpandAll] = useState(true);
  const [expandKey, setExpandKey] = useState(0);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowerTerm = searchTerm.toLowerCase();
    const filterNodes = (nodes: AdNode[]): AdNode[] => {
      return nodes.reduce((acc: AdNode[], node) => {
        const matches = node.name.toLowerCase().includes(lowerTerm);
        let filteredChildren: AdNode[] = [];
        if (node.children) {
          filteredChildren = filterNodes(node.children);
        }
        if (matches || filteredChildren.length > 0) {
          acc.push({ ...node, children: filteredChildren.length > 0 ? filteredChildren : node.children });
        }
        return acc;
      }, []);
    };
    return filterNodes(data);
  }, [data, searchTerm]);

  return (
    <div className="w-64 flex-shrink-0 bg-white border-r border-[#f0f0f0] flex flex-col h-full z-20">
      <div className="p-3 border-b border-[#f0f0f0]">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
            <Search size={14} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-8 pr-3 py-1.5 border border-[#d9d9d9] rounded-[4px] leading-5 bg-white placeholder-gray-400 focus:outline-none focus:border-[#1890ff] focus:ring-1 focus:ring-[#1890ff] text-[13px] transition-colors"
            placeholder={t(lang, 'searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mt-3 flex justify-between items-center px-1">
          <span className="text-xs font-medium text-gray-500">{t(lang, 'navTree')}</span>
          <button
            onClick={() => { setExpandAll(!expandAll); setExpandKey(k => k + 1); }}
            className="text-xs text-[#1890ff] hover:text-blue-700 focus:outline-none"
          >
            {expandAll ? t(lang, 'collapseAll') : t(lang, 'expandAll')}
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-2" key={expandKey + (searchTerm ? 'search' : '')}>
        {filteredData.map((node: AdNode) => (
          <TreeNode
            key={node.id}
            node={node}
            selectedNode={selectedNode}
            onSelect={onSelect}
            defaultExpanded={searchTerm ? true : expandAll}
            lang={lang}
          />
        ))}
      </div>
    </div>
  );
};
