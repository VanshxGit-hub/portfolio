"use client"

import { useState, useCallback } from "react"
import { AnimatedBackground } from "@/components/clair/animated-background"
import { Header } from "@/components/clair/header"
import { ModeSelector } from "@/components/clair/mode-selector"
import { ChartUploader } from "@/components/clair/chart-uploader"
import { AnalysisResults } from "@/components/clair/analysis-results"
import { FloatingOrbs } from "@/components/clair/floating-orbs"
import { IntroAnimation } from "@/components/clair/intro-animation"

export type ChartType = "stock" | "crypto" | "forex" | null
export type AnalysisLevel = "beginner" | "advanced" | null
export type AnalysisState = "idle" | "uploading" | "analyzing" | "complete" | "error"

export interface Zone {
  type: string
  label: string
  color: string
  zone_type: "horizontal" | "rectangular" | "trendline"
  price_level: number
  zone_high: number
  zone_low: number
  start_price: number
  end_price: number
  teach_what: string
  teach_how_it_forms: string
  teach_how_to_spot: string
  confluence?: string
  significance?: string
  filled?: boolean
  subtype?: string
}

export interface AnalysisResult {
  chart_high: number
  chart_low: number
  timeframe: string | null
  market: string
  trend?: {
    direction: string
    evidence: string
    strength: string
    explanation: string
  }
  bias?: {
    direction: string
    reasoning: string
    htf_bias: string
    price_position: string
  }
  zones: Zone[]
  candlestick_pattern?: {
    found: boolean
    name: string
    type: string
    explanation: string
  }
  chart_pattern?: {
    found: boolean
    name: string
    signal: string
  }
  risk_management: {
    entry: number
    stop_loss: number
    take_profit: number
    risk_reward: string
    entry_reason: string
    stop_reason: string
    target_reason: string
  }
  entry_model?: {
    type: string
    entry_zone: number
    invalidation: number
    description: string
  }
  fibonacci?: {
    found: boolean
    swing_high: number
    swing_low: number
    levels: { pct: string; price: number }[]
    ote_high: number
    ote_low: number
  }
  session?: {
    likely_session: string
    kill_zone: string
    note: string
  }
  market_logic?: {
    inducement: string
    smart_money_trap: string
    fake_breakout: string
  }
  poi?: {
    description: string
    type: string
    price_range: string
    reason: string
  }
  summary: string
}

export default function ClairPage() {
  const [introComplete, setIntroComplete] = useState(false)
  const [chartType, setChartType] = useState<ChartType>(null)
  const [analysisLevel, setAnalysisLevel] = useState<AnalysisLevel>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [imageBase64, setImageBase64] = useState<string | null>(null)
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle")
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [needsTimeframe, setNeedsTimeframe] = useState(false)

  const handleReset = useCallback(() => {
    setChartType(null)
    setAnalysisLevel(null)
    setUploadedImage(null)
    setImageBase64(null)
    setAnalysisState("idle")
    setAnalysisResult(null)
    setError(null)
    setNeedsTimeframe(false)
  }, [])

  const handleImageUpload = useCallback((imageUrl: string, base64: string) => {
    setUploadedImage(imageUrl)
    setImageBase64(base64)
    setAnalysisState("uploading")
    setTimeout(() => setAnalysisState("idle"), 800)
  }, [])

  const handleAnalyse = useCallback(async (timeframe?: string) => {
    if (!imageBase64 || !chartType || !analysisLevel) return

    setAnalysisState("analyzing")
    setError(null)
    setNeedsTimeframe(false)

    try {
      const response = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64,
          chartType,
          analysisLevel,
          timeframe,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed")
      }

      if (!data.timeframe && !timeframe) {
        setNeedsTimeframe(true)
        setAnalysisState("idle")
        return
      }

      setAnalysisResult(data)
      setAnalysisState("complete")
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong"
      setError(message)
      setAnalysisState("error")
    }
  }, [imageBase64, chartType, analysisLevel])

  const showResults = analysisState === "complete" && analysisResult
  const canUpload = chartType && analysisLevel

  return (
    <>
      <IntroAnimation onComplete={() => setIntroComplete(true)} />

      <main
        className="relative min-h-screen"
        style={{
          opacity: introComplete ? 1 : 0,
          transition: "opacity 0.6s ease-in-out",
          pointerEvents: introComplete ? "auto" : "none",
        }}
      >
        <AnimatedBackground />
        <FloatingOrbs />

        <div className="relative z-10 min-h-screen flex flex-col">
          <Header onStartAnalysis={handleReset} />

          <div className="flex-1 container mx-auto px-4 py-8 flex flex-col gap-8">

            {!showResults && (
              <>
                <ModeSelector
                  chartType={chartType}
                  setChartType={setChartType}
                  analysisLevel={analysisLevel}
                  setAnalysisLevel={setAnalysisLevel}
                />

                {canUpload && (
                  <ChartUploader
                    onUpload={handleImageUpload}
                    onAnalyse={handleAnalyse}
                    analysisState={analysisState}
                    chartType={chartType}
                    analysisLevel={analysisLevel}
                    error={error}
                    needsTimeframe={needsTimeframe}
                  />
                )}
              </>
            )}

            {showResults && (
              <AnalysisResults
                result={analysisResult}
                uploadedImage={uploadedImage!}
                chartType={chartType!}
                analysisLevel={analysisLevel!}
                onNewAnalysis={handleReset}
              />
            )}

          </div>
        </div>
      </main>
    </>
  )
}