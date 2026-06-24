import { DIAGRAM_REGISTRY } from './index'
import './MathDiagram.css'

// Renders structured diagrams as SVG based on type, looked up in DIAGRAM_REGISTRY
export default function DiagramRenderer({ type, params = {} }) {
  const Component = DIAGRAM_REGISTRY[type]
  if (!Component) return null
  return <Component {...params} />
}
