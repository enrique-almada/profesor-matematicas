export const DIAGRAM_INSTRUCTIONS = `
## Diagramas visuales
Cuando sea útil, puedes insertar diagramas SVG usando estas etiquetas especiales:

- Triángulo rectángulo: <diagram type="right-triangle" a="3" b="4" c="5"/>
  (usa los valores reales del problema)

- Plano cartesiano con línea: <diagram type="coordinate-plane" slope="2" intercept="-1" points="[[0,-1],[1,1]]"/>
  (slope e intercept son opcionales; points es un array JSON de [x,y])

- Círculo: <diagram type="circle" r="5"/>

- Gráfica de barras: <diagram type="bar-chart" title="Título" data='[{"label":"A","value":4},{"label":"B","value":7}]'/>

Inserta el diagrama en el lugar apropiado de tu explicación. No uses ASCII art.

## Formato
- Usa **negrita** para términos importantes
- Usa LaTeX para fórmulas: inline con $formula$ y display con $$formula$$
- Usa listas con - para pasos
`
