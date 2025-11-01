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
    images,
    layoutType,
    containerVariant = 'standard',
    textContainerClass = '',
    imageContainerClass = ''
}: WhyMaxiwiseCardProps) => {
    
    if (layoutType === 'absolute') {
        return (
            <div className={`${backgroundColor} w-full h-full relative overflow-hidden`}>
                {/* Main content container - positioned to start below center */}
                <div className="absolute left-0 lg:top-[45%] top-[15%] px-6 sm:px-10 md:px-14 lg:px-20 xl:px-22 z-20 w-full lg:w-1/2 max-w-2xl">
                    <div className={`font-outfit font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl ${titleColor} leading-tight mb-4 sm:mb-5 md:mb-6`}>
                        {title.map((line, index) => (
                            <h1 key={index} className="mb-0">{line}</h1>
                        ))}
                    </div>
                    <div className={`font-outfit font-normal text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl ${descriptionColor} mb-4 sm:mb-5 md:mb-6 leading-relaxed max-w-lg`}>
                        <p dangerouslySetInnerHTML={{ __html: description.join(' ') }} />
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
                <div className={`lg:w-1/2 mb-8 lg:mb-0 xl:mt-12 ${layoutType === 'flex' && images.length > 0 ? 'relative z-10' : ''} ${textContainerClass}`}>
                    <div className={`${titleColor} font-outfit font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-4 sm:mb-6`}>
                        {title.map((line, index) => (
                            <h1 key={index}>{line}</h1>
                        ))}
                    </div>
                    <div className={`${descriptionColor} font-outfit font-normal text-sm sm:text-lg lg:text-xl mb-6 sm:mb-8 ${containerVariant === 'centered' ? 'leading-relaxed' : ''} max-w-lg`}>
                        <p dangerouslySetInnerHTML={{ __html: description.join(' ') }} />
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

