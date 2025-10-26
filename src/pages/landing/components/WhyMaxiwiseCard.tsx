import GetStarted from "../../../components/common/GetStarted"

interface ImageConfig {
    src: string;
    alt: string;
    className?: string;
    containerClassName?: string;
    position?: 'absolute' | 'flex';
}

interface WhyMaxiwiseCardProps {
    title: string[];
    description: string[];
    backgroundColor: string;
    titleColor: string;
    descriptionColor: string;
    buttonColor?: 'purple' | 'lime' | 'indigo' | 'light-purple';
    buttonClassName?: string;
    buttonText?: string; // Dynamic button text for each card
    images: ImageConfig[];
    layoutType: 'absolute' | 'flex';
    containerVariant?: 'standard' | 'centered'; // For different flex layouts
    textContainerClass?: string; // Custom classes for text container
    imageContainerClass?: string; // Custom classes for image container
}

const WhyMaxiwiseCard = ({
    title,
    description,
    backgroundColor,
    titleColor,
    descriptionColor,
    buttonColor,
    buttonClassName,
    buttonText = 'Learn More',
    images,
    layoutType,
    containerVariant = 'standard',
    textContainerClass = '',
    imageContainerClass = ''
}: WhyMaxiwiseCardProps) => {
    
    if (layoutType === 'absolute') {
        return (
            <div className={`${backgroundColor} w-full h-full relative overflow-hidden`}>
                {/* Main content container */}
                <div className="w-full h-full flex flex-col lg:flex-row">
                    {/* Left content section - responsive layout */}
                    <div className="h-1/2 lg:h-full px-4 sm:px-8 lg:pl-16 z-20 flex flex-col justify-center">
                        <div className={`font-outfit font-medium text-4xl sm:text-5xl lg:text-6xl xl:text-7xl ${titleColor} leading-tight mb-6 lg:mb-8`}>
                            {title.map((line, index) => (
                                <h1 key={index} className={index > 0 ? "mb-0" : "mb-2"}>{line}</h1>
                            ))}
                        </div>
                        <div className={`font-outfit font-normal text-sm sm:text-lg lg:text-xl ${descriptionColor} mb-6 lg:mb-8 leading-relaxed max-w-lg`}>
                            <p dangerouslySetInnerHTML={{ __html: description.join(' ') }} />
                        </div>
                        <div>
                        <GetStarted 
                            color={buttonColor}
                            className={buttonClassName}
                        >
                            {buttonText}
                        </GetStarted>
                        </div>
                    </div>
                    
                    {/* Right side - empty for absolute positioning on desktop, graphics container on mobile */}
                    <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative">
                    </div>
                </div>
                
                {/* Absolutely positioned images */}
                {images.map((image, index) => (
                    <div key={index} className={image.containerClassName}>
                        <img 
                            src={image.src}
                            alt={image.alt}
                            className={image.className}
                        />
                    </div>
                ))}
            </div>
        );
    }
    
    // Flex layout
    const containerClass = containerVariant === 'centered' 
        ? "max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16"
        : "container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between";
    
    const outerContainerClass = containerVariant === 'centered'
        ? `${backgroundColor} w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 ${layoutType === 'flex' ? 'relative overflow-hidden' : ''}`
        : `${backgroundColor} w-full h-full flex items-center ${layoutType === 'flex' ? 'relative overflow-hidden' : ''}`;
    
    return (
        <div className={outerContainerClass}>
            <div className={containerClass}>
                {/* Left Content */}
                <div className={`lg:w-1/2 mb-8 lg:mb-0 ${layoutType === 'flex' && images.length > 0 ? 'relative z-10' : ''} ${textContainerClass}`}>
                    <div className={`${titleColor} font-outfit font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-4 sm:mb-6`}>
                        {title.map((line, index) => (
                            <h1 key={index}>{line}</h1>
                        ))}
                    </div>
                    <div className={`${descriptionColor} font-outfit font-normal text-sm sm:text-lg lg:text-xl mb-6 sm:mb-8 ${containerVariant === 'centered' ? 'leading-relaxed' : ''} max-w-md`}>
                        <p dangerouslySetInnerHTML={{ __html: description.join(' ') }} />
                    </div>
                    <div>
                        <GetStarted 
                            color={buttonColor}
                            className={buttonClassName}
                        >
                            {buttonText}
                        </GetStarted>
                    </div>
                </div>
                
                {/* Right Content - Image */}
                {images.length > 0 && images[0].position === 'flex' && (
                    <div className={`lg:w-1/2 flex justify-center ${containerVariant === 'centered' ? 'items-center' : 'lg:justify-end'} w-full ${imageContainerClass}`}>
                        <img 
                            src={images[0].src}
                            alt={images[0].alt}
                            className={images[0].className}
                        />
                    </div>
                )}
            </div>
            
            {/* Absolutely positioned images in flex layout */}
            {images.map((image, index) => (
                image.position === 'absolute' && (
                    <div key={index} className={image.containerClassName}>
                        <img 
                            src={image.src}
                            alt={image.alt}
                            className={image.className}
                        />
                    </div>
                )
            ))}
        </div>
    );
};

export default WhyMaxiwiseCard;

