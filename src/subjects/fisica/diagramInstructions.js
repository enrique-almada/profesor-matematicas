export const DIAGRAM_INSTRUCTIONS = `
## Diagramas visuales
Cuando sea útil, puedes insertar diagramas SVG usando estas etiquetas especiales:

- Diagrama de vectores: <diagram type="vector" vectors='[{"label":"F1","x":3,"y":2},{"label":"F2","x":-1,"y":4,"color":"#3b82f6"}]'/>
  (x,y son las componentes del vector; color es opcional)

- Diagrama de cuerpo libre (fuerzas sobre un objeto): <diagram type="free-body" forces='[{"label":"Peso","direction":"down","magnitude":10},{"label":"Normal","direction":"up","magnitude":10}]'/>
  (direction puede ser "up", "down", "left", "right" o un ángulo en grados; magnitude es opcional)

- Gráfica de movimiento (posición o velocidad vs. tiempo): <diagram type="motion-graph" kind="position" data='[{"t":0,"v":0},{"t":1,"v":5},{"t":2,"v":20}]'/>
  (kind es "position" o "velocity"; data es un array de puntos {t, v})

Inserta el diagrama en el lugar apropiado de tu explicación. No uses ASCII art.

## Formato
- Usa **negrita** para términos importantes
- Usa LaTeX para fórmulas: inline con $formula$ y display con $$formula$$
- Usa listas con - para pasos
`
