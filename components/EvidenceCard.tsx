
import React from 'react';
import { Evidence } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

interface Props {
  evidence: Evidence;
}

export const EvidenceCard: React.FC<Props> = ({ evidence }) => {
  const renderContent = () => {
    switch (evidence.type) {
      case 'text':
        return <p className="text-slate-300 italic border-l-4 border-yellow-600 pl-4 py-2">{evidence.content}</p>;
      case 'table':
        return (
          <div className="overflow-x-auto">
            <p className="text-sm text-slate-400 mb-2">{evidence.content}</p>
            <table className="w-full text-sm text-left text-slate-300">
              <thead className="bg-slate-800 text-yellow-500 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2 border border-slate-700">X (Independiente)</th>
                  <th className="px-4 py-2 border border-slate-700">Y (Dependiente)</th>
                </tr>
              </thead>
              <tbody>
                {evidence.data?.map((point, i) => (
                  <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="px-4 py-2 border border-slate-700">{point.x}</td>
                    <td className="px-4 py-2 border border-slate-700">{point.y}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'graph':
        return (
          <div className="h-64 w-full mt-4">
             <p className="text-sm text-slate-400 mb-2">{evidence.content}</p>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={evidence.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="x" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  itemStyle={{ color: '#eab308' }}
                />
                <Line type="monotone" dataKey="y" stroke="#eab308" strokeWidth={3} dot={{ r: 6, fill: '#eab308' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 shadow-inner">
      <h3 className="text-yellow-500 font-detective font-bold text-lg mb-4 flex items-center">
        <span className="mr-2">🔎</span> {evidence.title}
      </h3>
      {renderContent()}
    </div>
  );
};
