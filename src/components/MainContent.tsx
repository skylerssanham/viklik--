import React, { useState } from 'react';
import { AdNode } from '../types';
import { t, Language } from '../i18n';

const levelMap = {
  project: 'levelProject',
  campaign: 'levelCampaign',
  adGroup: 'levelAdGroup',
  ad: 'levelAd'
} as const;

const AdRulesSection = ({ title, hasToggle, isNested, lang }: { title?: string, hasToggle?: boolean, isNested?: boolean, lang: Language }) => {
  const [enabled, setEnabled] = useState(true);
  
  const content = (
    <div className="space-y-5">
      {/* Execution Order 1: CPA Threshold */}
      <div className="space-y-1.5 p-3 bg-[#fafafa] border border-[#f0f0f0] rounded-[4px] relative">
        <div className="absolute top-3 right-3 text-[#999] text-[12px]">
          {t(lang, 'execOrder1')}
        </div>
        <label className="block text-[13px] text-[#666] pr-20">{t(lang, 'adCpaThreshold')}</label>
        <div className="relative">
          <input type="number" className="block w-full border border-[#d9d9d9] rounded-[4px] py-1.5 px-3 focus:outline-none focus:border-[#1890ff] focus:ring-1 focus:ring-[#1890ff] text-[13px] bg-white transition-colors" placeholder={`${t(lang, 'example')}10`} defaultValue="5" />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-[#999] text-[13px]">$</span>
          </div>
        </div>
        <p className="text-[12px] text-[#999]">{t(lang, 'adCpaDesc')}</p>
      </div>

      {/* Execution Order 2: Spend Threshold */}
      <div className="space-y-1.5 p-3 bg-[#fafafa] border border-[#f0f0f0] rounded-[4px] relative">
        <div className="absolute top-3 right-3 text-[#999] text-[12px]">
          {t(lang, 'execOrder2')}
        </div>
        <label className="block text-[13px] text-[#666] pr-20">{t(lang, 'adStopThreshold')}</label>
        <div className="relative">
          <input type="number" className="block w-full border border-[#d9d9d9] rounded-[4px] py-1.5 px-3 focus:outline-none focus:border-[#1890ff] focus:ring-1 focus:ring-[#1890ff] text-[13px] bg-white transition-colors" placeholder={`${t(lang, 'example')}50`} defaultValue="100" />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-[#999] text-[13px]">$</span>
          </div>
        </div>
        <p className="text-[12px] text-[#999]">{t(lang, 'adStopDesc')}</p>
      </div>
    </div>
  );

  return (
    <div className={title ? "mt-6 pt-5 border-t border-[#f0f0f0]" : ""}>
      {title && (
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[13px] font-medium text-[#333]">{title}</h4>
          {hasToggle && (
            <button 
              onClick={() => setEnabled(!enabled)}
              className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-[#1890ff]' : 'bg-[#d9d9d9]'}`}
            >
              <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-4' : 'translate-x-1'}`} />
            </button>
          )}
        </div>
      )}
      {(!hasToggle || enabled) && (
        isNested ? (
          <div className="p-4 bg-white border border-[#e8e8e8] rounded-[4px] shadow-sm">
            {content}
          </div>
        ) : content
      )}
    </div>
  );
};

export const MainContent = ({ selectedNode, lang, setLang }: { selectedNode: AdNode, lang: Language, setLang: (l: Language) => void }) => {
  const getTableDataForNode = (node: AdNode): any[] => {
    if (node.level === 'ad' && node.metrics) {
      return [node.metrics];
    }
    if (node.level === 'project') {
      return node.children?.map(child => child.metrics).filter(Boolean) || [];
    }
    if (node.level === 'campaign') {
      return node.children?.map(child => child.metrics).filter(Boolean) || [];
    }
    if (node.level === 'adGroup') {
      return node.children?.map(child => child.metrics).filter(Boolean) || [];
    }
    return [];
  };

  const getAdsForNode = (node: AdNode): AdNode[] => {
    if (node.level === 'ad') {
      return [node];
    }
    let ads: AdNode[] = [];
    if (node.children) {
      node.children.forEach(child => {
        ads = ads.concat(getAdsForNode(child));
      });
    }
    return ads;
  };

  const tableData = getTableDataForNode(selectedNode);
  const adsData = getAdsForNode(selectedNode);

  return (
    <div className="flex-1 flex flex-col h-full relative bg-[#f5f5f5]">
      {/* Header / Breadcrumb */}
      <div className="px-6 py-3 border-b border-[#f0f0f0] bg-white flex-shrink-0 flex justify-between items-center">
        <div className="flex items-center text-[13px] text-[#666]">
          <span>{t(lang, levelMap[selectedNode.level])}</span>
          <span className="mx-2 text-gray-300">/</span>
          <span className="font-medium text-[#333]">{selectedNode.name}</span>
        </div>
        <button
          onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          className="px-3 py-1 border border-[#d9d9d9] rounded-[4px] text-[13px] text-[#666] hover:text-[#1890ff] hover:border-[#1890ff] transition-colors bg-white"
        >
          {lang === 'zh' ? 'English' : '中文'}
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Read-only Info Card (Only for Project level) */}
        {selectedNode.level === 'project' && (
          <div className="bg-white border border-[#f0f0f0] rounded-[4px] p-4 mb-4">
            <h3 className="text-[14px] font-medium text-[#333] mb-3">{t(lang, 'basicInfo')}</h3>
            <dl className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 text-[13px]">
              <div className="flex flex-col">
                <dt className="text-[#999] mb-0.5">{t(lang, 'projectKpi')}</dt>
                <dd className="text-[#333]">5.00</dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-[#999] mb-0.5">{t(lang, 'countryCpcMax')}</dt>
                <dd className="text-[#333]">$1.20</dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-[#999] mb-0.5">{t(lang, 'countryCpcMin')}</dt>
                <dd className="text-[#333]">$0.15</dd>
              </div>
            </dl>
          </div>
        )}

        {/* Read-only Table */}
        <div className="bg-white border border-[#f0f0f0] rounded-[4px] overflow-hidden mb-4">
          <div className="px-4 py-3 border-b border-[#f0f0f0] flex justify-between items-center">
            <h3 className="text-[14px] font-medium text-[#333]">{t(lang, 'dataPerformance')}</h3>
            <span className="text-[13px] text-[#999]">{t(lang, 'totalRecords', { count: tableData.length })}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#f0f0f0] text-[13px]">
              <thead className="bg-[#fafafa]">
                <tr>
                  <th scope="col" className="px-4 py-2.5 text-left font-medium text-[#666]">
                    {selectedNode.level === 'project' ? t(lang, 'campaignName') : selectedNode.level === 'campaign' ? t(lang, 'adGroupName') : t(lang, 'adName')}
                  </th>
                  <th scope="col" className="px-4 py-2.5 text-right font-medium text-[#666]">{t(lang, 'budget')}</th>
                  <th scope="col" className="px-4 py-2.5 text-right font-medium text-[#666]">{t(lang, 'spend')}</th>
                  <th scope="col" className="px-4 py-2.5 text-right font-medium text-[#666]">{t(lang, 'registrations')}</th>
                  <th scope="col" className="px-4 py-2.5 text-right font-medium text-[#666]">{t(lang, 'cpa')}</th>
                  <th scope="col" className="px-4 py-2.5 text-right font-medium text-[#666]">{t(lang, 'ctr')}</th>
                  <th scope="col" className="px-4 py-2.5 text-right font-medium text-[#666]">{t(lang, 'cpc')}</th>
                  <th scope="col" className="px-4 py-2.5 text-right font-medium text-[#666]">{t(lang, 'cpm')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#f0f0f0]">
                {tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#fafafa] transition-colors">
                    <td className="px-4 py-2.5 whitespace-nowrap text-[#333]">{row.name}</td>
                    <td className="px-4 py-2.5 whitespace-nowrap text-right text-[#666]">{row.budget}</td>
                    <td className="px-4 py-2.5 whitespace-nowrap text-right text-[#666]">{row.spend}</td>
                    <td className="px-4 py-2.5 whitespace-nowrap text-right text-[#666]">{row.registrations}</td>
                    <td className="px-4 py-2.5 whitespace-nowrap text-right text-[#333] font-medium">{row.cpa}</td>
                    <td className="px-4 py-2.5 whitespace-nowrap text-right text-[#666]">{row.ctr}</td>
                    <td className="px-4 py-2.5 whitespace-nowrap text-right text-[#666]">{row.cpc}</td>
                    <td className="px-4 py-2.5 whitespace-nowrap text-right text-[#666]">{row.cpm}</td>
                  </tr>
                ))}
                {tableData.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-[#999] text-[13px]">{t(lang, 'noData')}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Creative Management Section */}
        {selectedNode.level === 'ad' && adsData.length > 0 && (
          <div className="bg-white border border-[#f0f0f0] rounded-[4px] overflow-hidden mb-4">
            <div className="px-4 py-3 border-b border-[#f0f0f0]">
              <h3 className="text-[14px] font-medium text-[#333]">{t(lang, 'creativeManagement')}</h3>
            </div>
            <div className="divide-y divide-[#f0f0f0]">
              {adsData.map((ad) => (
                <div key={ad.id} className="flex flex-col sm:flex-row p-4 gap-4 hover:bg-[#fafafa] transition-colors">
                  {/* Left: Creative Preview */}
                  <div className="w-full sm:w-48 flex-shrink-0">
                    <div className="text-[13px] font-medium text-[#333] mb-2 truncate" title={ad.name}>{ad.name}</div>
                    <div className="aspect-video bg-[#f5f5f5] rounded-[4px] border border-[#e8e8e8] overflow-hidden flex items-center justify-center relative group">
                      {ad.imageUrl ? (
                        <img 
                          src={ad.imageUrl} 
                          alt={ad.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="text-[#999] text-[12px]">{t(lang, 'noData')}</span>
                      )}
                      {/* Hover overlay for preview */}
                      {ad.imageUrl && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                          <span className="text-white text-[12px] px-2 py-1 border border-white/50 rounded-[2px]">{t(lang, 'creativeImage')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Right: Remark Input */}
                  <div className="flex-1 flex flex-col">
                    <label className="block text-[13px] text-[#666] mb-2">{t(lang, 'creativeRemark')}</label>
                    <div className="flex-1 relative">
                      <textarea 
                        className="block w-full h-full border border-[#d9d9d9] rounded-[4px] py-2 px-3 pb-10 focus:outline-none focus:border-[#1890ff] focus:ring-1 focus:ring-[#1890ff] text-[13px] resize-none transition-colors min-h-[80px]" 
                        placeholder={t(lang, 'creativeRemarkPlaceholder')} 
                        defaultValue={ad.remark || ''}
                        key={`remark-${ad.id}`}
                      />
                      <div className="absolute bottom-2 right-2">
                        <button className="px-3 py-1 bg-[#1890ff] text-white text-[12px] rounded-[4px] hover:bg-[#40a9ff] transition-colors focus:outline-none">
                          {t(lang, 'submit')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Editable Form */}
        {selectedNode.level !== 'project' && (
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 bg-white border border-[#f0f0f0] rounded-[4px] p-5">
              <h3 className="text-[14px] font-medium text-[#333] mb-4">
                {t(lang, 'strategyConfig')}
              </h3>
              <div className="max-w-md">
                {selectedNode.level === 'campaign' && (
                  <div>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-[13px] text-[#666]">{t(lang, 'campaignStopThreshold')}</label>
                        <div className="relative">
                          <input type="number" className="block w-full border border-[#d9d9d9] rounded-[4px] py-1.5 px-3 focus:outline-none focus:border-[#1890ff] focus:ring-1 focus:ring-[#1890ff] text-[13px] transition-colors" placeholder={`${t(lang, 'example')}500`} defaultValue="1000" />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-[#999] text-[13px]">$</span>
                          </div>
                        </div>
                        <p className="text-[12px] text-[#999]">{t(lang, 'campaignStopDesc')}</p>
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[13px] text-[#666]">{t(lang, 'ftdConstant')}</label>
                        <div className="relative">
                          <input type="number" step="0.01" className="block w-full border border-[#d9d9d9] rounded-[4px] py-1.5 px-3 focus:outline-none focus:border-[#1890ff] focus:ring-1 focus:ring-[#1890ff] text-[13px] transition-colors" placeholder={`${t(lang, 'example')}0.85`} defaultValue="0.85" />
                        </div>
                        <p className="text-[12px] text-[#999]">{t(lang, 'ftdConstantDesc')}</p>
                      </div>
                    </div>
                    <AdRulesSection title={t(lang, 'globalAdRules')} hasToggle={true} isNested={true} lang={lang} />
                  </div>
                )}
                {selectedNode.level === 'adGroup' && (
                  <div>
                    <AdRulesSection title={t(lang, 'groupAdRules')} hasToggle={true} isNested={true} lang={lang} />
                  </div>
                )}
                {selectedNode.level === 'ad' && (
                  <div className="space-y-5">
                    <AdRulesSection lang={lang} />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-5 border-t border-[#f0f0f0] flex justify-start space-x-3">
                <button className="px-4 py-1.5 border border-transparent rounded-[4px] text-[13px] text-white bg-[#1890ff] hover:bg-[#40a9ff] transition-colors focus:outline-none">
                  {t(lang, 'saveChanges')}
                </button>
                <button className="px-4 py-1.5 border border-[#d9d9d9] rounded-[4px] text-[13px] text-[#333] bg-white hover:text-[#1890ff] hover:border-[#1890ff] transition-colors focus:outline-none">
                  {t(lang, 'cancel')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
