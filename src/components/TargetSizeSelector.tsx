import React, { useState, useEffect } from 'react';
import { TargetSizePresetId, TARGET_PRESETS } from '../types';
import { KB, MB, formatBytes } from '../lib/fileUtils';
import { Check, Settings2, Info } from 'lucide-react';

interface TargetSizeSelectorProps {
  selectedPresetId: TargetSizePresetId;
  onSelectPreset: (presetId: TargetSizePresetId, customBytes?: number) => void;
  originalSizeBytes?: number;
  disabled?: boolean;
}

export const TargetSizeSelector: React.FC<TargetSizeSelectorProps> = ({
  selectedPresetId,
  onSelectPreset,
  originalSizeBytes,
  disabled = false
}) => {
  const [customValue, setCustomValue] = useState<number>(300);
  const [customUnit, setCustomUnit] = useState<'KB' | 'MB'>('KB');
  const [customValidationWarning, setCustomValidationWarning] = useState<string | null>(null);

  // Calcular bytes personalizados atuais
  const calculatedCustomBytes = customUnit === 'KB' ? customValue * KB : customValue * MB;

  // Atualizar quando valores mudarem
  useEffect(() => {
    if (selectedPresetId === 'custom') {
      if (!customValue || isNaN(customValue) || customValue <= 0) {
        setCustomValidationWarning('Informe um valor numérico válido.');
      } else if (customUnit === 'KB' && customValue < 20) {
        setCustomValidationWarning('O limite mínimo seguro é de 20 KB.');
      } else if (customUnit === 'MB' && customValue > 50) {
        setCustomValidationWarning('O limite máximo suportado é de 50 MB.');
      } else {
        setCustomValidationWarning(null);
        onSelectPreset('custom', calculatedCustomBytes);
      }
    }
  }, [customValue, customUnit, selectedPresetId]);

  const getEffectiveTargetBytes = (): number => {
    if (selectedPresetId === 'custom') {
      return calculatedCustomBytes;
    }
    const preset = TARGET_PRESETS.find((p) => p.id === selectedPresetId);
    return preset ? preset.bytes : 500 * KB;
  };

  const currentTargetBytes = getEffectiveTargetBytes();

  return (
    <div className="w-full bg-slate-50/70 border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Qual tamanho você precisa?
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            O arquivo final respeitará este valor como teto máximo absoluto.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold self-start sm:self-center">
          <span>Alvo máximo: {formatBytes(currentTargetBytes)}</span>
          <span className="text-blue-500 font-normal">({currentTargetBytes.toLocaleString('pt-BR')} bytes)</span>
        </div>
      </div>

      {/* Grid de opções pré-definidas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3">
        {TARGET_PRESETS.map((preset) => {
          const isSelected = selectedPresetId === preset.id;
          const isLargerThanOriginal = originalSizeBytes && preset.bytes >= originalSizeBytes && preset.id !== 'custom';

          return (
            <button
              key={preset.id}
              type="button"
              disabled={disabled}
              onClick={() => {
                if (preset.id === 'custom') {
                  onSelectPreset('custom', calculatedCustomBytes);
                } else {
                  onSelectPreset(preset.id, preset.bytes);
                }
              }}
              className={`relative flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm ring-2 ring-blue-500/30'
                  : 'bg-white border-slate-200 hover:border-blue-400 text-slate-800 hover:bg-blue-50/30'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center justify-center gap-1.5 w-full">
                {preset.id === 'custom' ? (
                  <Settings2 className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                ) : null}
                <span className="text-base sm:text-lg font-extrabold tracking-tight">
                  {preset.label}
                </span>
                {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
              </div>

              <span
                className={`text-[11px] mt-1 line-clamp-1 ${
                  isSelected ? 'text-blue-100 font-medium' : 'text-slate-500'
                }`}
                title={preset.description}
              >
                {preset.id === 'custom' ? 'Ajuste livre' : `Até ${preset.label}`}
              </span>

              {isLargerThanOriginal ? (
                <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-blue-200' : 'text-amber-600'}`}>
                  (Arquivo menor)
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Painel de ajuste personalizado */}
      {selectedPresetId === 'custom' && (
        <div className="mt-4 pt-4 border-t border-slate-200 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">
              Definir tamanho máximo personalizado:
            </label>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min="20"
                max="50000"
                step="10"
                disabled={disabled}
                value={customValue}
                onChange={(e) => setCustomValue(parseFloat(e.target.value) || 0)}
                className="w-28 px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-bold text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-slate-100">
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => setCustomUnit('KB')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                    customUnit === 'KB'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  KB
                </button>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => setCustomUnit('MB')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                    customUnit === 'MB'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  MB
                </button>
              </div>

              <span className="text-xs text-slate-500 font-medium">
                = {calculatedCustomBytes.toLocaleString('pt-BR')} bytes
              </span>
            </div>
          </div>

          {customValidationWarning && (
            <p className="mt-2 text-xs text-rose-600 font-semibold flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              {customValidationWarning}
            </p>
          )}
        </div>
      )}

      {/* Nota explicativa de cálculo */}
      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>
          Cálculo exato em base binária: 1 KB = 1.024 bytes • 1 MB = 1.048.576 bytes. O resultado nunca ultrapassará o limite escolhido.
        </span>
      </div>
    </div>
  );
};
