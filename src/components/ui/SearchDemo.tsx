import React from 'react';
import Search from '../common/Search';

const SearchDemo: React.FC = () => {
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Design System</h1>
        <p className="text-gray-600 mb-8">
          A comprehensive search component with configurable text, size, and styling options.
        </p>

        {/* Default Search */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Default Search</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <Search />
          </div>
        </div>

        {/* Size Variants */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Size Variants</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Extra Small (xs)</h3>
              <Search 
                size="xs" 
                placeholder="Search xs..." 
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Small (sm)</h3>
              <Search 
                size="sm" 
                placeholder="Search small..." 
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Medium (md)</h3>
              <Search 
                size="md" 
                placeholder="Search medium..." 
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Large (lg) - Default</h3>
              <Search 
                size="lg" 
                placeholder="Search large..." 
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Extra Large (xl)</h3>
              <Search 
                size="xl" 
                placeholder="Search extra large..." 
              />
            </div>
          </div>
        </div>

        {/* Custom Placeholder Text */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Custom Placeholder Text</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
            <Search placeholder="Search for stocks, ETFs, and more..." />
            <Search placeholder="Find your next investment..." />
            <Search placeholder="Search by company name or ticker..." />
            <Search placeholder="What are you looking for?" />
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Keyboard Shortcuts</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Default (⌘K)</h3>
              <Search keyboardShortcut={['⌘', 'K']} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Ctrl+K</h3>
              <Search keyboardShortcut={['Ctrl', 'K']} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">No Shortcut</h3>
              <Search showShortcut={false} />
            </div>
          </div>
        </div>

        {/* Custom Colors */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Custom Colors</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Default (#F6F8FE)</h3>
              <Search backgroundColor="#F6F8FE" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Light Blue</h3>
              <Search backgroundColor="#EBF8FF" textColor="#1E40AF" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Light Purple</h3>
              <Search backgroundColor="#F3E8FF" textColor="#7C3AED" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Light Green</h3>
              <Search backgroundColor="#ECFDF5" textColor="#059669" />
            </div>
          </div>
        </div>

        {/* Variants */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Input Variants</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Default</h3>
              <Search variant="default" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Filled</h3>
              <Search variant="filled" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Outlined</h3>
              <Search variant="outlined" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Flushed</h3>
              <Search variant="flushed" />
            </div>
          </div>
        </div>

        {/* Rounded Variants */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Rounded Variants</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">None</h3>
              <Search rounded="none" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Small</h3>
              <Search rounded="sm" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Medium</h3>
              <Search rounded="md" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Large</h3>
              <Search rounded="lg" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Extra Large</h3>
              <Search rounded="xl" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Full (Default)</h3>
              <Search rounded="full" />
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Usage Examples</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Header Search</h3>
                <Search 
                  size="sm" 
                  placeholder="Quick search..." 
                  className="max-w-md"
                />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Main Search</h3>
                <Search 
                  size="lg" 
                  placeholder="Search mutual funds, ETFs, and stocks..." 
                />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Mobile Search</h3>
                <Search 
                  size="md" 
                  placeholder="Search..." 
                  showShortcut={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDemo;
