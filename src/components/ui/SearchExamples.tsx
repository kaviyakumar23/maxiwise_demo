import React from 'react';
import Search from '../common/Search';

// Example usage of the Search component with different configurations
const SearchExamples: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-gray-900">Search Component Examples</h2>
      
      {/* Basic Usage */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Basic Usage</h3>
        <Search />
      </div>

      {/* Custom Placeholder */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Custom Placeholder</h3>
        <Search placeholder="Search for stocks, ETFs, and mutual funds..." />
      </div>

      {/* Different Sizes */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Different Sizes</h3>
        <div className="space-y-3">
          <Search size="xs" placeholder="Extra small search..." />
          <Search size="sm" placeholder="Small search..." />
          <Search size="md" placeholder="Medium search..." />
          <Search size="lg" placeholder="Large search..." />
          <Search size="xl" placeholder="Extra large search..." />
        </div>
      </div>

      {/* Custom Colors */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Custom Colors</h3>
        <div className="space-y-3">
          <Search backgroundColor="#F6F8FE" placeholder="Default color (#F6F8FE)" />
          <Search backgroundColor="#EBF8FF" textColor="#1E40AF" placeholder="Blue theme" />
          <Search backgroundColor="#F3E8FF" textColor="#7C3AED" placeholder="Purple theme" />
        </div>
      </div>

      {/* Without Keyboard Shortcut */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Without Keyboard Shortcut</h3>
        <Search showShortcut={false} placeholder="No keyboard shortcut..." />
      </div>

      {/* Custom Keyboard Shortcut */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Custom Keyboard Shortcut</h3>
        <Search keyboardShortcut={['Ctrl', 'K']} placeholder="Custom shortcut (Ctrl+K)..." />
      </div>

      {/* Different Variants */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Different Variants</h3>
        <div className="space-y-3">
          <Search variant="default" placeholder="Default variant" />
          <Search variant="filled" placeholder="Filled variant" />
          <Search variant="outlined" placeholder="Outlined variant" />
          <Search variant="flushed" placeholder="Flushed variant" />
        </div>
      </div>

      {/* Different Rounded Styles */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">Different Rounded Styles</h3>
        <div className="space-y-3">
          <Search rounded="none" placeholder="No rounding" />
          <Search rounded="sm" placeholder="Small rounding" />
          <Search rounded="md" placeholder="Medium rounding" />
          <Search rounded="lg" placeholder="Large rounding" />
          <Search rounded="xl" placeholder="Extra large rounding" />
          <Search rounded="full" placeholder="Full rounding (default)" />
        </div>
      </div>
    </div>
  );
};

export default SearchExamples;
