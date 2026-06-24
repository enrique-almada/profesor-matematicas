import { RightTriangle, Circle, CoordinatePlane, BarChart } from './MathDiagrams'
import { VectorDiagram, FreeBodyDiagram, MotionGraph } from './PhysicsDiagrams'
import { MoleculeDiagram, BohrModel, PeriodicElementCard } from './ChemistryDiagrams'
import { Histogram, NormalCurve, ScatterPlot, PieChart } from './StatsDiagrams'
import { SyntaxTree } from './LanguageDiagrams'

export const DIAGRAM_REGISTRY = {
  'right-triangle': RightTriangle,
  'circle': Circle,
  'coordinate-plane': CoordinatePlane,
  'bar-chart': BarChart,
  'vector': VectorDiagram,
  'free-body': FreeBodyDiagram,
  'motion-graph': MotionGraph,
  'molecule': MoleculeDiagram,
  'bohr-model': BohrModel,
  'periodic-element': PeriodicElementCard,
  'histogram': Histogram,
  'normal-curve': NormalCurve,
  'scatter-plot': ScatterPlot,
  'pie-chart': PieChart,
  'syntax-tree': SyntaxTree,
}
