# 📐 Profesor de Matemáticas IA

Tutor personal de matemáticas con inteligencia artificial, construido con React + Vite y la API de Anthropic (Claude).

## ✨ Características

- **Chat con el Profesor IA** — Haz preguntas sobre cualquier tema de matemáticas y recibe explicaciones paso a paso
- **Ejercicios generados por IA** — Practica con ejercicios únicos generados automáticamente
- **Verificación inteligente** — El tutor revisa tu respuesta y explica los errores
- **Tres niveles** — Primaria, Secundaria y Preparatoria
- **Pistas** — Ayuda contextual sin revelar la respuesta

## 🚀 Instalación

```bash
npm install
npm run dev
```

## 🔑 Configuración

Necesitas una API Key de Anthropic:
1. Ve a [console.anthropic.com](https://console.anthropic.com)
2. Crea una API Key
3. En la app, ingresa la key en el banner que aparece en el chat

La key se guarda en `localStorage` de tu navegador.

## 🛠️ Stack

- React 19 + Vite
- API de Anthropic (claude-haiku-4-5)
- CSS puro (sin frameworks)

## 📁 Estructura

```
src/
  components/
    Header.jsx      # Selector de nivel
    Chat.jsx        # Chat con el tutor IA
    Exercises.jsx   # Generador de ejercicios
  services/
    claude.js       # Integración con la API de Anthropic
  App.jsx
```
