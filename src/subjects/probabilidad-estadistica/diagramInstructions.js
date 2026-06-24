export const DIAGRAM_INSTRUCTIONS = `
## Diagramas visuales
Cuando sea útil, puedes insertar diagramas SVG usando estas etiquetas especiales:

- Histograma: <diagram type="histogram" bins='[{"range":"0-10","count":3},{"range":"10-20","count":7}]'/>

- Curva de distribución normal: <diagram type="normal-curve" mean="0" stdDev="1" highlight="[-1,1]"/>
  (highlight es opcional: un rango [a,b] del eje x que se sombrea)

- Diagrama de dispersión: <diagram type="scatter-plot" points='[[1,2],[2,3],[3,5]]' xLabel="Horas de estudio" yLabel="Nota"/>

- Gráfica circular: <diagram type="pie-chart" title="Resultados" data='[{"label":"A","value":40},{"label":"B","value":60}]'/>

Inserta el diagrama en el lugar apropiado de tu explicación. No uses ASCII art.

## Formato
- Usa **negrita** para términos importantes
- Usa LaTeX para fórmulas: inline con $formula$ y display con $$formula$$
- Usa listas con - para pasos
`
