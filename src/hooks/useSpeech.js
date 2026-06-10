import { useState, useEffect, useRef } from 'react'

// Strips markdown, LaTeX and diagram tags so TTS only reads plain text
function latexToSpeech(latex) {
  return latex
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 entre $2')
    .replace(/\\sqrt\{([^}]+)\}/g, 'raíz de $1')
    .replace(/\\sqrt\s/g, 'raíz ')
    .replace(/\^2/g, ' al cuadrado')
    .replace(/\^3/g, ' al cubo')
    .replace(/\^\{([^}]+)\}/g, ' a la $1')
    .replace(/\\times/g, 'por')
    .replace(/\\div/g, 'entre')
    .replace(/\\cdot/g, 'por')
    .replace(/\\pm/g, 'más o menos')
    .replace(/\\neq/g, 'es distinto de')
    .replace(/\\leq/g, 'menor o igual que')
    .replace(/\\geq/g, 'mayor o igual que')
    .replace(/\\pi/g, 'pi')
    .replace(/\\alpha/g, 'alfa')
    .replace(/\\beta/g, 'beta')
    .replace(/\\theta/g, 'teta')
    .replace(/\\infty/g, 'infinito')
    .replace(/[{}\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function cleanForSpeech(text) {
  return text
    .replace(/<diagram[^>]*\/>/g, '')
    // Convert LaTeX to readable Spanish before discarding
    .replace(/\$\$([^$]+)\$\$/g, (_, inner) => latexToSpeech(inner))
    .replace(/\$([^$\n]+)\$/g, (_, inner) => latexToSpeech(inner))
    // Plain text fractions like 1/4
    .replace(/(\d+)\/(\d+)/g, '$1 entre $2')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/#{1,4}\s/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/[-•]\s/g, '')
    // Strip emojis
    .replace(/[\u{1F000}-\u{1FFFF}]/gu, '')
    .replace(/[\u{2600}-\u{27BF}]/gu, '')
    .replace(/[\u{FE00}-\u{FEFF}]/gu, '')
    .replace(/\n+/g, '. ')
    .replace(/\.{2,}/g, '.')
    .replace(/\s+/g, ' ')
    .trim()
}

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false)
  const [supported] = useState(() => 'speechSynthesis' in window)
  const [voices, setVoices] = useState([])
  const utteranceRef = useRef(null)

  useEffect(() => {
    if (!supported) return
    const load = () => setVoices(window.speechSynthesis.getVoices())
    load()
    window.speechSynthesis.addEventListener('voiceschanged', load)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load)
  }, [supported])

  // Pick best Spanish voice
  const getSpanishVoice = () => {
    const prefs = [
      v => v.lang === 'es-MX',
      v => v.lang === 'es-419',
      v => v.lang.startsWith('es'),
    ]
    for (const pred of prefs) {
      const v = voices.find(pred)
      if (v) return v
    }
    return null
  }

  const speak = (text) => {
    if (!supported) return
    window.speechSynthesis.cancel()

    const clean = cleanForSpeech(text)
    const utterance = new SpeechSynthesisUtterance(clean)
    utterance.lang = 'es-MX'
    utterance.rate = 0.95
    utterance.pitch = 1

    const voice = getSpanishVoice()
    if (voice) utterance.voice = voice

    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  const stop = () => {
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }

  return { speak, stop, speaking, supported }
}
