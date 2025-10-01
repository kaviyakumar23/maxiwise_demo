import { useState } from 'react';
import Button from './Button';
import Input from './Input';
import { SearchIcon, EyeIcon, EyeOffIcon, MailIcon, UserIcon, LockIcon, HeartIcon, StarIcon } from './icons';

const ComponentDemo = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Design System Components</h1>
        <p className="text-gray-600">Production-ready Button and Input components</p>
      </div>

      {/* Button Examples */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900">Button Component</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" color="purple">Primary</Button>
              <Button variant="secondary" color="purple">Secondary</Button>
              <Button variant="outline" color="purple">Outline</Button>
              <Button variant="ghost" color="purple">Ghost</Button>
              <Button variant="link" color="purple">Link</Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Colors (Maxiwise Design)</h3>
            <div className="flex flex-wrap gap-4">
              <Button color="purple">Get Started</Button>
              <Button color="lime">View All (10)</Button>
              <Button color="indigo">Continue</Button>
              <Button color="light-purple" disabled>Submit</Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Outline Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" color="purple">Why Maxiwise</Button>
              <Button variant="outline" color="lime">Add to Watchlist</Button>
              <Button variant="outline" color="indigo">Create Account</Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Full Width Examples</h3>
            <div className="space-y-4 max-w-md">
              <Button color="purple" fullWidth>Continue</Button>
              <Button color="lime" fullWidth>Add to Watchlist</Button>
              <Button color="light-purple" fullWidth disabled>Submit</Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">With Icons</h3>
            <div className="flex flex-wrap gap-4">
              <Button leftIcon={<HeartIcon />}>With Left Icon</Button>
              <Button rightIcon={<StarIcon />}>With Right Icon</Button>
              <Button leftIcon={<HeartIcon />} rightIcon={<StarIcon />}>Both Icons</Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">States</h3>
            <div className="flex flex-wrap gap-4">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button fullWidth>Full Width</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Input Examples */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900">Input Component</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Basic Examples</h3>
            <div className="space-y-4 max-w-md">
              <Input 
                placeholder="Search mutual funds..." 
                leftIcon={<SearchIcon />}
                keyboardShortcut={['⌘', 'K']}
              />
              <Input 
                label="Email Address"
                placeholder="Enter your email"
                leftIcon={<MailIcon />}
                isRequired
              />
              <Input 
                label="Full Name"
                placeholder="Enter your full name"
                leftIcon={<UserIcon />}
                helperText="This will be displayed on your profile"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Password Input</h3>
            <div className="max-w-md">
              <Input 
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Enter your password"
                leftIcon={<LockIcon />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="hover:text-gray-700"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                }
                isRequired
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Variants</h3>
            <div className="space-y-4 max-w-md">
              <Input variant="default" placeholder="Default variant" />
              <Input variant="filled" placeholder="Filled variant" />
              <Input variant="outlined" placeholder="Outlined variant" />
              <Input variant="flushed" placeholder="Flushed variant" />
              <Input variant="unstyled" placeholder="Unstyled variant" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Sizes</h3>
            <div className="space-y-4 max-w-md">
              <Input size="xs" placeholder="Extra small" />
              <Input size="sm" placeholder="Small" />
              <Input size="md" placeholder="Medium" />
              <Input size="lg" placeholder="Large" />
              <Input size="xl" placeholder="Extra large" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Rounded Options</h3>
            <div className="space-y-4 max-w-md">
              <Input rounded="none" placeholder="No rounded corners" />
              <Input rounded="sm" placeholder="Small rounded" />
              <Input rounded="md" placeholder="Medium rounded" />
              <Input rounded="lg" placeholder="Large rounded" />
              <Input rounded="xl" placeholder="Extra large rounded" />
              <Input rounded="full" placeholder="Fully rounded" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">States</h3>
            <div className="space-y-4 max-w-md">
              <Input 
                placeholder="Valid input"
                isValid
                helperText="This looks good!"
              />
              <Input 
                placeholder="Invalid input"
                isInvalid
                errorMessage="This field is required"
              />
              <Input 
                placeholder="Loading input"
                isLoading
              />
              <Input 
                placeholder="Disabled input"
                disabled
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Advanced Search Example</h3>
            <div className="max-w-2xl">
              <Input 
                size="lg"
                placeholder="Search mutual funds..."
                leftIcon={<SearchIcon />}
                keyboardShortcut={['⌘', 'K']}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                rightElement={
                  searchValue && (
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => setSearchValue('')}
                    >
                      Clear
                    </Button>
                  )
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Usage Examples</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Component Properties</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Button Props:</strong> variant, size, color, fullWidth, loading, leftIcon, rightIcon, disabled</p>
            <p><strong>Input Props:</strong> variant, size, leftIcon, rightIcon, leftElement, rightElement, isInvalid, isValid, isLoading, label, isRequired, errorMessage, helperText, keyboardShortcut, rounded</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComponentDemo;
