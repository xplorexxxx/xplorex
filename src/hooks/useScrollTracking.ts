import { useEffect, useRef } from 'react';

interface ScrollTrackingOptions {
  sectionIds: string[];
  threshold?: number;
}

export function useScrollTracking({ sectionIds, threshold = 0.3 }: ScrollTrackingOptions) {
  const trackedSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId && !trackedSections.current.has(sectionId)) {
              trackedSections.current.add(sectionId);

              if (typeof window !== 'undefined' && (window as any).clarity) {
                (window as any).clarity('set', 'section_viewed', sectionId);
              }

              console.debug(`[Scroll Tracking] Section vue: ${sectionId}`);
            }
          }
        });
      },
      { threshold }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds, threshold]);
}
