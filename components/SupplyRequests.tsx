import React from 'react';
import { MOCK_WISHES } from '../constants';
import { CheckCircle2, Clock, XCircle, ShoppingBag } from 'lucide-react';

export const SupplyRequests: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-black/20 rounded-t-[25px] backdrop-blur-[15px] border-t border-white/10 p-5 overflow-y-auto diary-stream">
      <div className="text-[1.1rem] font-bold mb-6 text-center tracking-[2px] text-moon-primary">
        - 适格者补给申请单 -
      </div>

      <div className="space-y-3">
        {MOCK_WISHES.map((wish) => (
          <div key={wish.id} className="bg-card rounded-xl p-4 border border-white/10 flex justify-between items-center group hover:bg-white/5 transition-colors">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-earth-water/20 text-earth-water text-[10px] px-1.5 py-0.5 rounded font-bold">
                    {wish.requester}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${
                    wish.status === 'approved' ? 'border-green-400 text-green-400' : 
                    wish.status === 'rejected' ? 'border-red-400 text-red-400' : 
                    'border-yellow-400 text-yellow-400'
                }`}>
                    {wish.status === 'approved' ? '已批准' : wish.status === 'rejected' ? '已驳回' : '审核中'}
                </span>
              </div>
              <p className="text-sm font-medium">{wish.title}</p>
            </div>

            <div className="flex gap-2 ml-3">
                {/* Simulated Captain Controls (Visual Only) */}
                {wish.status === 'pending' ? (
                    <>
                        <button className="text-green-400 opacity-50 hover:opacity-100">
                            <CheckCircle2 size={20} />
                        </button>
                        <button className="text-red-400 opacity-50 hover:opacity-100">
                            <XCircle size={20} />
                        </button>
                    </>
                ) : wish.status === 'approved' ? (
                     <ShoppingBag size={20} className="text-green-400" />
                ) : (
                     <div className="w-5 h-5 rounded-full border border-red-400/50 flex items-center justify-center">
                         <span className="text-[10px] text-red-400">×</span>
                     </div>
                )}
            </div>
          </div>
        ))}

        {/* Add Button */}
        <button className="w-full py-3 rounded-xl border border-dashed border-white/20 text-text-secondary text-sm hover:bg-white/5 flex items-center justify-center gap-2">
            <span>+ 提交新的补给申请</span>
        </button>
      </div>
    </div>
  );
};