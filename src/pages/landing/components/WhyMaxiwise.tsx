import CurtainScroller from "../../../components/CurtainScroller";
import WhyMaxiwiseCard from "./WhyMaxiwiseCard";

// Import images
import A_Element from "../../../assets/images/3D_A.png"
import Blocks from "../../../assets/images/Blocks.png"
import Puzzle from "../../../assets/images/Puzzle.png"
import Upscale from "../../../assets/images/Upscale.png"
import Trust from "../../../assets/images/Trust.png"

const WhyMaxiwise = () => {
    // Configuration for all 4 sections
    const sectionsData = [
        {
            // Section 1: Built for Everyone (Navy - Absolute layout)
            title: ["Built for", "Everyone"],
            description: [
                "Whether you're a first-time investor or an evolved one, Maxiwise makes complex decisions simple."
            ],
            backgroundColor: "bg-navy",
            titleColor: "text-purple",
            descriptionColor: "text-white",
            buttonText: "Why Maxiwise",
            buttonClassName: "font-medium rounded-full",
            layoutType: "absolute" as const,
            images: [
                {
                    src: Blocks,
                    alt: "3D Blocks",
                    position: "absolute" as const,
                    containerClassName: "absolute bottom-0 right-0 z-5 w-[450px] sm:w-[550px] md:w-[650px] lg:w-3/4",
                    className: "w-full h-full object-contain opacity-90"
                },
                {
                    src: A_Element,
                    alt: "3D A Element",
                    position: "absolute" as const,
                    containerClassName: "absolute bottom-[25%] left-[5%] sm:left-[10%] lg:top-[10%] lg:left-[35%] z-15",
                    className: "w-auto h-[150px] sm:h-[200px] lg:h-[450px] object-contain"
                }
            ]
        },
        {
            // Section 2: Clarity over Chaos (Lime - Flex layout)
            title: ["Clarity over", "Chaos"],
            description: [
                "We decode 1.2 lakh+ data points and 20+ financial metrics into insights that actually matter."
            ],
            backgroundColor: "bg-lime",
            titleColor: "text-navy",
            descriptionColor: "text-navy",
            buttonColor: "indigo" as const,
            buttonClassName: "font-medium rounded-full",
            buttonText: "The Engine",
            layoutType: "flex" as const,
            images: [
                {
                    src: Puzzle,
                    alt: "Puzzle pieces fitting together representing clarity over chaos",
                    position: "flex" as const,
                    className: "max-w-full h-auto w-[450px] sm:w-[500px] md:w-[600px] lg:w-full"
                }
            ]
        },
        {
            // Section 3: Guided by Experts (Purple - Flex layout with absolute image)
            title: ["The Power of Pros"],
            description: [
"Proprietary methodologies refined over decades and battle-tested with India's top family offices."
            ],
            backgroundColor: "bg-purple",
            titleColor: "text-navy",
            descriptionColor: "text-navy",
            buttonColor: "indigo" as const,
            buttonClassName: "font-medium rounded-full text-purple",
            buttonText: "The Pedigree",
            layoutType: "flex" as const,
            images: [
                {
                    src: Upscale,
                    alt: "Upscale",
                    position: "absolute" as const,
                    containerClassName: "absolute bottom-0 -right-10 w-[85%] sm:w-[75%] md:w-[70%] lg:w-[55%] xl:w-[50%]",
                    className: "w-full h-auto"
                }
            ]
        },
        {
            // Section 4: Decisions You Can Trust (Navy - Flex layout - Centered variant)
            title: ["Insights You", "Can Trust"],
            description: [
                "No noise, no hype—just transparency, integrity, and insights you can act on."
            ],
            backgroundColor: "bg-navy",
            titleColor: "text-purple",
            descriptionColor: "text-white",
            buttonClassName: "text-black rounded-full",
            buttonText: "Get Started",
            layoutType: "flex" as const,
            containerVariant: "centered" as const,
            textContainerClass: "flex-1 max-w-2xl lg:mt-32",
            imageContainerClass: "flex-1 lg:-mt-16",
            images: [
                {
                    src: Trust,
                    alt: "Trust",
                    position: "flex" as const,
                    className: "w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] xl:w-[652.55px] xl:h-[652.55px] object-contain"
                }
            ]
        }
    ];

    return (
        <div id="about">
            <CurtainScroller
                sections={sectionsData.map((sectionData, index) => (
                    <WhyMaxiwiseCard
                        key={`section-${index}`}
                        title={sectionData.title}
                        description={sectionData.description}
                        backgroundColor={sectionData.backgroundColor}
                        titleColor={sectionData.titleColor}
                        descriptionColor={sectionData.descriptionColor}
                        buttonColor={sectionData.buttonColor}
                        buttonClassName={sectionData.buttonClassName}
                        buttonText={sectionData.buttonText}
                        images={sectionData.images}
                        layoutType={sectionData.layoutType}
                        containerVariant={sectionData.containerVariant}
                        textContainerClass={sectionData.textContainerClass}
                        imageContainerClass={sectionData.imageContainerClass}
                    />
                ))}
            />
        </div>
    );
};

export default WhyMaxiwise;