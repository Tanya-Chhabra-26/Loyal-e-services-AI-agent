// lib/gtag.ts

// Extend window type so TS knows gtag exists
declare global {
    interface Window {
        gtag?: (
            command: "config" | "event",
            targetId: string,
            config?: Record<string, any>
        ) => void
    }
}

// Your GA Tracking ID (from .env.local)
export const GA_TRACKING_ID = "G-B1W8514C8Z"

// Log a pageview
export const pageview = (url: string) => {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("config", GA_TRACKING_ID, {
            page_path: url,
        })
    }
}

// Log custom events
export const event = ({
    action,
    category,
    label,
    value,
}: {
    action: string
    category: string
    label: string
    value: number
}) => {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", action, {
            event_category: category,
            event_label: label,
            value: value,
        })
    }
}
