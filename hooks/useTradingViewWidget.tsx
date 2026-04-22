'use client'
import React, { useEffect, useRef } from 'react';

const useTradingViewWidget = (scriptUrl: string, config: Record<string, unknown>, height=600) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(
        () => {
            const node = containerRef.current;
            if (!node) return;
            if (node.dataset.loaded) return;
            node.innerHTML = `<div class="tradingview-widget-container__widget" style="width: 100%; height: ${height}px"></div>`;

            const script = document.createElement("script");
            script.src = scriptUrl;
            script.async = true;
            script.innerHTML = JSON.stringify(config);
            node.appendChild(script);
            node.dataset.loaded = "true";

            return () => {
                if (node) {
                    node.innerHTML = "";
                    delete node.dataset.loaded;
                }
            }
        },
        [scriptUrl, config, height]
    );
    return containerRef
}
export default useTradingViewWidget
