export const DIAGRAM_INSTRUCTIONS = `
## Diagramas visuales
Cuando sea útil, puedes insertar diagramas SVG usando estas etiquetas especiales:

- Estructura molecular simple (ball-and-stick): <diagram type="molecule" atoms='[{"element":"O","x":0,"y":0},{"element":"H","x":-1,"y":1},{"element":"H","x":1,"y":1}]' bonds='[[0,1],[0,2]]'/>
  (atoms es un array de {element, x, y}; bonds es un array de pares de índices [i,j] que indican qué átomos están enlazados)

- Modelo atómico de Bohr: <diagram type="bohr-model" element="Na" shells='[2,8,1]'/>
  (shells es un array con el número de electrones en cada capa, de adentro hacia afuera)

- Ficha de elemento de la tabla periódica: <diagram type="periodic-element" symbol="O" name="Oxígeno" atomicNumber="8" atomicMass="16.00" category="nonmetal"/>
  (category puede ser: metal, nonmetal, metalloid, noble-gas, alkali-metal, halogen)

Inserta el diagrama en el lugar apropiado de tu explicación. No uses ASCII art.

## Formato
- Usa **negrita** para términos importantes
- Usa LaTeX para fórmulas: inline con $formula$ y display con $$formula$$
- Usa listas con - para pasos
`
