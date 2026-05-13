'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init('phc_CsXPYyAq63uNhaYutFcg6n7uzE2RpWFTZD9bNWS5L3d5', {
      api_host: 'https://us.i.posthog.com',
      capture_pageview: true,
      capture_pageleave: true,
      session_recording: {
        recordCrossOriginIframes: false,
      },
    })
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
