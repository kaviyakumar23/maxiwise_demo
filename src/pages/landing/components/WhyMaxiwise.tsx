import CurtainScroller from "../../../components/CurtainScroller";
import WhyMaxiwiseCard from "./WhyMaxiwiseCard";

// Import images
import Noise from "../../../assets/images/noise.png"
import Clarity from "../../../assets/images/clarity.png"
import Battle from "../../../assets/images/btm.png"
import BuiltForEveryone from "../../../assets/images/bfe.png";

interface ImageConfig {
    src: string;
    alt: string;
    className?: string;
    containerClassName?: string;
    position?: 'absolute' | 'flex';
}

interface SectionData {
    title: string[];
    description: string[];
    backgroundColor: string;
    titleColor: string;
    descriptionColor: string;
    images: ImageConfig[];
    layoutType: 'absolute' | 'flex';
    containerVariant?: 'standard' | 'centered';
    textContainerClass?: string;
    imageContainerClass?: string;
}

const WhyMaxiwise = () => {
    // Configuration for all 4 sections
    const sectionsData: SectionData[] = [
        {
            // Section 1: The Noise Ends Here (Navy - Absolute layout)
            title: ["The Noise Ends", "Here"],
            description: [
                "Distilling millions of data points to deliver the insights that matter the most  and insights that you can act on instantly."
            ],
            backgroundColor: "bg-navy",
            titleColor: "text-purple",
            descriptionColor: "text-white",
            layoutType: "absolute" as const,
            images: [
                {
                    src: Noise,
                    alt: "Maxiwise mobile screenshot with insights",
                    position: "absolute" as const,
                    containerClassName: "absolute bottom-0 right-[5%] md:right-[8%] lg:right-[10%] xl:right-[12%] z-10",
                    className: "h-[400px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[750px] w-auto object-contain"
                }
            ]
        },
        {
            // Section 2: Clarity over Chaos (Lime - Flex layout)
            title: ["Clarity over", "Chaos"],
            description: [
                "We crunch 7.6Mn data points across market cycles every month so you get the full picture — the right picture — without the clutter of too much data"
            ],
            backgroundColor: "bg-lime",
            titleColor: "text-navy",
            descriptionColor: "text-navy",
            layoutType: "flex" as const,
            imageContainerClass: "items-center",
            images: [
                {
                    src: Clarity,
                    alt: "Consistency Trend Chart Sample",
                    position: "flex" as const,
                    className: "h-[400px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[750px] w-auto object-contain"
                }
            ]
        },
        {
            // Section 3: Battle-tested Methodology (Purple - Absolute layout)
            title: ["Battle-tested", "Methodology"],
            description: [
                "Our proprietary selection & portfolio management system - CARRVA and The Alpha Methodolgy have been battle-tested with India's top family offices for last two decades."
            ],
            backgroundColor: "bg-purple",
            titleColor: "text-navy",
            descriptionColor: "text-navy",
            layoutType: "absolute" as const,
            images: [
                {
                    src: Battle,
                    alt: "CARRVA chart sample",
                    position: "absolute" as const,
                    containerClassName: "absolute bottom-0 right-[5%] md:right-[8%] lg:right-[10%] xl:right-[12%] z-10",
                    className: "h-[400px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[750px] w-auto object-contain"
                }
            ]
        },
        {
            // Section 4: Built For Everyone (Navy - Absolute layout)
            title: ["Built For", "Everyone"],
            description: [
                "Whether you're investing for the first time or refining a seasoned strategy, Maxiwise makes investing clear, contextual, and unintimidating."
            ],
            backgroundColor: "bg-navy",
            titleColor: "text-purple",
            descriptionColor: "text-white",
            layoutType: "absolute" as const,
            images: [
                {
                    src: BuiltForEveryone,
                    alt: "Maxiwise mobile app showing portfolio insights",
                    position: "absolute" as const,
                    containerClassName: "absolute bottom-0 right-[15%] md:right-[8%] lg:right-[10%] xl:right-[12%] z-10",
                    className: "h-[400px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[750px] w-auto object-contain"
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