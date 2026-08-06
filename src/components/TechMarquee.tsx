const technologies = [
  'React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion',
  'GSAP', 'Figma', 'Node.js', 'Vite', 'Three.js',
]

export default function TechMarquee() {
  return (
    <div className="overflow-hidden py-10 border-y border-white/[0.08] my-16">
      <div className="flex gap-12 animate-marquee w-max">
        {[...technologies, ...technologies, ...technologies, ...technologies].map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="font-heading text-xl font-semibold text-text-secondary/50 whitespace-nowrap hover:text-text-secondary transition-opacity"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
