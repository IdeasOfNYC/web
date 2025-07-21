import { useContext, useRef, useEffect } from 'react';
import { IdeaContext } from '~/context/IdeaContext';
import type { Borough } from '~/types';

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const IMPACT_AREAS = [
  { value: "Social Services & Accessibility", label: "Social Services & Accessibility" },
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
  "Children (0-17)", "Young Adults (18-24)", "Adults (25-64)", "Seniors (65+)",
  "Families", "Students", "Workers", "Residents", "Visitors", "Everyone"
];

export const FilterPopup = ({ isOpen, onClose }: FilterPopupProps) => {
  const { ideaFilter, setIdeaFilter } = useContext(IdeaContext);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (dropdownRef.current?.contains(target)) return;
      if (document.getElementById("filter-toggle-button")?.contains(target)) return;
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

  const handleImpactAreaChange = (impactArea: string, checked: boolean) => {
    if (checked) {
      setIdeaFilter({
        ...ideaFilter,
        impactArea: [...ideaFilter.impactArea, impactArea]
      });
    } else {
      setIdeaFilter({
        ...ideaFilter,
        impactArea: ideaFilter.impactArea.filter(ia => ia !== impactArea)
      });
    }
  };

  const handleAudienceChange = (audience: string, checked: boolean) => {
    if (checked) {
      setIdeaFilter({
        ...ideaFilter,
        audience: [...ideaFilter.audience, audience]
      });
    } else {
      setIdeaFilter({
        ...ideaFilter,
        audience: ideaFilter.audience.filter(a => a !== audience)
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
          value={ideaFilter.borough || ''}
          onChange={(e) =>
            setIdeaFilter({ ...ideaFilter, borough: e.target.value as Borough || null })
          }
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
                checked={ideaFilter.stage === value}
                onChange={(e) =>
                  setIdeaFilter({ ...ideaFilter, stage: e.target.value as any })
                }
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
              checked={ideaFilter.impactArea.length === 0}
              onChange={(e) => {
                if (e.target.checked) {
                  setIdeaFilter({ ...ideaFilter, impactArea: [] });
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
                checked={ideaFilter.impactArea.includes(value)}
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
              checked={ideaFilter.audience.length === 0}
              onChange={(e) => {
                if (e.target.checked) {
                  setIdeaFilter({ ...ideaFilter, audience: [] });
                }
              }}
              className="mr-2"
            />
            NONE (All Audiences)
          </label>
          {AUDIENCES.map((audience) => (
            <label key={audience} className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={ideaFilter.audience.includes(audience)}
                onChange={(e) => handleAudienceChange(audience, e.target.checked)}
                className="mr-2"
              />
              {audience}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
