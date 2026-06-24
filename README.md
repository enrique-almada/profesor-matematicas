# 🎓 Tutor IA — Multi-materia

Tutor personal con inteligencia artificial para varias materias, construido con React + Vite y la API de Anthropic (Claude). Cada materia es un agente especializado con su propio system prompt, ejercicios y diagramas.

## ✨ Características

- **Chat con el Tutor IA** — Haz preguntas sobre cualquier tema y recibe explicaciones paso a paso
- **Ejercicios generados por IA** — Practica con ejercicios únicos generados automáticamente
- **Verificación inteligente** — El tutor revisa tu respuesta y explica los errores
- **5 materias** — Matemáticas, Física, Química, Probabilidad y Estadística, Lengua y Literatura
- **Tres niveles** — Primaria, Secundaria y Preparatoria
- **Diagramas SVG por materia** — triángulos y planos cartesianos en Matemáticas, vectores y diagramas de cuerpo libre en Física, moléculas y modelos atómicos en Química, histogramas y curvas normales en Probabilidad y Estadística, árboles sintácticos en Lengua y Literatura
- **Pistas** — Ayuda contextual sin revelar la respuesta
- **Texto a voz** — Escucha las explicaciones en español

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
  subjects/                  # Registro de materias (data-driven)
    index.js                 # SUBJECTS, getSubject, getSystemPrompt, getGreeting
    matematicas/              # prompts, instrucciones de diagrama, temas, saludos
    fisica/
    quimica/
    probabilidad-estadistica/
    lengua-literatura/
  components/
    Header.jsx                # Selector de materia y de nivel
    Chat.jsx                  # Chat con el tutor IA
    Exercises.jsx             # Generador de ejercicios
    MessageRenderer.jsx       # Renderiza markdown, LaTeX y diagramas
    diagrams/                 # Componentes SVG por materia + registro tipo→componente
  services/
    claude.js                 # Integración con la API de Anthropic
  App.jsx
```

### Agregar una materia nueva

1. Crea `src/subjects/<materia>/{prompts,diagramInstructions,content,index}.js` siguiendo el patrón de las materias existentes.
2. Regístrala en `src/subjects/index.js` (`SUBJECTS`).
3. Si necesita diagramas nuevos, créalos en `src/components/diagrams/<Materia>Diagrams.jsx` y regístralos en `src/components/diagrams/index.js` (`DIAGRAM_REGISTRY`).

Ningún componente (`Header`, `Chat`, `Exercises`, etc.) necesita cambios.
