import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import DiagramRenderer from './diagrams/DiagramRenderer'
import './MessageRenderer.css'

// Parse <diagram ...> tags out of the message text
function parseDiagrams(text) {
  const parts = []
  const regex = /<diagram\s+([\s\S]*?)\/>/g
  let last = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    // Text before diagram
    if (match.index > last) {
      parts.push({ type: 'text', content: text.slice(last, match.index) })
    }
    // Parse attributes — values can be double- or single-quoted (single-quoted
    // is how the model wraps JSON that itself contains double-quoted keys)
    const attrs = {}
    const attrRe = /(\w+)=(?:"([^"]*)"|'([^']*)')/g
    let a
    while ((a = attrRe.exec(match[1])) !== null) {
      attrs[a[1]] = a[2] !== undefined ? a[2] : a[3]
    }
    // Convert numeric string params
    const params = {}
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'type') return
      if (!isNaN(v) && v !== '') params[k] = Number(v)
      else if (v.startsWith('[')) {
        try { params[k] = JSON.parse(v) } catch { params[k] = v }
      }
      else params[k] = v
    })
    parts.push({ type: 'diagram', diagramType: attrs.type, params })
    last = match.index + match[0].length
  }

  if (last < text.length) {
    parts.push({ type: 'text', content: text.slice(last) })
  }

  return parts.length > 0 ? parts : [{ type: 'text', content: text }]
}

export default function MessageRenderer({ content }) {
  const parts = parseDiagrams(content)

  return (
    <div className="msg-renderer">
      {parts.map((part, i) => {
        if (part.type === 'diagram') {
          return (
            <DiagramRenderer
              key={i}
              type={part.diagramType}
              params={part.params}
            />
          )
        }
        return (
          <ReactMarkdown
            key={i}
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex]}
          >
            {part.content}
          </ReactMarkdown>
        )
      })}
    </div>
  )
}
