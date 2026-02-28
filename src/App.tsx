/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { mockData } from './data/mockData';
import { AdNode } from './types';
import { Language } from './i18n';

export default function App() {
  const [selectedNode, setSelectedNode] = useState<AdNode>(mockData[0]);
  const [lang, setLang] = useState<Language>('zh');

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden text-gray-800 font-sans">
      <Sidebar data={mockData} selectedNode={selectedNode} onSelect={setSelectedNode} lang={lang} />
      <div className="flex-1 flex flex-col relative min-w-0 bg-white">
        <MainContent selectedNode={selectedNode} lang={lang} setLang={setLang} />
      </div>
    </div>
  );
}
