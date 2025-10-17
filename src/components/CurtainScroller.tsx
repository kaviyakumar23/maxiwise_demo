import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  sections: ReactNode[];
  children?: ReactNode;
};

export default function CurtainScroller({ sections, children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // Configure ScrollTrigger for better mobile performance
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      limitCallbacks: true, // Optimize performance on mobile
    });

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Ensure we have refs
      const panels = sectionRefs.current.filter(Boolean);
      if (panels.length < 4 || !containerRef.current) return;

      // Set z-index: earlier panels on top
      gsap.set(panels, {
        zIndex: (i: number, _: Element, all: Element[]) => all.length - i,
      });

      // Animate all panels except the last one
      // Use scrub: 1 instead of true for smoother mobile scrolling
      gsap.to(panels.slice(0, 3), {
        yPercent: -100,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1, // Smoother than true, adds slight delay for smoothness
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          fastScrollEnd: true, // Better performance on fast scrolls
        },
      });

      // Refresh ScrollTrigger on orientation change (mobile)
      const handleOrientationChange = () => {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      };

      window.addEventListener("orientationchange", handleOrientationChange);
      
      // Also refresh on resize with debounce
      let resizeTimer: number | undefined;
      const handleResize = () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          ScrollTrigger.refresh();
        }, 250);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("orientationchange", handleOrientationChange);
        window.removeEventListener("resize", handleResize);
        if (resizeTimer) clearTimeout(resizeTimer);
      };
    }, 200); // Increased delay for mobile

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Wrapper to provide scroll height */}
      <div 
        style={{ 
          position: "relative", 
          height: "400vh",
        }}
      >
        {/* Container - pins at viewport */}
        <div
          ref={containerRef}
          style={{
            position: "relative",
            width: "100%",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          {/* Panels - all absolutely positioned */}
          {sections.slice(0, 4).map((node, i) => (
            <section
              key={i}
              id={`why-maxiwise-${i + 1}`}
              data-header-section
              ref={(el) => {
                sectionRefs.current[i] = el as HTMLDivElement | null;
              }}
              className="panel"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            >
              {node}
            </section>
          ))}
        </div>
      </div>

      {/* Content after curtain effect */}
      {sections.slice(4).map((node, i) => (
        <section key={`after-${i}`}>{node}</section>
      ))}
      {children}
    </>
  );
}
