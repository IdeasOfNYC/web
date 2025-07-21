import { useState, useContext, useRef, useEffect } from 'react';
import { IdeaContext } from '~/context/IdeaContext';
import type { IdeaFilter, Borough } from '~/types';

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const IMPACT_AREAS = [
  { value: "Social Services & Accessiblity", label: "Social Services & Accessibility" },
  { value: "Education", label: "Education" },
  { value: "Health & Wellbeing", label: "Health & Wellbeing" },
  { value: "Workforce Development", label: "Workforce Development" },
  { value: "Environment & Public Space", label: "Environment & Public Space" },
  { value: "Public Safety", label: "Public Safety" },
  { value: "Arts & Culture", label: "Arts & Culture" },
  { value: "Civic Engagement", label: "Civic Engagement" },
  { value: "Other", label: "Other" }
];

const AUDIENCES = [
  "Children (0-17)",
  "Young Adults (18-24)", 
  "Adults (25-64)",
  "Seniors (65+)",
  "Families",
  "Students",
  "Workers",
  "Residents",
  "Visitors",
  "Everyone"
];

export const FilterPopup = ({ isOpen, onClose }: FilterPopupProps) => {
  const { ideaFilter, setIdeaFilter } = useContext(IdeaContext);
  const [localFilter, setLocalFilter] = useState<IdeaFilter>(ideaFilter);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      dropdownRef.current &&
      dropdownRef.current.contains(target)
    ) return;

    const filterButton = document.getElementById("filter-toggle-button");
    if (filterButton && filterButton.contains(target)) return;

    onClose();
  };

  if (isOpen) {
    document.addEventListener('mousedown', handleClickOutside);
  }

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleApply = () => {
    setIdeaFilter(localFilter);
    onClose();
  };

  const handleImpactAreaChange = (impactArea: string, checked: boolean) => {
    if (checked) {
      setLocalFilter({
        ...localFilter,
        impactArea: [...localFilter.impactArea, impactArea]
      });
    } else {
      setLocalFilter({
        ...localFilter,
        impactArea: localFilter.impactArea.filter(ia => ia !== impactArea)
      });
    }
  };

  const handleAudienceChange = (audience: string, checked: boolean) => {
    if (checked) {
      setLocalFilter({
        ...localFilter,
        audience: [...localFilter.audience, audience]
      });
    } else {
      setLocalFilter({
        ...localFilter,
        audience: localFilter.audience.filter(a => a !== audience)
      });
    }
  };

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-full right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg p-4 z-50 w-80"
    >
      <h3 className="text-sm font-semibold mb-3">Filter Options</h3>
      
      {/* Borough */}
      <div className="mb-4">
        <label className="block text-xs font-medium mb-2">Borough:</label>
        <select
          value={localFilter.borough || ''}
          onChange={(e) => setLocalFilter({...localFilter, borough: e.target.value as Borough || null})}
          className="w-full p-2 text-sm border rounded"
        >
          <option value="">All Boroughs</option>
          <option value="brooklyn">Brooklyn</option>
          <option value="manhattan">Manhattan</option>
          <option value="bronx">Bronx</option>
          <option value="queens">Queens</option>
          <option value="staten island">Staten Island</option>
        </select>
      </div>

      {/* Stage */}
      <div className="mb-4">
        <label className="block text-xs font-medium mb-2">Stage:</label>
        <div className="space-y-1">
          {[
            { value: 'submitted', label: 'Submitted' },
            { value: 'BA', label: 'Ballot Action' },
            { value: 'ballot', label: 'Finalist' }
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center text-sm">
              <input
                type="radio"
                name="stage"
                value={value}
                checked={localFilter.stage === value}
                onChange={(e) => setLocalFilter({...localFilter, stage: e.target.value as any})}
                className="mr-2"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Impact Area */}
      <div className="mb-4">
        <label className="block text-xs font-medium mb-2">Impact Area:</label>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={localFilter.impactArea.length === 0}
              onChange={(e) => {
                if (e.target.checked) {
                  setLocalFilter({...localFilter, impactArea: []});
                }
              }}
              className="mr-2"
            />
            NONE (All Impact Areas)
          </label>
          {IMPACT_AREAS.map(({ value, label }) => (
            <label key={value} className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={localFilter.impactArea.includes(value)}
                onChange={(e) => handleImpactAreaChange(value, e.target.checked)}
                className="mr-2"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Audience */}
      <div className="mb-4">
        <label className="block text-xs font-medium mb-2">Audience:</label>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={localFilter.audience.length === 0}
              onChange={(e) => {
                if (e.target.checked) {
                  setLocalFilter({...localFilter, audience: []});
                }
              }}
              className="mr-2"
            />
            NONE (All Audiences)
          </label>
          {AUDIENCES.map(audience => (
            <label key={audience} className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={localFilter.audience.includes(audience)}
                onChange={(e) => handleAudienceChange(audience, e.target.checked)}
                className="mr-2"
              />
              {audience}
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-2">
        <button 
          onClick={handleApply} 
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          Apply
        </button>
        <button 
          onClick={onClose} 
          className="px-3 py-1 border rounded text-sm hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};